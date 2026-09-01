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
test('live inspector linked', html.includes('ctxwindow.uk'));

console.log('\nStructure: every section present');
for (const id of ['proof','work','cases','experience','recommendations','consult','writing','background','contact'])
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
for (const id of ['rail-work-featured','rail-work-grid','rail-cases','rail-experience','rail-recommendations','rail-writing'])
  test(`${id} present`, html.includes(`id="${id}"`));
test('rails are labelled regions', (html.match(/role="region"/g) || []).length >= 6);
test('rail prev/next controls wired', html.includes('data-rail-prev') && html.includes('data-rail-next'));
test('case study dialogs present', (html.match(/<dialog/g) || []).length >= 4);
test('case cards open their dialog', (html.match(/data-open-dialog/g) || []).length >= 4);

console.log('\nHero and hiring narrative');
test('primary CTA is the live agent', /data-cta="primary"[^>]*>Try the live agent/.test(html) || /Try the live agent/.test(html) && /data-cta="primary"/.test(html));
test('exactly one filled hero CTA', (html.match(/hero-ctas[\s\S]*?<\/dl>/)[0].match(/bg-ink/g) || []).length === 1);
test('stats are outcomes, not a year', html.includes('50+') && html.includes('8/8') && !html.includes('Google Award'));
test('intro no longer reads as leaving', !/rather build my own things/.test(html));
test('consulting section sits after background', html.indexOf('id="background"') < html.indexOf('id="consult"') && html.indexOf('id="consult"') < html.indexOf('id="contact"'));
test('section numbers follow the new order', /num.*?06.*Writing/s.test(html) || (html.indexOf('>06<') < html.indexOf('>07<') && html.indexOf('>07<') < html.indexOf('>08<')));
test('footer headline links to the agent', /start with <a[^>]*sre-agent[^>]*>the SRE agent<\/a>/.test(html));

console.log('\nNavigation');
test('inline desktop nav present', /id="topnav"[^>]*md:flex/.test(html));
test('inline nav has every section', (html.match(/id="topnav"[\s\S]*?<\/nav>/)[0].match(/<a /g) || []).length === 8);
test('burger hidden on desktop', /id="burger"[^>]*md:hidden/.test(html));
test('hair2 border utility compiles', css.includes('.border-hair2'));

console.log('\nMobile');
test('experience timeline rendered below md', /data-experience-timeline/.test(html) && /class="md:hidden" data-experience-timeline/.test(html));
test('experience rail hidden below md', /class="hidden md:block">\s*<div class="rail-bleed"/.test(html) || (html.indexOf('hidden md:block') < html.indexOf('id="rail-experience"')));
test('rail position counters present', (html.match(/data-rail-count/g) || []).length >= 6);
test('touch keeps progress hairline (only buttons hidden)', /hover:none\)\{\.rail-btn[^{]*\{display:none\}/.test(css) && !/hover:none\)\{\.rail-controls[^{]*\{display:none/.test(css));
test('hero CTAs stack full-width on mobile', /w-full[^"]*sm:w-auto/.test(html.match(/hero-ctas[\s\S]*?<\/div>/)[0]));
test('timeline roles are collapsible', (html.match(/data-experience-timeline[\s\S]*?<\/ol>/)[0].match(/data-acc/g) || []).length === 4);
test('Brunel name corrected', html.includes('Brunel University London') && !html.includes('University of London'));

console.log('\nSecurity headers');
const headers = readFileSync(join(dist, '_headers'), 'utf8');
test('CSP present', headers.includes('Content-Security-Policy'));
test('CSP has no unused frame-src (LinkedIn embed rail was removed)', !headers.includes('frame-src'));

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
