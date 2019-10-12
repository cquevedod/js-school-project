'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const msg = require("../controllers/statusMsg");
let secret = 'one_second'; // secret key to hash createToken object

exports.ensureAuth = function(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .send(msg
      .unAuthorized('You need authorization to do this action. Please login and get the Token'));
  }

  let token = req.headers.authorization.replace(/['"]+/g, ""); 
  try {
    //var used here because of scope. if use let, the payload in the line 27 will be undefined
    var payload = jwt.decode(token, secret); 
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: 'Token has expired' });
    }
  } catch (ex) {
    console.log(ex);
    return res.status(401).send(msg.unAuthorized('Invalid authentication Token'));
  }
  req.user = payload;
  next();
};
