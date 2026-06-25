const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'mock-snapshots');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  let p = req.url === '/' ? '/find-jobs.html' : req.url;
  p = decodeURIComponent(p.split('?')[0]);
  const file = path.join(root, p);
  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(file).toLowerCase();
    const ct = ext === '.html' ? 'text/html; charset=utf-8' : 'application/octet-stream';
    res.writeHead(200, {'Content-Type': ct});
    res.end(data);
  });
});

server.listen(port, '0.0.0.0', () => console.log(`Mock snapshots serving at http://localhost:${port}`));
