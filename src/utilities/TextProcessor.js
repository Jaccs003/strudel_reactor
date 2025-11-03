//controls radio placeholders (depending on selection may replace with _)

export function ProcessText(match, ...args) {
    let replace = "";
    if (document.getElementById('flexRadioDefault2').checked) {
        replace = "_";
    }
    return replace;
}
