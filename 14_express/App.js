const express = require("express");
let http = require("http");
let errorhandler = require("errorhandler");

let app = express();
const PORT = 3000;

// app.set("port", 3000);

// http.createServer(app).listen(app.get("port"), function () {
//   console.log(`Example app listening at port ` + app.get("port"));
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

//Middleware
app.use(function (req, res, next) {
  if (req.url == "/") {
    res.end("Hello");
  } else {
    next();
  }
});

app.use(function (req, res, next) {
  if (req.url == "/forbidden") {
    next(new Error("access denied"));
  } else {
    next();
  }
});
app.use(function (req, res, next) {
  if (req.url == "/test") {
    res.end("testPage");
  } else {
    next();
  }
});

app.use(function (req, res) {
  res.send(404, "page not found");
});

app.use(function (err, req, res, next) {
  //NODE_ENV = 'production'
  if (app.get("env") == "development") {
    app.use(errorhandler());
  } else {
    res.send(500);
  }
});
