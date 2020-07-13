
const jwt = require('jwt-simple');
const moment = require('moment');
const msg = require('../controllers/statusMsg');
const secret = 'one_second'; // secret key to hash createToken object

module.exports = function (req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .send('Access denied. No token provided');
  }

  const token = req.headers.authorization.replace(/['"]+/g, "");
  try {
    //var used here because of scope. if use let, the payload in the line 27 will be undefined
    var payload = jwt.decode(token, secret);
    if (payload.exp <= moment().unix()) return res.status(401).send({ message: 'Token has expired' });
  } catch (ex) {
    console.log(`Error auth: ${ex}`);
    return res.status(400).send(msg.unAuthorized('Invalid authentication Token'));
  }
  req.user = payload;
  next();
};


