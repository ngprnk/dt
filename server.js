const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const DIST_DIR = path.join(__dirname, 'dist');

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.url}`);

  let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    // Always serve as JavaScript for bundle files
    res.writeHead(200, {
      'Content-Type': 'application/javascript',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Bundle server running at http://localhost:${PORT}`);
  console.log(`Serving files from: ${DIST_DIR}`);
});
