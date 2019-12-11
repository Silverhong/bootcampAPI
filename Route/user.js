const express = require("express");
const route = express.Router();
const controller = require("../Controller/user");
const { protect } = require("../Middleware/auth");

route.route("/").get(protect, controller.getUser);

module.exports = route;
