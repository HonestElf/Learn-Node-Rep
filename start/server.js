// let user = require("./user");
let log = require("./logger")(module);
let db = require("./db");
let User = require("./user");
db.connect();

function run() {
  let vasya = new User("Вася");
  let petya = new User("Петя");

  vasya.hello(petya);
  log(db.getPhrase("Run successful"));
}

if (module.parent) {
  exports.run = run;
} else {
  run();
}
