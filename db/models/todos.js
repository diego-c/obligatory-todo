const mongoose = require('mongoose'),
passportLocalMongoose = require('passport-local-mongoose');

let todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  important: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now()
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

//todoSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Todo", todoSchema);