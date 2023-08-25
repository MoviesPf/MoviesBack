const Genres = require("../Models/Genres.model");

const getAllGenres = async () => {
  const genres = await Genres.findAll();

  return genres;
};

const createGenre = async (name, banned) => {

  if(!name) {
    return { message: "Genre's name not found"};
  }
  await Genres.create({ name, banned });

  return { message: "Genre has been created" };
};

const deleteGenre = async (id) => {
  const genre = await Genres.findByPk(id);

  if (!genre) {
    throw new Error("Genre not found");
  }

  genre.banned = !genre.banned;

  await genre.save();

  return { message: "Genre has been disabled" };
};

module.exports = {
  getAllGenres,
  createGenre,
  deleteGenre,
};