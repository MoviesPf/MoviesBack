const Users = require('./Users.model')
const Reviews = require('./Reviews.model')
const Movies = require('./Movies.model')
const Genres = require('./Genres.model')
const Platforms = require('./Platforms.model')

// Relaciones de Users
Users.hasMany(Reviews) // Uno a muchos
Reviews.belongsTo(Users) // FK

// Relaciones de Movies
Movies.hasMany(Reviews) // Uno a muchos
Reviews.belongsTo(Movies) //FK

// Relaciones de Genres -- Muchos a muchos
Movies.belongsToMany(Genres, { through: 'mg'}) 
Genres.belongsToMany(Movies, { through: 'mg'}) 

// Relaciones de Platforms -- Muchos a muchos
Movies.belongsToMany(Platforms, { through: 'mp'})
Platforms.belongsToMany(Movies, { through: 'mp'})

module.exports = {
  Users,
  Genres,
  Movies,
  Platforms,
  Reviews
}