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

exports.decodeToken = function(token) {
  let tokenParsed = token.replace(/['"]+/g, ""); 
  try {
    //var used here because of scope. if use let, the payload in the line 27 will be undefined
    var payload = jwt.decode(tokenParsed, secret); 

  } catch (ex) {
    console.log(ex);
  }
  return payload;

}

