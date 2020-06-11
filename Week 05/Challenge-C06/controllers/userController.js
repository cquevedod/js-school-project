
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('../services/jwt');
const msg = require('./statusMsg');

function register(req, res) {
  let user = new User();
  let params = req.body;
  user.name = params.name;
  user.surname = params.surname;
  user.role = 'ROLE_USER';

  if (params.password && params.name && params.email) {
    User.find({ email: params.email })
    .then(document => {
      if(!document.length) {
        user.email = params.email;
        bcrypt.hash(params.password, 10, function(err, hash) {
          user.password = hash;
          user.save((err, userStored) => {
            if (err) {
              console.log(err)
              return res.status(500).send({ message: 'Error trying to save the user', err });
            } else {
              if (!userStored) {
                return res.status(404).send(msg.notFound('User not registered'));
              } else {
               User.updateOne({ _id: userStored._id },
                { $set: { createdAt: userStored._id.getTimestamp() }
               }).exec();
               return res.status(200).send(msg.okUser('Success registering!', userStored));
              }
            }
          });
                   
        });
      } else {
        return res.status(401).send(msg.duplEmail('There is a user with this email!'));
      }
    })
    .catch(function(err) {
      console.log('error: ', err);
    });

  } else {
    return res.status(422).send(msg.dataRequired('Please complete the required data'));
  }
}

function loginUser(req, res) {
  let params = req.body;
  let email = params.email;
  let password = params.password;
  if (email && password) { 
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
      return res.status(500).send(msg.internalError());
      } else {
        if (!user) {
        return res.status(404).send(msg.notFound('The user does not exist'));
        } else {
          bcrypt.compare(password, user.password, function(err, check) {
            if (check) {
              let token = jwt.createToken(user);
              return res.status(200)
                .send({
                  email : email,
                  token
                });
            } else {
              return res.status(404).send(msg.notFound('Wrong data'));
            }
            });
        }
      }
  });
  } else { 
   return res.status(422).send(msg.dataRequired('Please complete the data'));
  }
}
 
module.exports = {
  register,
  loginUser
};
