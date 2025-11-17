//controls radio placeholders (depending on selection may replace with _)

export function ProcessText(hushMode) {
    return hushMode ? "_" : "";
}