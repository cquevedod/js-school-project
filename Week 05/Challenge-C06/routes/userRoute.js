const express = require('express');
const UserController = require('../controllers/userController');
const userController = require('../controllers/userController');

const api = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin')


api.post('/register', UserController.register);
api.post('/login', UserController.loginUser);
api.delete('/user/:id', [auth, admin], userController.deleteUser);
api.get('/user/me', auth, userController.getMe);
api.get('/user/all', [auth, admin], userController.getAllUsers);

module.exports = api;
