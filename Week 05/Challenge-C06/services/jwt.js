'use strict';
const jwt = require('jwt-simple');
const moment = require('moment');
let secret = 'one_second'; // secret key to hashear el objeto createToken

// Moment para hacer dentro del payload
//tener la fecha de creación del token (o payload)
// y también la fecha de expiración del token
// si ha exprirado, es necesario volver a loguearse

// El objeto de usuario lo va a guardar
// dentro de la codificación dl token,
// como un hash
exports.createToken = function(user) {
  // datos a codificar
  let payload = {
    sub: user._id, // save the user's id
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    // las fechas se colocan en formato unix para poder
    //compararlas
    iat: moment().unix(), // la fecha del token
    exp: moment().add(30, 'days').unix // que expire cada cinco días
  };
  // reurn the encoded token, se cifra el payload (que es el objeto del usuario que se va a identificar: son los datos que van a estar dentro del token guardado) y se
  // Utiliza una clave secreta para hacer el hash que el token genera
  return jwt.encode(payload, secret);
};

// Puedes hacer otros metodos que se te ocurran
// el siguiente paso es crear el token y poder utilizar este servicio

// REALIZAR EL SERVICIO PARA LOS LIBROS TAMBIÉN
