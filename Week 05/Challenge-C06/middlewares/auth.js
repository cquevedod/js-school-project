'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const msg = require("../controllers/statusMsg");
let secret = 'one_second'; // secret key to hashear el objeto createToken

// permite comprobar si los datos del token
// que va a llegar son correctos o no
// va a recibir todos los parametros, los valores que va a
// recibir una petición HTTP
exports.ensureAuth = function(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .send(msg.unAuthorized('You need authorization to do this action. Please login and get the Token'));
  }

  let token = req.headers.authorization.replace(/['"]+/g, ""); // remove comillas simples y dobles que pueda tener el string

  try {
    var payload = jwt.decode(token, secret); //use var here because of hoisting. if use let, the payload in the line 39 will be undefined

    console.log(payload);

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: 'Token has expired' });
    }
  } catch (ex) {
    console.log(ex);
    return res.status(401).send(msg.unAuthorized('Invalid authentication Token'));
  }
  console.log("Now...");
  // console.log(payload);

  req.user = payload;
  next();
};
