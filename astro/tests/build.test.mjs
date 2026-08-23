// Post-build assertions. Runs against dist/ after `astro build`.
// Local: `npm test`. CI: same command, so local and CI catch the same regressions.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const html = readFileSync(join(dist, 'index.html'), 'utf8');
const cssDir = join(dist, '_astro');
const css = existsSync(cssDir)
  ? readdirSync(cssDir).filter(f => f.endsWith('.css')).map(f => readFileSync(join(cssDir, f), 'utf8')).join('')
  : '';
const all = html + css;

let failed = 0;
const test = (name, cond) => {
  if (cond) { console.log(`  ✓ ${name}`); }
  else { console.error(`  ✗ ${name}`); failed++; }
};

console.log('\nHonesty and integrity');
test('scripted console is labelled', html.includes('Scripted walkthrough'));
test('scripted disclaimer in prose', /scripted, not live/i.test(html));
test('live agent URL is the working one (dot, not hyphen)',
  html.includes('sre-agent.sohaibsohail.workers.dev') && !html.includes('sre-agent-sohaibsohail'));
test('live inspector linked', html.includes('mcp-inspector.sohaibsohail.workers.dev'));

console.log('\nStructure: every section present');
for (const id of ['proof','work','cases','experience','recommendations','consult','writing','linkedin-posts','background','contact'])
  test(`#${id}`, html.includes(`id="${id}"`));

console.log('\nContent');
test('intro paragraph', html.includes('Salam'));
test('headshot image', html.includes('sohaib-headshot'));
test('travel image', html.includes('sohaib-travel'));
test('testimonial with 45%', html.includes('45%'));
test('LinkedIn card', html.includes('Latest from LinkedIn'));
test('consulting section', html.includes('Work with me'));
test('tech badges rendered', (html.match(/hover:border-acc hover:text-acc/g) || []).length > 10);

console.log('\nCard rails');
for (const id of ['rail-work-featured','rail-work-grid','rail-cases','rail-experience','rail-recommendations','rail-writing','rail-linkedin'])
  test(`${id} present`, html.includes(`id="${id}"`));
test('rails are labelled regions', (html.match(/role="region"/g) || []).length >= 7);
test('rail prev/next controls wired', html.includes('data-rail-prev') && html.includes('data-rail-next'));
test('case study dialogs present', (html.match(/<dialog/g) || []).length >= 4);
test('case cards open their dialog', (html.match(/data-open-dialog/g) || []).length >= 4);
test('linkedin embeds present and lazy-loaded', (html.match(/linkedin\.com\/embed\/feed\/update/g) || []).length >= 9
  && html.includes('loading="lazy"'));

console.log('\nSEO and social');
for (const t of ['og:title','og:description','og:image','twitter:card'])
  test(`meta ${t}`, html.includes(t));
test('canonical', html.includes('rel="canonical"'));
test('JSON-LD Person', html.includes('"@type":"Person"'));

console.log('\nAccessibility');
test('skip link', html.includes('Skip to content'));
test('html lang', /<html lang="en"/.test(html));
test('reduced-motion respected', all.includes('prefers-reduced-motion'));
test('theme toggle has aria-label', /id="tt"[^>]*aria-label/.test(html));
test('burger has aria-expanded', /id="burger"[^>]*aria-expanded/.test(html));

console.log('\nAssets on disk');
for (const [f, n] of [['public/Sohaib-Sohail-CV.pdf','CV'],['public/og.png','og image'],
  ['public/img/sohaib-headshot.jpg','headshot'],['public/img/sohaib-travel.jpg','travel photo']])
  test(n, existsSync(join(root, f)));

console.log('\nPerformance budget');
const kb = Buffer.byteLength(html) / 1024;
test(`html under 120KB (${kb.toFixed(1)}KB)`, kb < 120);

console.log(`\n${failed === 0 ? '✓ all tests passed' : `✗ ${failed} test(s) failed`}\n`);
process.exit(failed === 0 ? 0 : 1);
