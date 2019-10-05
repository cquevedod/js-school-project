"use strict";
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("../services/jwt");
const msg = require("./statusMsg");

function register(req, res) {
  let user = new User();
  let params = req.body;
  user.name = params.name;
  user.surname = params.surname;
  user.role = "ROLE_USER";

  
  if (params.email) {
    let query = User.find({ email: params.email }).exec();
    query.
      then(data => {
        if (!data.length) {
          user.email = params.email;
      }  else {
        let result = msg.duplEmail('There is a user with this email, please try again');
        res.status(401).send(result);
        return;
      }
      })
      .catch(function(err) {
        console.log("error: ", err);
      });
   
  } 
  console.log(user.email);

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
              const response = {
                status: 200,
                message: 'Success registering!',
                user: userStored,
              };
              res.status(200).send(response);
            }
          }
        });
      } 

    });
  } else {
    res.status(422).send(msg.dataRequired('Introduce the password'));
  }
}

function loginUser(req, res) {
  let params = req.body;
  let email = params.email;
  let password = params.password;

  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500).send(msg.internalError());
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
  register,
  loginUser
};
