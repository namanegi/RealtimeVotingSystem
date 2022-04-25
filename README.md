# real time voting system

A system that can updated new question/options by teacher, and voted by students, written in vue.js and node.js.
The result will be shown in real time by Websocket.

# how to run this system in dev env

For ws Server:
node .\server\server.js

For vue frontend
(npm install)
npm run serve

# how to build this project

npm run build

use the build directory, and start up http server with wsSever like below

const server = http.createServer(function(req, res) {
  if (req.url === '/') {
    fs.readFile('./index.html', 'UTF-8', (err, html) => {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(html);
    });
  }
  else if (req.url.match(/.css$/)) {
    const cssStream = fs.createReadStream(path.join(__dirname, req.url), 'UTF-8');
    res.writeHead(200, {"Content-Type": "text/css"});
    cssStream.pipe(res);
  }
  else if (req.url.match(/.js$/)) {
    const jsStream = fs.createReadStream(path.join(__dirname, req.url), 'UTF-8');
    res.writeHead(200, {"Content-Type": "application/javascript"});
    jsStream.pipe(res);
  }
}).listen(port);

