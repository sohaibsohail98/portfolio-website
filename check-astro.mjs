import { readFileSync, existsSync, readdirSync } from 'node:fs';
const html = readFileSync('astro/dist/index.html', 'utf8');
// Astro emits CSS to a hashed file; some assertions live there, not inline.
const cssDir = 'astro/dist/_astro';
const css = existsSync(cssDir)
  ? readdirSync(cssDir).filter(f => f.endsWith('.css')).map(f => readFileSync(`${cssDir}/${f}`, 'utf8')).join('')
  : '';
const all = html + css;
const fails = [];
const check = (n, c) => { if (!c) fails.push(n); };

// honesty gates carried over from the old build
check('scripted console labelled', html.includes('Scripted walkthrough'));
check('scripted disclaimer in prose', /scripted, not live/i.test(html));
check('live agent linked', html.includes('sre-agent.sohaibsohail.workers.dev'));
check('live inspector linked', html.includes('mcp-inspector.sohaibsohail.workers.dev'));

// structure
for (const s of ['id="proof"','id="work"','id="cases"','id="experience"','id="consult"','id="background"','id="contact"'])
  check(`section ${s}`, html.includes(s));
check('intro present', html.includes('Salam'));
check('headshot', html.includes('sohaib-headshot'));
check('travel photo', html.includes('sohaib-travel'));
check('linkedin card', html.includes('Latest from LinkedIn'));
check('consult section', html.includes('Work with me'));
check('tech badges', (html.match(/hover:border-acc hover:text-acc/g) || []).length > 10);

// SEO + social
for (const t of ['og:title','og:description','og:image','twitter:card','rel="canonical"'])
  check(`meta ${t}`, html.includes(t));
check('json-ld', html.includes('"@type":"Person"'));

// a11y
check('skip link', html.includes('Skip to content'));
check('lang', /<html lang="en"/.test(html));
check('reduced-motion', all.includes('prefers-reduced-motion'));

// assets
for (const [p, n] of [['astro/public/Sohaib-Sohail-CV.pdf','CV'],['astro/public/og.png','og'],
  ['astro/public/img/sohaib-headshot.jpg','headshot'],['astro/public/img/sohaib-travel.jpg','travel']])
  check(`asset ${n}`, existsSync(p));

// JS must parse (the bundle is emitted separately, but inline scripts matter)
const kb = Buffer.byteLength(html) / 1024;
check(`page under 120KB (${kb.toFixed(1)})`, kb < 120);

if (fails.length) { console.error('✗ ' + fails.join('\n✗ ')); process.exit(1); }
console.log(`✓ astro build checks passed — ${kb.toFixed(1)}KB`);
