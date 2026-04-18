const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8080;
const root = __dirname;
const workerBaseUrl = (process.env.APICOURIER_WORKER_BASE_URL || '').trim();

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png'
};

function injectRuntimeConfig(html) {
  const runtimeConfigScript = `<script>window.__APICOURIER_RUNTIME_CONFIG__=Object.assign({},window.__APICOURIER_RUNTIME_CONFIG__,{workerBaseUrl:${JSON.stringify(workerBaseUrl)}});</script>`;
  if (!html.includes('</head>')) {
    return `${runtimeConfigScript}${html}`;
  }

  return html.replace('</head>', `${runtimeConfigScript}\n</head>`);
}

function serveFile(candidates, res) {
  const [current, ...remaining] = candidates;

  fs.readFile(current, (err, data) => {
    if (err) {
      if (remaining.length > 0) {
        return serveFile(remaining, res);
      }
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    const ext = path.extname(current);
    const contentType = contentTypes[ext] || 'application/octet-stream';
    const payload = ext === '.html' ? Buffer.from(injectRuntimeConfig(data.toString('utf-8')), 'utf-8') : data;
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(payload);
  });
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const safePath = urlPath === '/' ? '/index.html' : urlPath;
  const filePath = path.join(root, safePath);

  // Match Cloudflare Pages behavior: if the request has no extension and the
  // exact file doesn't exist, fall back to `<path>.html`. Lets extensionless
  // links like /terms and /privacy work locally the same way they do in prod.
  const candidates = path.extname(filePath)
    ? [filePath]
    : [filePath, `${filePath}.html`];

  serveFile(candidates, res);
});

server.listen(port, () => {
  console.log(`Serving ${root} at http://localhost:${port}`);
});
