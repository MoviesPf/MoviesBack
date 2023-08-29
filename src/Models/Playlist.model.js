const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Playlist = sequelize.define(
  'Playlist',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING
    }
  },
  { timestamps: false }
);

module.exports = Playlist;