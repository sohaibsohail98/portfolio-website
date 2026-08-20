/**
 * Zero-dependency build. Resolves @include partials and @bundle asset lists into
 * a single self-contained index.html, then writes it to dist/.
 *
 * No framework, no node_modules, nothing to audit. The whole site is one page,
 * and a bundler would cost more in maintenance than it saves in ergonomics.
 */
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';

const SRC = 'src', OUT = 'dist';
const read = p => readFileSync(join(SRC, p), 'utf8');

const minifyCss = css => css
  .replace(/\/\*[\s\S]*?\*\//g, '')      // comments
  .replace(/\s*([{}:;,>])\s*/g, '$1')    // space around punctuation
  .replace(/;}/g, '}')
  .replace(/\n\s*/g, '')
  .trim();

// JS is left readable on purpose: it is ~20KB, it gzips to very little, and a
// reviewer opening devtools should be able to read it.
const joinJs = files => files.map(f => `\n/* ${f} */\n${read(f)}`).join('\n');

function build() {
  let html = read('index.html');

  // resolve includes repeatedly: partials may themselves include generated markup
  for (let pass = 0; pass < 5 && /@include/.test(html); pass++) {
    html = html.replace(/<!--\s*@include\s+(\S+)\s*-->/g, (_, f) => {
      const p = join(SRC, f);
      if (!existsSync(p)) throw new Error(`missing partial: ${f}`);
      return read(f).trim();
    });
  }

  html = html.replace(/\/\*\s*@bundle\s+([^*]+)\*\//g, (_, list) => {
    const files = list.trim().split(/\s+/);
    return files[0].endsWith('.css')
      ? minifyCss(files.map(read).join('\n'))
      : joinJs(files);
  });

  if (html.includes('@include') || html.includes('@bundle'))
    throw new Error('unresolved build directive left in output');

  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, 'index.html'), html);

  if (existsSync('public')) cpSync('public', OUT, { recursive: true });

  const kb = (Buffer.byteLength(html) / 1024).toFixed(1);
  console.log(`built dist/index.html — ${kb} KB`);
  return html;
}

build();
