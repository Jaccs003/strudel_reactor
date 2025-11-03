import { ProcessText } from './TextProcessor';

//add listeners to buttons
export function SetupButtons(globalEditor, Proc, ProcAndPlay) {
    document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
    document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
    document.getElementById('process').addEventListener('click', () => Proc(globalEditor));
    document.getElementById('process_play').addEventListener('click', () => {
        if (globalEditor) {
            Proc(globalEditor);
            globalEditor.evaluate();
        }
    });
}

//used for the hush buttons
export function ProcAndPlay() {
    if (window.globalEditor && window.globalEditor.repl.state.started) {
        Proc(window.globalEditor);
        window.globalEditor.evaluate();
    }
}
//performs the processing of the textBox area
export function Proc(globalEditor) {
    let proc_text = document.getElementById('proc').value;
    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
    ProcessText(proc_text);
    globalEditor.setCode(proc_text_replaced);
}