let EventEmitter = require("events").EventEmitter;

let server = new EventEmitter();

server.on("request", function (request) {
  request.approved = true;
});

server.on("request", function (request) {
  console.log(request);
});

server.emit("request", { from: "Клиент" });
server.emit("request", { from: "Еще Клиент" });
