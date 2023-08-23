import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Genres = sequelize.define(
  "Genres",
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

module.exports = Genres;
