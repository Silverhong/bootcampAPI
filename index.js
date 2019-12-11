const express = require("express");
const dotenv = require("dotenv");
const app = express();
const errorHandler = require("./Middleware/error");
const connectDB = require("./Config/db");
const AccessControl = require("./Authorization/accesscontrol");

//Require dotenv
dotenv.config({
  path: "./Config/config.env"
});

//Load env variables
const PORT = process.env.PORT;

//Route Files
const authentication = require("./Route/authentication");
const user = require("./Route/user");

//Body parser
app.use(express.json());

//Mount Route
app.use("/api/v1/user", user);
app.use("/api/v1/authentication", authentication);
app.use(errorHandler);

// const permission = ac.can("admin").createOwn("user");
// if (permission.granted) {
//   console.log("granted");
// }
//Connect to database
//connectDB();
const server = app.listen(PORT, () => {
  //const accessControl = AccessControl;
  console.log(AccessControl);
  console.log(`Listening on port ${PORT}`);
});

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Closer server and exit process
  server.close(() => process.exit(1));
});
