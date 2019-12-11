const sequelize = require("sequelize");
const db = require("../Config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = db.define(
  "users",
  {
    userid: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: sequelize.STRING
    },
    password: {
      type: sequelize.STRING
    },
    create_time: {
      type: sequelize.STRING
    },
    roleid: {
      type: sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
);

//hashPassword
User.encryptPass = function(pass) {
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(10), null);
};

//FindById
User.findById = function(id) {
  const user = User.findOne({
    where: {
      userid: id
    }
  });
  return user;
};

User.prototype.getSignedJwtToken = function() {
  return jwt.sign({ id: this.userid }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

//comparePassword
User.prototype.matchPassword = function(enteredPassword) {
  return bcrypt.compareSync(enteredPassword, this.password);
};

module.exports = User;
