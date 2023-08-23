import { DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from "../db.js";

const Reviews = sequelize.define(
  "Reviews",
  {
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.NUMBER,
    },
    comments: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    reported: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    baned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

module.exports = Reviews;
