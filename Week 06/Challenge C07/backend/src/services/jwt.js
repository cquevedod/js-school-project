'use strict';

const jwt = require('jwt-simple');
const moment = require('moment'); 
let secret = 'one_second'; 

exports.createToken = function(user) {
  let payload = {
    sub: user._id, 
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    /*Dates in unit format in order to compare each other*/
    iat: moment().unix(), //token date
    exp: moment().add(4, 'hours').unix //expiration time
  };
 
  return jwt.encode(payload, secret);
};
