const Bootcamp = require("../Model/Bootcamp");
const AsyncHandler = require("../Middleware/async");
const ErrorResponse = require("../utils/errorResponse");
// @desc    Get all bootcamp
// @route   GET /api/v1/bootcamp
// @access  public
exports.getBootcamps = AsyncHandler(async (req, res, next) => {
  const bootcamp = await res
    .status(200)
    .send("Get All bootcamp" + req.params.id);
});

// @desc    Get bootcamp
// @route   GET /api/v1/bootcamp/:id
// @access  public
exports.getBootcamp = (req, res, next) => {
  res.status(200).send("Get bootcamp id=" + req.params.id);
};

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamp/:id
// @access  Admin
exports.updateBootcamp = (req, res, next) => {
  res.status(200).send("Update bootcamp" + req.params.id);
};

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamp/:id
// @access  Admin
exports.deleleBootcamp = (req, res, next) => {
  res.status(200).send("Delete bootcamp" + req.params.id);
};

// @desc    Create bootcamp
// @route   POST /api/v1/bootcamp
// @access  public
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(200).json({
      success: true,
      data: bootcamp
    });
  } catch (err) {
    next(new ErrorResponse("Testing Error", 500));
  }
};
