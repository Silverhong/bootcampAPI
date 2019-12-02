const express = require("express");
const route = express.Router();
const controller = require("../Controller/bootcamps");
const { protect } = require("../Middleware/auth");

route
  .route("/")
  .get(controller.getBootcamps)
  .post(controller.createBootcamp);
route
  .route("/:id")
  .get(controller.getBootcamp)
  .put(controller.updateBootcamp)
  .delete(protect, controller.deleleBootcamp);
module.exports = route;
