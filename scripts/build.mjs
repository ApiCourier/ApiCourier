// Static site build step.
//
// Cloudflare Pages serves raw files, so there is no runtime templating. This
// script bakes the shared header/footer (from src/js/site-chrome.js) directly
// into each page's HTML, so the internal navigation links exist in the raw
// markup that search engines crawl on their first pass.
//
// Source stays clean: pages keep empty <site-header>/<site-footer> tags. The
// baked output is written to dist/, which is what Cloudflare publishes.
//
//   Build command:   node scripts/build.mjs
//   Output (publish) directory: dist

import { cp, readdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildHeaderHTML, buildFooterHTML } from '../src/js/site-chrome.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, '..', 'src');
const DIST = join(ROOT, '..', 'dist');

const YEAR = String(new Date().getFullYear());

// Dev-only tooling that lives in src/ but should NOT be published.
const EXCLUDE_FROM_DIST = ['serve.js', 'generate-sitemap.js', 'package.json'];

function getAttr(attrs, name) {
  const match = attrs.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`));
  return match ? match[1] : undefined;
}

function bakeChrome(html) {
  let result = html.replace(
    /<site-header\b([^>]*)>[\s\S]*?<\/site-header>/g,
    (_full, attrs) => {
      const page = getAttr(attrs, 'data-page');
      return `<site-header${attrs}>${buildHeaderHTML(page)}</site-header>`;
    }
  );

  result = result.replace(
    /<site-footer\b([^>]*)>[\s\S]*?<\/site-footer>/g,
    (_full, attrs) => {
      const page = getAttr(attrs, 'data-page');
      const discord = getAttr(attrs, 'data-discord');
      return `<site-footer${attrs}>${buildFooterHTML(page, { discord, year: YEAR })}</site-footer>`;
    }
  );

  return result;
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

async function main() {
  await rm(DIST, { recursive: true, force: true });
  await cp(SRC, DIST, { recursive: true });

  for (const name of EXCLUDE_FROM_DIST) {
    await rm(join(DIST, name), { force: true });
  }

  let count = 0;
  for await (const file of walk(DIST)) {
    if (!file.endsWith('.html')) continue;
    const original = await readFile(file, 'utf8');
    const baked = bakeChrome(original);
    if (baked !== original) {
      await writeFile(file, baked);
      count += 1;
    }
  }

  console.log(`Built ${count} page(s) into dist/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
