"use strict";

const express = require("express");
const UserController = require("../controllers/userController");

let api = express.Router();
let md_auth = require("../middlewares/auth");
api.get("/testing-controller", md_auth.ensureAuth, UserController.tests);
api.post("/register", UserController.register);
api.post("/login", UserController.loginUser);

module.exports = api;
