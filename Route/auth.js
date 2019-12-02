const express = require("express");
const register = require("../Controller/auth");

const route = express.Router();
route.post("/register", register.register);
route.post("/login", register.login);
module.exports = route;
