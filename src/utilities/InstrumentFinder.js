import { evalScope } from "@strudel/core";

// editor as parameter to be used for prebake in error prevention
export async function getInstruments(pattern, editor) {
    // error prevention ensuring everything is loaded before continuing
    if (editor && editor.prebake) {
        await editor.prebake();
    }

        // collects all notes so can be identified using cycle length or defaults to 4 beats at a time if unavailable
        const cycleLength = pattern.cycleLength || 4;
        const events = pattern.query(0, cycleLength);

        // create a new set
        const instruments = new Set();

        events.forEach(ev => {
            // ev sound, instrument, s, sample and voice included to handle all 5 property types of strudel
            if (ev.sound) instruments.add(ev.sound);
            if (ev.instrument) instruments.add(ev.instrument);
            if (ev.s) instruments.add(ev.s);
            if (ev.sample) instruments.add(ev.sample);
            if (ev.voice) instruments.add(ev.voice);
        });

    // converts to array and removes any undefined or null objects
    const cleanList = Array.from(instruments).filter(Boolean);

    return cleanList;

}
