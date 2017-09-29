const mongoose = require('mongoose'),
passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  email: String,
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo"
    }
  ]
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);