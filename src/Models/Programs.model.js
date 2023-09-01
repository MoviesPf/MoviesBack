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
    },
    overview: {
      type: DataTypes.TEXT,
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
    episodes: {
      type: DataTypes.INTEGER,
    },
    seasons: {
      type: DataTypes.INTEGER,
    },
    companies: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    trailer: {
      type: DataTypes.STRING,
    },
    adult: {
      type: DataTypes.BOOLEAN,
    },
    revenue: {
      type: DataTypes.REAL,
    },
    budget: {
      type: DataTypes.INTEGER,
    },
    cast: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    popularity: {
      type: DataTypes.INTEGER,
    },
    banned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    type: {
      type: DataTypes.ENUM("movie","serie")
    }
  },
  { timestamps: false }
);

module.exports = Programs;
