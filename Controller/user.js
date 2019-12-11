const User = require("../Model/User");
const AsyncHandler = require("../Middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.getUser = AsyncHandler(async (req, res, next) => {
  //console.log(req.user);

  const user = await User.findAll().then(users => {
    res.status(200).send(JSON.stringify(users));
  });
});
