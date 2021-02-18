//http://127.0.0.1:3000/big.html
const http = require("http");
const fs = require("fs");

const PORT = 3000;

const pipe_server = http.createServer(function (req, res) {
  if (req.url == "/big.html") {
    let file = new fs.ReadStream("big.html");

    sendFile(file, res);
  }
});

pipe_server.listen(PORT);

function sendFile(file, res) {
  //новая реализация
  file.pipe(res); //откуда - куда
  file.pipe(process.stdout); //можно в два потока

  file.on("error", function (err) {
    res.statusCode = 500;
    res.end("Server Error");
    console.error(err);
  });

  file.on("open", function () {
    console.log("open");
  });

  file.on("close", function () {
    console.log("close");
  });
  //res.on"close" - соединение было оборвано! - отличается от
  //file.on"close"
  res.on("close", function () {
    file.destroy();
  });

  //ручная реализация
  //   file.on("readable", write);

  //   function write() {
  //     let fileContent = file.read(); //считать

  //     //отправить
  //     if (fileContent && !res.write(fileContent)) {
  //       file.removeListener("readable", write);

  //       //подождать
  //       res.once("drain", function () {
  //         file.on("readable", write);
  //         write();
  //       });
  //     }
  //   }
  //   file.on("end", function () {
  //     res.end();
  //   });
}
