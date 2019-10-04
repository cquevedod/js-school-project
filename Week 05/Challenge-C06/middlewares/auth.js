'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
let secret = 'one_second'; // secret key to hashear el objeto createToken

// permite comprobar si los datos del token
// que va a llegar son correctos o no
// va a recibir todos los parametros, los valores que va a
// recibir una petición HTTP
exports.ensureAuth = function(req, res, next) {
  // se recoge la autorización ahora, lo que venga por la request
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "You need authorization to do this action. Please login and get the Token" });
  }

  let token = req.headers.authorization.replace(/['"]+/g, ""); // remove comillas simples y dobles que pueda tener el string

  try {
    var payload = jwt.decode(token, secret); // I use var here because of hoisting, if use let. The payload in the line 39 will be undefined
    // if (!payload) {
    //   return res.status(428).send({ message: "You need to login first!" });
    // }

    console.log(payload);

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: "Token has expirated" });
    }
  } catch (ex) {
    console.log(ex);
    return res.status(401).send({ message: "Invalid Token" });
  }
  console.log("Now...");
  // console.log(payload);

  req.user = payload;
  next();
};
