const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Playlists = sequelize.define(
  'Playlists',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    programsIds: {
      type: DataTypes.TEXT
    }
  },
  { timestamps: false }
);

module.exports = Playlists;
