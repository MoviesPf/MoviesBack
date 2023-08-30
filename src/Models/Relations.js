
const Users = require("./Users.model");
const Reviews = require("./Reviews.model");
const Programs = require("./Programs.model");
const Genres = require("./Genres.model");
const Platforms = require("./Platforms.model");
const Playlist = require("./Playlist.model");

// Relaciones de Users
Users.hasMany(Reviews); // Uno a muchos
Reviews.belongsTo(Users); // FK

// Relaciones de Programs

Programs.hasMany(Reviews) // Uno a muchos
Reviews.belongsTo(Programs) // FK

// Relaciones de Genres -- Muchos a muchos

Programs.belongsToMany(Genres, { through: "mg" });
Genres.belongsToMany(Programs, { through: "mg" });

// Relaciones de Platforms -- Muchos a muchos
Programs.belongsToMany(Platforms, { through: "ProgramsPlatform" });
Platforms.belongsToMany(Programs, { through: "ProgramsPlatform" });

// Relaciones de Playlist 
Playlist.belongsToMany(Programs, { through: 'pp'}) // muchos a muchos
Programs.belongsToMany(Playlist, { through: 'pp'}) // muchos a muchos

Users.hasMany(Playlist) // Uno a muchos
Playlist.hasMany(Users) // FK




module.exports = {
  Users,
  Genres,
  Programs,
  Platforms,
  Reviews,
  Playlist
};
