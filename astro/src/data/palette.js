// Rotating accent used to colour-code cards inside a rail (see global.css
// for the actual `--r-*` colour values and `.acc-top-*` / `.acc-dot-*` /
// `.acc-text-*` utility classes). Cycle through with `swatch(i)`.
export const swatches = ['blue', 'violet', 'teal', 'amber', 'rose', 'green'];

export const swatch = i => swatches[i % swatches.length];
