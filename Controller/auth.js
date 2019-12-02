const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../Middleware/async");
const User = require("../Model/User");

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //Create user
  const user = await User.create({
    name,
    email,
    password,
    role
  });

  //Create Token
  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, token: token });
});

//@desc     Login user
//@route    POST /api/v1/auth/login
//@access   public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //Validate email & password
  if (!email || !password) {
    return next(
      new ErrorResponse("Please provide an email and password!", 404)
    );
  }

  //Check user
  const user = await User.findOne({ email }).select("+password");
  console.log(user.password);
  if (!user) {
    return next(new ErrorResponse("Invalid User Credentials", 401));
  }
  //Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Password Credentials", 401));
  }
  //Send Token
  sendTokenResponse(user, 200, res);
});
//Get token from model, create cookie and send responses
const sendTokenResponse = (user, statusCode, res) => {
  //Create Token
  const token = user.getSignedJwtToken();
  const option = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  res
    .status(statusCode)
    .cookie("token", token, option)
    .json({
      success: true,
      token
    });
};
