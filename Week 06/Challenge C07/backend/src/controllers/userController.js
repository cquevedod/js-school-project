"use strict";
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("../services/jwt");
const msg = require("./statusMsg");

async function register(req, res) {
  try {
    let user = new User();
    let params = req.body;
    user.name = params.name;
    user.surname = params.surname;
    user.role = "ROLE_USER";
    let inputEmail = params.email;
    let passw = params.password;

    if (inputEmail && passw && user.name) {
      const query = await User.find({ email: params.email.toLowerCase() }).exec();
      if (!query.length) {
        user.email = inputEmail;
      } else {
        let result = msg.duplEmail('There is a user with this email');
        return res.status(401).send(result);      
      }
        console.log('Entry')
        const hash = await bcrypt.hash(passw, 10);
        user.password = hash;
        const userStored = await user.save();
        console.log(userStored)
        if (!userStored) {
          return res.status(404)
            .send(msg.notFound('User not registered'));
        } else {
          return res.status(200)
            .send(msg.okUser('Success registering!', userStored));
        }
    
    } else {
      return res.status(422).send(msg
        .dataRequired('Please complete the required data'));
    } 
  
  } catch (error) {
    res.send(`Internal error: ${error}`);
  }
  
}


async function loginUser (req, res) {
  try {
    let params = req.body;
    let email = params.email;
    let password = params.password;
    if (email && password) {
      const user = await User.findOne({ email: email.toLowerCase() }).exec();
      if (!user) {
        return res.status(404)
          .send(msg.notFound('The user doesn\'t exist'));
      } else {
        const check = await bcrypt.compare(password, user.password);
        if (check) {
          return res.status(200)
            .send({
              email : email,
              token: jwt.createToken(user)
            });
        } else {
          return res.status(404)
            .send(msg.notFound('Wrong data'));
        }
      }
    } else {
      return res.status(422)
        .send(msg.dataRequired('Please complete the data'));
    }
  } catch (error) {
      res.send(`Internal error: ${error}`);
    }  
  }
 
module.exports = {
  register,
  loginUser
};
