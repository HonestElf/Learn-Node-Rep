const winston = require("winston");

module.exports = function (module) {
  return makeLogger(module.filename);
};

function makeLogger(path) {
  if (path.match(/request.js$/)) {
    let transports = [
      new winston.transport.Console({
        timestamp: true,
        colorize: true,
        level: "info",
      }),
      new winston.transport.File({ filename: "debug.log", level: "debug" }),
    ];
    return winston.createLogger({ transports: transports });
  } else {
    return winston.createLogger({ transports: [] });
  }
}
