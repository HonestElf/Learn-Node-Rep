// 127.0.0.1:1337/echo?message=Hello
const http = require("http");
const url = require("url");

const PORT = 1337;
const SERVER = "127.0.0.1";

const echo_server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  let urlParsed = url.parse(req.url, true);
  //   console.log(urlParsed);
  //   console.log("headers: ", req.headers);

  if (urlParsed.pathname == "/echo" && urlParsed.query.message) {
    // альтернативный способ написания заголовка - явный способ, заголовки пишутся сразу
    // res.writeHead(200, "Ok", { "Cache-control": "no-cache" });

    res.setHeader("Cache-control", "no-cache");
    res.end(urlParsed.query.message + " blah-blah");
  } else {
    res.statusCode = 404; //Not found
    res.end("Page not found");
  }
});

echo_server.listen(PORT, SERVER);
