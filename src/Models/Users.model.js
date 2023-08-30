const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../db");

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    nickname: {
      type: DataTypes.STRING,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    banned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

module.exports = Users;
