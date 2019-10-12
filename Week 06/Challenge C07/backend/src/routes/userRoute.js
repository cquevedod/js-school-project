"use strict";

const express = require("express");
const UserController = require("../controllers/userController");

let api = express.Router();
api.post("/register", UserController.register);
api.post("/login", UserController.loginUser);

module.exports = api;
