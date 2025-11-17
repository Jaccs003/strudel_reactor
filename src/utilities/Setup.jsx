// performs the processing of the textarea and updates the Strudel editor
import { getCPS } from './TextProcessor';

export function Proc(editor, procRef, settings) {
    if (!editor || !procRef?.current) return;

    let text = procRef.current.value || '';
    if (!text.trim()) return;

    text = text.replace(/\{newCPS\}/g, getCPS(settings));
    editor.setCode(text);
}

// processes and plays only if playback has started
export function ProcAndPlay(editor, procRef, settings) {
    if (!editor || !procRef?.current) return;

    // Only run if playback has started
    if (editor.repl?.state?.started) {
        Proc(editor, procRef, settings);
        editor.evaluate();
    }
}

// optional utility to determine replacement for radio selection
export function ProcessText() {
    // returns "_" if the "HUSH" radio is selected
    return document.getElementById('flexRadioDefault2')?.checked ? "_" : "";
}
