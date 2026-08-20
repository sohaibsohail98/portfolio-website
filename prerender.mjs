/**
 * Renders the data-driven sections to static HTML at build time.
 *
 * Previously the experience table, work list and case studies existed only
 * after JS ran, so a blocked script or a single syntax error left five empty
 * headings. Now the markup ships in the page and JS only enhances it.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const captured = {};
const cache = {};
function el(id) {
  if (cache[id]) return cache[id];
  const node = {
    set innerHTML(v) { captured[id] = v; },
    get innerHTML() { return captured[id] || ''; },
    addEventListener() {}, set onclick(_) {}, querySelector: () => node, style: {},
    setAttribute() {}, classList: { toggle() {}, add() {} }, dataset: {},
    get parentElement() { return node; }
  };
  return (cache[id] = node);
}
globalThis.document = { querySelector: s => el(s.replace('#','')), querySelectorAll: () => [] };
globalThis.matchMedia = () => ({ matches: false });
globalThis.requestAnimationFrame = () => {};
globalThis.addEventListener = () => {};

const src = ['src/scripts/data.repos.js', 'src/scripts/cases.js']
  .map(f => readFileSync(f, 'utf8')).join('\n');
new Function(src)();

const out = {
  'src/partials/generated/work.html': captured['worklist'],
  'src/partials/generated/featured.html': captured['featured'],
  'src/partials/generated/grid.html': captured['grid'],
  'src/partials/generated/roles.html': captured['rolelist'],
  'src/partials/generated/cases.html': captured['cases'],
};
for (const [path, html] of Object.entries(out)) {
  if (!html) throw new Error(`prerender produced nothing for ${path}`);
  writeFileSync(path, html.trim() + '\n');
  console.log(`  prerendered ${path} (${html.length} chars)`);
}
