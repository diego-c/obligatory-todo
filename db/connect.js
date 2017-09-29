const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");
// todo DB
let options = {
  useMongoClient: true,
  promiseLibrary: global.Promise
};
mongoose.Promise = global.Promise;
module.exports = mongoose.connect(process.env.CONNECT, options);


