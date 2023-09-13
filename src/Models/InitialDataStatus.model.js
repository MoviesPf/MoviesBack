const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const InitialDataStatus = sequelize.define(
  "InitialDataStatus",
  {
    loaded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

module.exports = InitialDataStatus;