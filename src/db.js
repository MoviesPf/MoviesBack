require("dotenv").config();

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
    {
    dialect: 'postgres',
    logging: false,
    native: false,
  })
  
  module.exports = sequelize;

  