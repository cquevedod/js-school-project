'use strict';
const jwt = require('jwt-simple');
/* used to have the creation date and exp date of the token */
const moment = require('moment'); 
/* secret key to hash the createToken Object */
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
    exp: moment().add(1, 'days').unix //expiration time
  };
 
  return jwt.encode(payload, secret);
};

