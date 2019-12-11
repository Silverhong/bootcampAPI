const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../Model/User");
const dotenv = require("dotenv");

//Require Dotenv
dotenv.config({
  path: "./Config/config.env"
});

//Protect route
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    next(new ErrorResponse("Not authorize to access this route", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    if (err.name == "JsonWebTokenError")
      next(new ErrorResponse("Invalid Token", 400));
    else {
      next(new ErrorResponse(err.name, 401));
    }
  }
});

exports.protectAtlogin = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(process.env.BEARER_HEADER);
  console.log(token);
  if (token != process.env.BEARER_HEADER) {
    next(new ErrorResponse("Invalid Token", 400));
  } else {
    next();
  }
});
