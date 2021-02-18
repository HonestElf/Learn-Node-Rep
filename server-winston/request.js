const url = require("url");
const log = require("./log")(module);

module.exports = function (req, res) {
  let urlParsed = url.parse(req.url, true);

  log.info("Got request", req.method, req.url);
  if (
    (req.method =
      "GET" && urlParsed.pathname == "/echo" && urlParsed.query.message)
  ) {
    let message = urlParsed.query.message;

    log.debug("Echo: " + message);
    res.end(message);
    return;
  }

  log.error("Unknown URL");
  res.statusCode = 404;
  res.end("Not Found");
};
