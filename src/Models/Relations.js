
const Users = require("./Users.model");
const Reviews = require("./Reviews.model");
const Programs = require("./Programs.model");
const Genres = require("./Genres.model");
const Platforms = require("./Platforms.model");
const Playlists = require("./Playlists.model");

// Relaciones de Users
Users.hasMany(Reviews); // Uno a muchos
Reviews.belongsTo(Users); // FK

// Relaciones de Programs

Programs.hasMany(Reviews) // Uno a muchos
Reviews.belongsTo(Programs) // FK

// Relaciones de Genres -- Muchos a muchos

Programs.belongsToMany(Genres, { through: "ProgramGenres" });
Genres.belongsToMany(Programs, { through: "ProgramGenres" });

// Relaciones de Platforms -- Muchos a muchos
Programs.belongsToMany(Platforms, { through: "ProgramsPlatform" });
Platforms.belongsToMany(Programs, { through: "ProgramsPlatform" });

// Relaciones de Playlist 
Playlists.belongsToMany(Programs, { through: 'ProgramLists'}) // muchos a muchos
Programs.belongsToMany(Playlists, { through: 'ProgramLists'}) // muchos a muchos

Users.hasMany(Playlists) // Uno a muchos
Playlists.hasMany(Users) // FK




module.exports = {
  Users,
  Genres,
  Programs,
  Platforms,
  Reviews,
  Playlists
};
