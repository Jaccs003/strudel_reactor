import { useEffect, useRef, useState, useCallback } from 'react';
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import {initAudioOnFirstClick, getAudioContext, webaudioOutput, registerSynthSounds,} from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { transpiler } from '@strudel/transpiler';
import { stranger_tune } from '../tunes';
import console_monkey_patch from '../console-monkey-patch';
import { Proc, ProcAndPlay } from '../utilities/Setup';
import Controls from './Controls';
import TextBox from './TextBox';
import RadioOptions from './RadioOptions';
import Canvas from './Canvas';

export default function Main() {
    const hasRun = useRef(false);
    const editorRef = useRef(null);
    const procRef = useRef(null);
    const canvasRef = useRef(null);

    const [globalEditor, setGlobalEditor] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleProc = (newSettings) => {
        Proc(globalEditor, procRef, newSettings);
    };


    const DEFAULT_SETTINGS = {
        volume: {
            main: 1,     
            bass: 1,
            drums: 1,
            drums2: 0.6,
            arp: 1
        },
        mute: {
            main: false,
            bass: false,
            drums: false,
            drums2: false,
            arp: false
        },
        effects: {
            reverb: {
                main: 0.6,  
                bass: 0.6,
                drums: 0.3, 
                drums2: 0.3,
                arp: 0.6
            },
            delay: {
                main: 0.0,   
                bass: 0.0,
                drums: 0.0,
                drums2: 0.0,
                arp: 0.0
            }
        },
        cps: { bpm: 140, div: 60, ticks: 4 }
    };


    // settings control for future use
    const [settings, setSettings] = useState({
        volume: {
            bass: 0.8,
            drums: 0.8,
            drums2: 0.8,
            arp: 0.8
        },
        mute: {
            main: false,
            bass: false,
            drums: false,
            drums2: false,
            arp: false
        },
        effects: {
            reverb: {
                bass: 0.1,
                drums: 0.1,
                drums2: 0.1,
                arp: 0.1
            },
            delay: {
                bass: 0.1,
                drums: 0.1,
                drums2: 0.1,
                arp: 0.1
            }
        },
        cps: { bpm: 140, div: 60, ticks: 4 }
    });

    // helper function for settings updates
    const updateSetting = useCallback((path, value) => {
        setSettings((prev) => {
            const copy = structuredClone(prev);
            const keys = path.split('.');
            let current = copy;
            while (keys.length > 1) current = current[keys.shift()];
            current[keys[0]] = value;
            return copy;
        });
    }, []);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;
        console_monkey_patch();

        const canvas = canvasRef.current;
        if (!canvas) return;

        // sstart up canvas
        canvas.width = 1200;
        canvas.height = 400;
        const drawContext = canvas.getContext('2d');
        const drawTime = [-2, 2];

        // initolize mirror
        const editor = new StrudelMirror({
            defaultOutput: webaudioOutput,
            getTime: () => getAudioContext().currentTime,
            transpiler,
            root: document.getElementById('editor'),
            drawTime,
            onDraw: (haps, time) =>
                drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
            prebake: async () => {
                try {
                    initAudioOnFirstClick();
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio')
                    );

                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);

                    if (procRef.current && procRef.current.value.trim() === "") {
                        procRef.current.value = stranger_tune;
                        Proc(editor, procRef, settings);
                    }
                } catch (err) {
                    console.error('Error during Strudel prebake:', err);
                } finally {
                    setLoading(false);
                }
            },
        });

        editorRef.current = editor;
        setGlobalEditor(editor);
    }, [globalEditor]);

    useEffect(() => {
        if (globalEditor && procRef.current) {
            Proc(globalEditor, procRef, settings);
        }
    }, [settings.cps, settings.volume, settings.mute, settings.effects]);

    return (
        <div>
            <h2>Strudel Demo</h2>
            <main className="container-fluid">
                <div className="row">
                    <TextBox ref={procRef} />
                    <Controls
                        settings={settings}
                        setSettings={setSettings}
                        defaultSettings={DEFAULT_SETTINGS}
                        onChange={updateSetting}
                        onPreprocess={() => handleProc(settings)}
                        onProcPlay={() => {
                            handleProc(settings);
                            globalEditor.evaluate();
                        }}
                        onPlay={() => globalEditor.evaluate()}
                        onStop={() => globalEditor.stop()}
                        onSettingsChange={handleProc}
                    />

                </div>

                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                    <RadioOptions
                        settings={settings}
                        setSettings={setSettings}
                        onChange={updateSetting}
                        globalEditor={globalEditor}
                        procRef={procRef}
                    />
                </div>

                <Canvas ref={canvasRef} />
            </main>
        </div>
    );
}
