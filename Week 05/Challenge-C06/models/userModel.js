"use strict";

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  role: String
  // book: {type: Schema.ObjectId, ref: 'Book'}
});

module.exports = mongoose.model("User", UserSchema);
