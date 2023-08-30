const Users = require('./Users.model');
const Reviews = require('./Reviews.model');
const Programs = require('./Programs.model');
const Genres = require('./Genres.model');
const Platforms = require('./Platforms.model');

// Relaciones de Users
Users.hasMany(Reviews); // Uno a muchos
Reviews.belongsTo(Users); // FK

// Relaciones de Programs
Programs.hasMany(Reviews); // Uno a muchos
Reviews.belongsTo(Programs); //FK

// Relaciones de Genres -- Muchos a muchos
Programs.belongsToMany(Genres, { through: 'mg'});
Genres.belongsToMany(Programs, { through: 'mg'});

// Relaciones de Platforms -- Muchos a muchos
Programs.belongsToMany(Platforms, { through: 'mp'});
Platforms.belongsToMany(Programs, { through: 'mp'});

module.exports = {
  Users,
  Genres,
  Programs,
  Platforms,
  Reviews
};
