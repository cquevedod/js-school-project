"use strict";
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("../services/jwt");
const msg = require("./statusMsg");

function tests(req, res) {
  res.status(200).send({
    message: "Testing controller action of users"
  });
}

function validateEmail (emailPassed) {
  let emailExists = User.find({email: emailPassed }).exec();
  if (!emailExists) return false;
  return true;
}

function register(req, res) {
  let user = new User();
  let params = req.body;
  console.log(params);
  user.name = params.name;
  user.surname = params.surname;
  
  if (params.email) {
      if (validateEmail(params.email) == true){
        let result = msg.notFound("There is a user with this email, please try again");
        res.status(404).send(result);
        return; 
      } else  {
        user.email = params.email;
      }
  } else if (!params.email){
    res.status(500).send({ message: "Please fill the complete data" });
    return;
  }
  console.log(user.email);
  user.role = "ROLE_USER";


  if (params.password) {
    bcrypt.hash(params.password, 10, function(err, hash) {
      user.password = hash;
      if (user.name && user.surname && user.email) {
        // Save user
        user.save((err, userStored) => {
          if (err) {
            res.status(500).send({ message: "Error trying to save the user" });
          } else {
            if (!userStored) {
              res.status(404).send(msg.notFound("User not registered"));
            } else {
              res.status(200).send({ user: userStored });
            }
          }
        });
      } else {
        res.status(500).send({ message: "Please fill the complete data" });
      }
    });
  } else {
    res.status(500).send({ message: "Introduce the password" });
  }
}

function loginUser(req, res) {
  let params = req.body;
  let email = params.email;
  let password = params.password;

  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500).send({ message: "Request Error" });
    } else {
      if (!user) {
        res.status(404).send(msg.notFound("The user doesn't exists"));
      } else {
        bcrypt.compare(password, user.password, function(err, check) {
          //Compare pass with pass in db
          if (check) {
            //return user data when is logged in
            if (params.gethash) {
              res.status(200).send({
                token: jwt.createToken(user)
              });
            } else {
              res.status(200).send({ user });
            }
          } else {
            res.status(404).send(msg.notFound("There is no user with the data provided"));
          }
        });
      }
    }
  });
}

module.exports = {
  tests,
  register,
  loginUser
};
