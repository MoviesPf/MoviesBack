const { DB, DB_PASSWORD, DB_USER, DB_HOST } = require("dotenv").config().parsed;

console.log(DB);

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
  native: false,
});

module.exports = sequelize;
