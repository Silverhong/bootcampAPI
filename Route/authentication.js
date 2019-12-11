const express = require("express");
const route = express.Router();
const controller = require("../Controller/authentication");
const { protect, protectAtlogin } = require("../Middleware/auth");

route.route("/login").post(protectAtlogin, controller.login);
route.route("/register").post(protect, controller.register);

module.exports = route;
