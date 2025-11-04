import { ProcessText } from './TextProcessor';

//add listeners to buttons
export function SetupButtons(globalEditor, procRef, Proc, ProcAndPlay) {
    document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
    document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
    document.getElementById('process').addEventListener('click', () => Proc(globalEditor, procRef));
    document.getElementById('process_play').addEventListener('click', () => {
        if (globalEditor) {
            Proc(globalEditor, procRef);
            globalEditor.evaluate();
        }
    });
}

//performs the processing of the textBox area and updates the strudel editor
export function Proc(globalEditor, procRef) {
    //Error handling / prevention
    if (!procRef || !procRef.current) return;

    //get current text area values
    let proc_text = procRef.current.value || '';
    if (!proc_text.trim()) return; // skip if empty

    //update strudel editor with post process code
    globalEditor.setCode(proc_text);
}

//used for radio buttons with current textbox values
export function ProcAndPlay(globalEditor, procRef) {
    //Error handling / prevention
    if (!globalEditor || !procRef || !procRef.current) return;

    //only runs if playback has started
    if (globalEditor.repl.state.started) {
        Proc(globalEditor, procRef); //put textarea into editor
        globalEditor.evaluate(); //play processed code
    }
}

