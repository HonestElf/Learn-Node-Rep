const http = require("http");

const HOSTNAME = "127.0.0.1";
const PORT = 3000;

let counter = 0;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World!" + ++counter);
});

let myEmit = server.emit;

server.emit = function (event) {
  console.log(event);
  myEmit.apply(server, arguments);
};

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
