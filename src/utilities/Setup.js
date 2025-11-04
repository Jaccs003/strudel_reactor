// performs the processing of the textarea and updates the Strudel editor
export function Proc(editor, procRef) {
    if (!editor || !procRef?.current) return;

    const text = procRef.current.value || '';
    if (!text.trim()) return;

    editor.setCode(text);
}

// processes and plays only if playback has started
export function ProcAndPlay(editor, procRef) {
    if (!editor || !procRef?.current) return;

    // Only run if playback has started
    if (editor.repl?.state?.started) {
        Proc(editor, procRef);
        editor.evaluate();
    }
}

// optional utility to determine replacement for radio selection
export function ProcessText() {
    // returns "_" if the "HUSH" radio is selected
    return document.getElementById('flexRadioDefault2')?.checked ? "_" : "";
}
