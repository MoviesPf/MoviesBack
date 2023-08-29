const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Platforms = sequelize.define(
  'Platforms',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    banned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  { timestamps: false }
);

module.exports = Platforms;
