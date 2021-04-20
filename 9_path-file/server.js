//http://127.0.0.1:3000/index.thml?secret=o_O
const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
// const { send } = require("process");

const ROOT = __dirname + "\\public\\";
const PORT = 3000;

const file_server = http.createServer(function (req, res) {
  if (!checkACcess(req)) {
    res.statusCode = 403;
    res.end("Tell me the secret to access");
    return;
  }

  sendFileSafe(url.parse(req.url).pathname, res);
});

file_server.listen(PORT);

function checkACcess(req) {
  return url.parse(req.url, true).query.secret == "o_O";
}

function sendFileSafe(filePath, res) {
  try {
    filePath = decodeURIComponent(filePath);
  } catch (e) {
    res.statusCode = 400;
    res.end("Bad request");
    return;
  }
  if (~filePath.indexOf("\0")) {
    res.statusCode = 400;
    res.end("Bad request: null-byte found");
    return;
  }
  filePath = "/deep/nodejs.png";
  console.log(filePath);
  console.log(ROOT);
  filePath = path.normalize(path.join(ROOT, filePath));
  console.log(filePath);
  console.log(filePath.indexOf(ROOT));

  if (filePath.indexOf(ROOT) != 0) {
    res.statusCode = 404;
    res.end("File not found: wrong path");
    return;
  }

  fs.stat(filePath, function (err, stats) {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.end("File not found: not a file");
    }
    sendFile(filePath, res);
  });
}
function sendFile(filePath, res) {
  fs.readFile(filePath, function (err, content) {
    if (err) throw err;

    let mime = require("mime").getType(filePath); //.lookup(filePath);
    res.setHeader("Content-Type", mime + ";charset=utf-8");
    res.end(content);
  });
}
