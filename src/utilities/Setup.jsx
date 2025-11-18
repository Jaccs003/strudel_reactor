// performs the processing of the textarea and updates the Strudel editor
import { getCPS } from './TextProcessor';

export function Proc(editor, procRef, settings) {
    if (!editor || !procRef?.current) return;

    let text = procRef.current.value || '';
    if (!text.trim()) return;

    //cps text replacement
    text = text.replace(/\{newCPS\}/g, getCPS(settings));

    //mute override volume replacement
    const bassVol = settings.mute.bass ? 0 : settings.volume.bass;
    const drumsVol = settings.mute.drums ? 0 : settings.volume.drums;
    const drums2Vol = settings.mute.drums ? 0 : settings.volume.drums2;
    const arpVol = settings.mute.arp ? 0 : settings.volume.arp;
    //volume text replacement 
    text = text.replace(/\{BASS_VOLUME\}/g, bassVol);
    text = text.replace(/\{DRUMS_VOLUME\}/g, drumsVol);
    text = text.replace(/\{DRUMS2_VOLUME\}/g, drums2Vol);
    text = text.replace(/\{ARP_VOLUME\}/g, arpVol);
    //reverb text replacement
    text = text.replace(/\{BASS_REVERB\}/g, settings.effects.reverb.bass);
    text = text.replace(/\{DRUMS_REVERB\}/g, settings.effects.reverb.drums);
    text = text.replace(/\{DRUMS2_REVERB\}/g, settings.effects.reverb.drums2);
    text = text.replace(/\{ARP_REVERB\}/g, settings.effects.reverb.arp);
    //delay text replacement
    text = text.replace(/\{BASS_DELAY\}/g, settings.effects.delay.bass);
    text = text.replace(/\{DRUMS_DELAY\}/g, settings.effects.delay.drums);
    text = text.replace(/\{DRUMS2_DELAY\}/g, settings.effects.delay.drums2);
    text = text.replace(/\{ARP_DELAY\}/g, settings.effects.delay.arp);

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
