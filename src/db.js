const { DB, DB_USER, DB_PASWORD, DB_HOST } = require("dotenv").config().parsed;

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(DB, DB_USER, DB_PASWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
  native: false,
});

module.exports = sequelize;
