const AccessControl = require("accesscontrol");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../Middleware/async");
const RoleDetail = require("../Model/RolesDetail");
const Role = require("../Model/Roles");
const accessControl = new AccessControl();

AccessControl.prototype.init = function() {
  return "role";
};

module.exports = AccessControl;
