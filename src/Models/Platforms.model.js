import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Platforms = sequelize.define(
  "Platforms",
  {
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    banned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

module.exports = Platforms;