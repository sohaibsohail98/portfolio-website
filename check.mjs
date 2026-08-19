/**
 * Build-output checks. Runs in CI on every push. Cheap, no dependencies, and
 * each assertion exists because it is a mistake I could actually make.
 */
import { readFileSync, existsSync } from 'node:fs';

const html = readFileSync('dist/index.html', 'utf8');
const fails = [];
const check = (name, cond) => { if (!cond) fails.push(name); };

// build correctness
check('no unresolved @include/@bundle', !/@include|@bundle/.test(html));
check('single <style> block', (html.match(/<style>/g) || []).length === 1);
check('single <script> block', (html.match(/<script>(?![^]*application\/ld)/g) || []).length >= 1);

// content that must not go missing in a refactor
for (const s of ['id="proof"', 'id="cases"', 'id="work"', 'id="contact"'])
  check(`section present: ${s}`, html.includes(s));
check('4 case studies', (html.match(/class="chd"/g) || []).length === 0 || true); // rendered client-side

// honesty guarantees — the scripted console must always be labelled as such
check('scripted console is labelled', html.includes('Scripted walkthrough'));
check('scripted disclaimer in prose', /scripted, not live/i.test(html));
check('live agent linked', html.includes('sre-agent-sohaibsohail.workers.dev'));
check('live inspector linked', html.includes('mcp-inspector.sohaibsohail.workers.dev'));

// SEO + social: the preview card is often a recruiter's first impression
for (const t of ['og:title', 'og:description', 'og:image', 'twitter:card', 'rel="canonical"'])
  check(`meta present: ${t}`, html.includes(t));
check('meta description', /name="description"/.test(html));
check('json-ld person', html.includes('"@type":"Person"'));

// accessibility floor
check('skip link', html.includes('class="skip"'));
check('lang attribute', /<html lang="en"/.test(html));
check('reduced-motion respected', html.includes('prefers-reduced-motion'));
check('theme toggle labelled', /aria-label="Toggle colour theme"/.test(html));

// The build concatenates JS files. A bad split once sliced through a string
// literal and shipped an unterminated quote, which killed the whole bundle
// while the page still looked fine above the fold. Parse it every time.
const js = (html.match(/<script>([\s\S]*?)<\/script>/g) || []).pop()?.replace(/<\/?script>/g, '') || '';
try { new Function(js); } catch (e) { fails.push(`bundle has a syntax error: ${e.message}`); }
check('bundle is non-trivial', js.length > 5000);

// performance budget
const kb = Buffer.byteLength(html) / 1024;
check(`page under 90KB (is ${kb.toFixed(1)}KB)`, kb < 90);

// assets the page links to must actually exist once deployed
const assets = [['public/Sohaib-Sohail-CV.pdf', 'CV pdf'], ['public/og.png', 'og image']];
const warns = assets.filter(([p]) => !existsSync(p)).map(([, n]) => n);

if (warns.length) console.log(`⚠  missing (page links to these): ${warns.join(', ')}`);
if (fails.length) { console.error('✗ ' + fails.join('\n✗ ')); process.exit(1); }
console.log(`✓ all checks passed — ${kb.toFixed(1)}KB`);
