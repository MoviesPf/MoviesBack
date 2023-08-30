const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Donations = sequelize.define(
  'Donations',
  { 
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATEONLY
    },
    amount: {
      type: DataTypes.INTEGER
    }
  },
  { timestamps: false }
);

module.exports = Donations;
