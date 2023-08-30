const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Playlists = sequelize.define(
  'Playlist',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    }
  },
  { timestamps: false }
);

module.exports = Playlists;
