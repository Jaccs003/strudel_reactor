//controls radio placeholders (depending on selection may replace with _)
import { useState, useCallback } from 'react';
export function ProcessText(hushMode) {
    return hushMode ? "_" : "";
}

export function getCPS(settings) {
    // Default fallback: "140/60/4"
    const { cps } = settings;

    // Allow either a string like "140/60/4" or an object { bpm, div, ticks }
    if (typeof cps === 'string') return cps;
    if (typeof cps === 'object') return `${cps.bpm}/${cps.div}/${cps.ticks}`;

    return "140/60/4";
}

export function updateCPS(procRef, settings) {
    let text = procRef.current.value

    text = text.replace(/\{newCPS\}/g, getCPS(settings.cps.bpm));

    return text
}