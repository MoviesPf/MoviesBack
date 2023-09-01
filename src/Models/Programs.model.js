const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Programs = sequelize.define(
  "Programs",
  {
    id: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.STRING,
    },
    backdrop: {
      type: DataTypes.STRING,
    },
    poster: {
      type: DataTypes.STRING,
    },
    runtime: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER,
    },
    budget: {
      type: DataTypes.INTEGER,
    },
    cast: {
      type: DataTypes.STRING,
    },
    popularity: {
      type: DataTypes.INTEGER,
    },
    banned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    type: {
      type: DataTypes.STRING
    }
  },
  { timestamps: false }
);

module.exports = Programs;
