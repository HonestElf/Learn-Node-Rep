const fs = require("fs");

// fs.readFile(__filename, function (err, data) {
fs.readFile("asdads", function (err, data) {
  if (err) {
    if (err.code == "ENOENT") {
      console.error("got an error: " + err.message);
    }
  } else {
    console.log(data.toString());
  }
});

fs.writeFile("file.tmp", "data", function (err) {
  if (err) throw err;
  fs.rename("file.tmp", "new.tmp", function (err) {
    if (err) throw err;
  });
});
