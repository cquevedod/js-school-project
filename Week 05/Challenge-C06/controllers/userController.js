
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('../services/jwt');
const msg = require('./statusMsg');
const { padStart } = require('lodash');


function register(req, res) {
  
  const {name, surname, email, password, role} = req.body;

  if (!password || !name || !email) return res.status(422).send(msg.dataRequired('Please complete the required data'));
    User.find({ email })
    .then(existingUser => {
      console.log(existingUser);
      if (existingUser.length) return res.status(401).send(msg.duplEmail('There is a user with this email!'));
        
        let user = new User({
          email: email.toLowerCase(),
          name,
          surname,
          role: 'ROLE_USER'
        });

        bcrypt.hash(password, 10)
        .then(hash => {
          user.password = hash;
          user.save()
          .then(userStored => {
            if (!userStored) return res.status(404).send(msg.notFound('User not registered. Try again'));
            User.updateOne({ _id: userStored._id },
              { $set: { createdAt: userStored._id.getTimestamp() }
            }).exec();
             return res.status(200).send(msg.okUser('Success registering!', _.pick(userStored, ['_id', 'name', 'email'])));
          })
          .catch(function(err) {
            if (err.name == 'ValidationError') return res.status(400).send({ message: 'Error trying to save the user', err });
            return res.status(500).send({ message: 'Error trying to save the user', err });
          })
        })
        .catch(function (err) {
          console.log('error: ', err);
          return res.status(500).send(msg.internalError(), err)
        })

    })
    .catch(function(err) {
      console.log('error: ', err);
      return res.status(500).send(msg.internalError(), err);
    });
}

function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(422).send(msg.dataRequired('Please complete the data properly'));

  User.findOne( { email: email.toLowerCase() } )
  .then(user => {
    if(!user) return res.status(404).send(msg.notFound('The user does not exist'));

    bcrypt.compare(password, user.password)
    .then(check => {
      if (!check) return res.status(404).send(msg.notFound('Wrong credentials'));
      let token = jwt.createToken(user);
      return res.status(200)
        .send({
          email : email,
          token
        });
    })
    .catch(function(err) {
      console.log('error: ', err);
    })
  })
  .catch(function(err) {
    console.log('error: ', err);
    return res.status(500).send(msg.internalError(), err);
  })
} 

 
module.exports = {
  register,
  loginUser
};
