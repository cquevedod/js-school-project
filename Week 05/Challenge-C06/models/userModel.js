const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = Schema({
  name: { 
    type: String,
    required: true
   },
  surname: String,
  email: { 
    type: String,
    unique: true,
    required: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  },
  password: {
     type: String,
     required: true
  },
  role: String,
  createdAt: Date 
});

module.exports = mongoose.model('User', UserSchema);
