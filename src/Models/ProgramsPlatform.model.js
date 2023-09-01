const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ProgramsPlatform = sequelize.define("ProgramsPlatform", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = ProgramsPlatform;
