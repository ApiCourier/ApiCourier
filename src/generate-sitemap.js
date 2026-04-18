const fs = require('fs');
const path = require('path');

const SITE_ORIGIN = 'https://apicourier.dev';
const ROOT = __dirname;

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function extractCanonical(html) {
  const match = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  return match ? match[1].trim() : null;
}

function getIsoDateFromMtime(filePath) {
  const mtime = fs.statSync(filePath).mtime;
  return mtime.toISOString().slice(0, 10);
}

function collectHtmlFiles(root) {
  return fs
    .readdirSync(root)
    .filter((name) => name.endsWith('.html'))
    .map((name) => path.join(root, name));
}

function buildSitemapEntries(files) {
  const entries = [];

  for (const filePath of files) {
    const html = fs.readFileSync(filePath, 'utf8');
    const canonical = extractCanonical(html);

    if (!canonical) {
      continue;
    }

    if (!canonical.startsWith(SITE_ORIGIN)) {
      continue;
    }

    entries.push({
      loc: canonical,
      lastmod: getIsoDateFromMtime(filePath)
    });
  }

  entries.sort((a, b) => a.loc.localeCompare(b.loc));
  return entries;
}

function createSitemapXml(entries) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];

  for (const entry of entries) {
    lines.push('  <url>');
    lines.push(`    <loc>${escapeXml(entry.loc)}</loc>`);
    lines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  lines.push('');
  return lines.join('\n');
}

function createRobotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`;
}

function writeOutputs() {
  const htmlFiles = collectHtmlFiles(ROOT);
  const entries = buildSitemapEntries(htmlFiles);

  const sitemapXmlPath = path.join(ROOT, 'sitemap.xml');
  const robotsTxtPath = path.join(ROOT, 'robots.txt');

  fs.writeFileSync(sitemapXmlPath, createSitemapXml(entries), 'utf8');
  fs.writeFileSync(robotsTxtPath, createRobotsTxt(), 'utf8');

  console.log(`Wrote ${sitemapXmlPath} with ${entries.length} URL(s).`);
  console.log(`Wrote ${robotsTxtPath}.`);
}

writeOutputs();
