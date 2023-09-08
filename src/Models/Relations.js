const Users = require("./Users.model");
const Reviews = require("./Reviews.model");
const Programs = require("./Programs.model");
const Genres = require("./Genres.model");
const Platforms = require("./Platforms.model");
const Playlists = require("./Playlists.model");
const Donations = require("./Donations.model");

// Relaciones de Users
Users.hasMany(Reviews); // Uno a muchos
Reviews.belongsTo(Users); // FK

Users.hasMany(Playlists) // Uno a muchos
Playlists.belongsTo(Users) // FK

Users.hasMany(Donations); // Uno a muchos
Donations.belongsTo(Users); // FK

// Relaciones de Programs
Programs.hasMany(Reviews) // Uno a muchos
Reviews.belongsTo(Programs) // FK

// Relaciones de Genres -- Muchos a muchos
Programs.belongsToMany(Genres, { through: "ProgramsGenres" });
Genres.belongsToMany(Programs, { through: "ProgramsGenres" });

// Relaciones de Platforms -- Muchos a muchos
Programs.belongsToMany(Platforms, { through: "ProgramsPlatform" });
Platforms.belongsToMany(Programs, { through: "ProgramsPlatform" });

module.exports = {
  Users,
  Genres,
  Programs,
  Platforms,
  Reviews,
  Playlists,
  Donations
};