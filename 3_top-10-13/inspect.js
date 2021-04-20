let util = require("util");

let obj = {
  a: 5,
  b: 6,
  inspect: function () {
    return 123;
  },
};
obj.self = obj;

console.log(util.inspect(obj));

let str = util.format("My %s %d %j", "MyString", 123, { test: "obj" });
console.log(str);
