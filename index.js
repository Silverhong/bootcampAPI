const express = require("express");
const dotenv = require("dotenv");
const app = express();
const errorHandler = require("./Middleware/error");
const connectDB = require("./Config/db");

//Require dotenv
dotenv.config({
  path: "./Config/config.env"
});

//Load env variables
const PORT = process.env.PORT;

//Route Files
const student = require("./Route/bootcamps");
const auth = require("./Route/auth");

//Body parser
app.use(express.json());

//Mount Route
app.use("/api/v1/bootcamps", student);
app.use("/api/v1/auth", auth);
app.use(errorHandler);

//Connect to database
connectDB();

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Closer server and exit process
  server.close(() => process.exit(1));
});
