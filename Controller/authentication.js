const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../Middleware/async");
const User = require("../Model/User");
const SuccessResponse = require("../utils/successResponse");
const ac = require("../Authorization/accesscontrol").default;
const Roles = require("../Model/Roles");

//Create User
exports.register = asyncHandler(async (req, res, next) => {
  const { username, password, roleid } = req.body;
  if (!username || !password) {
    return next(
      new ErrorResponse("Please provide an username and password!", 400)
    );
  }
  console.log(req.user);
  const user = User.create({
    username: username,
    password: User.encryptPass(password),
    roleid: roleid
  })
    .then(newUser => {
      res.send(new SuccessResponse("success")).status(200);
    })
    .catch(err => {
      return next(new ErrorResponse("Username existed", 500));
    });
});

//Login User
exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  //Validate email & password
  if (!username || !password) {
    return next(
      new ErrorResponse("Please provide an username and password!", 404)
    );
  }

  //Check user
  const user = await User.findOne({
    where: {
      username: username
    }
  });

  if (!user) {
    return next(new ErrorResponse("Invalid User Credentials", 404));
  }

  //CheckValidPassword
  const validPass = await user.matchPassword(password);
  const token = await user.getSignedJwtToken();

  if (!validPass) {
    return next(new ErrorResponse("Invalid User Credentials", 401));
  }

  //Check Valid Token
  if (!token) {
    return next(new ErrorResponse("Internal Server Error. Try Again", 500));
  }

  res.status(200).send({
    success: "true",
    token: token
  });
});
