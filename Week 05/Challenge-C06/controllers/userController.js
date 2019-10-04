"use strict";
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("../services/jwt");

function tests(req, res) {
  res.status(200).send({
    message: "Testing controller action of users"
  });
}

function saveUser(req, res) {
  let user = new User();
  //Propiedades params, dentro de cada una estarán las propiedades enviadas por post.
  //Los siguientes datos llegan por POST
  let params = req.body;
  console.log(params);
  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;
  user.role = "ROLE_USER";

  if (params.password) {
    //Encriptar contraseña y guardar datos.
    bcrypt.hash(params.password, 10, function(err, hash) {
      user.password = hash;
      if (user.name && user.surname && user.email) {
        // Save user
        user.save((err, userStored) => {
          if (err) {
            res.status(500).send({ message: "Error trying to save the user" });
          } else {
            if (!userStored) {
              res.status(404).send({ message: "User not registered" });
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
        res.status(404).send({ message: "The user doesnt exists" });
      } else {
        bcrypt.compare(password, user.password, function(err, check) {
          //Compare pass with pass in db
          if (check) {
            //return user data when is logged in
            if (params.gethash) {
              // Return a token with JWT, user token.
              // I should have a service de JWT, return a http response with the token
              //El token  va a tener todos los datos del usuario codificados. Eso genera un hash
              //Con el middleware va a decodificar el token en cada una de las peticiones y
              // comprobar que cada token sea correcto.

              //Ahora se puede utilizar el servicio del TOKEN
              res.status(200).send({
                token: jwt.createToken(user)
              });
            } else {
              res.status(200).send({ user });
            }
          } else {
            res.status(404).send({ message: "the user cant log in" });
          }
        });
      }
    }
  });
}

module.exports = {
  tests,
  saveUser,
  loginUser
};
