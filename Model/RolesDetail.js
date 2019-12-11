const sequelize = require("sequelize");
const db = require("../Config/db");

const RolesDetail = db.define(
  "rolesdetails",
  {
    roledetailid: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    roleid: {
      type: sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: sequelize.STRING
    },
    grant: {
      type: sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);

RolesDetail.findRoleDetailById = function(id) {
  const roleDetail = RolesDetail.findOne({
    where: {
      roleid: id
    }
  });
  return roleDetail;
};

module.exports = RolesDetail;
