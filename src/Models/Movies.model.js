import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const Movies = sequelize.define(
  "Movies",
  {
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
    },
    overview: {
      type: DataTypes.STRING,
    },
    release_date: {
      type: DataTypes.DATEONLY,
    },
    backdrop: {
      type: DataTypes.STRING,
    },
    poster: {
      type: DataTypes.STRING,
    },
    runtime: {
      type: DataTypes.NUMBER,
    },
    companies: {
      type: DataTypes.STRING,
    },
    trailer: {
      type: DataTypes.STRING,
    },
    adult: {
      type: DataTypes.BOOLEAN,
    },
    revenue: {
      type: DataTypes.NUMBER,
    },
    budget: {
      type: DataTypes.NUMBER,
    },
    cast: {
      type: DataTypes.STRING,
    },
    popularity: {
      type: DataTypes.NUMBER,
    },
    banned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

module.exports = Movies;
