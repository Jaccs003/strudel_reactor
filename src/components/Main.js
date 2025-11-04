import { useEffect, useRef, useState } from 'react';
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
    const [hushMode, setHushMode] = useState(false);
    const [loading, setLoading] = useState(true);

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

                    if (procRef.current) {
                        procRef.current.value = stranger_tune;
                        Proc(editor, procRef);
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
    }, []);

    return (
        <div>
            <h2>Strudel Demo</h2>
            <main className="container-fluid">
                <div className="row">
                    <TextBox ref={procRef} />
                    <Controls
                        onPreprocess={() => Proc(globalEditor, procRef)}
                        onProcPlay={() => {
                            Proc(globalEditor, procRef);
                            globalEditor.evaluate();
                        }}
                        onPlay={() => globalEditor.evaluate()}
                        onStop={() => globalEditor.stop()}
                    />
                </div>

                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                    <RadioOptions
                        globalEditor={globalEditor}
                        procRef={procRef}
                        hushMode={hushMode}
                        setHushMode={setHushMode}
                    />
                </div>

                <Canvas ref={canvasRef} />
            </main>
        </div>
    );
}
