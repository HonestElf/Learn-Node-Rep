let phrases;

exports.connect = function () {
  phrases = require("./ru");
};

exports.getPhrase = function (name) {
  if (!phrases[name]) {
    throw new Error("Нет фразы: " + name);
  } else {
    return phrases[name];
  }
};
