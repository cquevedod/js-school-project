const express = require('express');
const UserController = require('../controllers/userController');
const userController = require('../controllers/userController');

let api = express.Router();
let md_auth = require('../middlewares/auth');


api.post('/register', UserController.register);
api.post('/login', UserController.loginUser);
api.delete('/user/:id', md_auth.ensureAuth, userController.deleteUser);

module.exports = api;
