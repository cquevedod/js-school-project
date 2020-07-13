const express = require('express');
const UserController = require('../controllers/userController');
const userController = require('../controllers/userController');

const api = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin')
const catchError = require('../middlewares/catch');

api.post('/register', catchError(UserController.register));
api.post('/login', catchError(UserController.loginUser));
api.delete('/user/:id', [auth, admin], catchError(userController.deleteUser));
api.get('/user/me', auth, catchError(userController.getMe));
api.get('/user/all', [auth, admin], catchError(userController.getAllUsers));

module.exports = api;
