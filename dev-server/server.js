// 127.0.0.1:1337/echo?message=TEST
const http = require("http");
const debug = require("debug")("server");

const PORT = 1337;
const SERVER = "127.0.0.1";

const dev_server = http.createServer();

dev_server.on("request", require("./request"));

// dev_server.listen(PORT, SERVER);
dev_server.listen(PORT);

// console.log(`Server running at http://${SERVER}:${PORT}/`);
debug(`Server running`);
