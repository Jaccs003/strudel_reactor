import { useEffect, useRef } from 'react';
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick, getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { transpiler } from '@strudel/transpiler';
import { stranger_tune } from '../tunes';
import console_monkey_patch from '../console-monkey-patch';
import { SetupButtons, Proc, ProcAndPlay } from '../utilities/Setup';
import Controls from './Controls';
import TextBox from './TextBox';
import RadioOptions from './RadioOptions';
import Canvas from './Canvas';

let globalEditor = null;

export default function Main() {
    //Check if has already run
    const hasRun = useRef(false);
    //holds the current strudel editor data
    const editorRef = useRef(null); 
    //reference to TextBox input
    const procRef = useRef(null); 

    useEffect(() => {
        //runs once, prepares console for strudel output
        if (!hasRun.current) {
            console_monkey_patch();
            hasRun.current = true;

            //setup canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2];

            //creates instance of Strudel mirror
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput, //selects webaudio API for sound
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick();
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });

            //store editor instance for later usage
            editorRef.current = globalEditor;

            //initialise textBox and buttons
            if (procRef.current) {
                procRef.current.value = stranger_tune; //load default tune
                SetupButtons(globalEditor, procRef, Proc, ProcAndPlay);
                Proc(globalEditor, procRef);
            }
        }
    }, []);

    //html for page layout
    return (
        <div>
            <h2>Strudel Demo</h2>
            <main className="container-fluid">
                <div className="row">
                    <textBox />
                    <Controls />
                </div>

                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                    <RadioOptions />
                </div>

                <Canvas />
            </main>
        </div>
    );
}
