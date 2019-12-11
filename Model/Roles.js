const sequelize = require("sequelize");
const db = require("../Config/db");

const Roles = db.define(
  "roles",
  {
    roleid: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rolename: {
      type: sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);

Roles.FindRoleById = function(id) {
  const role = Roles.findOne({
    where: {
      roleid: id
    }
  });
  return role;
};

module.exports = Roles;
