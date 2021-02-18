const fs = require("fs");

const stream = new fs.ReadStream(__filename, { encoding: "utf-8" });

stream.on("readable", function () {
  let data = stream.read();
  //   console.log(data.toString());
  console.log(data);
});

stream.on("end", function () {
  console.log("THE END");
});
