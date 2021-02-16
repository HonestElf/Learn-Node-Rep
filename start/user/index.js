// exports
let log = require("../logger")(module);
let db = require("../db");
// db.connect();

function User(name) {
  this.name = name;
}

User.prototype.hello = function (who) {
  // console.log("Hello, " + who.name);
  log(db.getPhrase("Hello") + "," + who.name);
};

// console.log("user.js is required!");

// console.log(module);

module.exports = User;
// exports.User = User;

// global.User = User;
