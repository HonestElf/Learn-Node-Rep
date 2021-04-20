let http = require("http");
let fs = require("fs");
let chat = require("./chat");

const PORT = 1337;
const ADDR = "127.0.0.1";

const chat_server = http.createServer(function (req, res) {
  switch (req.url) {
    case "/":
      console.log("Switch: /");
      sendFile("index.html", res);
      break;

    case "/subscribe":
      console.log("Switch: subscribe");
      chat.subscribe(req, res);
      break;

    case "/publish":
      console.log("Switch: publish");
      let body = "";

      req
        .on("readable", function () {
          let x = req.read();
          console.log(x);
          if (x) {
            body += x;
          }

          if (body.length > 1e4) {
            res.statusCode = 413;
            res.end("Your message is too big");
          }
        })
        .on("end", function () {
          try {
            console.warn(body);
            body = JSON.parse(body);
          } catch (e) {
            console.log("Error:", e);
            res.statusCode = 400;
            res.end("Bad request");
            return;
          }
          chat.publish(body.message);
          res.end("ok");
        });

      break;

    default:
      console.log("Switch: def");
      res.statusCode = 404;
      res.end();
      break;
  }
});

chat_server.listen(PORT, ADDR);

function sendFile(fileName, res) {
  let fileStream = fs.createReadStream(fileName);
  fileStream
    .on("error", function () {
      res.statusCode = 500;
      res.end("ServerError");
    })
    .pipe(res)
    .on("close", function () {
      fileStream.destroy();
    });
}
