const http = require('http');
const path = require('path');
const fs = require('fs');

(async () => {
  const isFile = (path) => fs.lstatSync(path).isFile();

  http.createServer((req, res) => {
    const readPath = path.join(process.cwd(), req.url);

    if (!fs.existsSync(readPath)) return res.end('File or directory not found');

    if (isFile(readPath)) {
      return fs.createReadStream(readPath).pipe(res);
    }

    let list = '';

    const url = req.url.match(/[\d\w\.]+/gi);

    if (url) {
      url.pop();
      const prevUrl = url.join('/');
      list = url.length ? `<li><a href="/${prevUrl}">..</a></li>` : '<li><a href="/">..</a></li>';
    }

    fs.readdirSync(readPath)
      .forEach(fileName => {
        const filePath = path.join(req.url, fileName);
        list += `<li><a href="${filePath}">${fileName}</a></li>`;
      });
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8').replace('el', list);
    res.writeHead(200, {
      'Content-Type': 'text/html',
    })
    return res.end(html);
  }).listen(8000);
})();