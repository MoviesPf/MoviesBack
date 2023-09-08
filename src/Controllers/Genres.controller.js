const { default: axios } = require("axios");
const Genres = require("../Models/Genres.model");

const getAllGenres = async () => {
  const genres = await Genres.findAll();
  return genres;
};

const getMoviesGenres = async () => {
  const { data } = await axios("https://eecsj67ln9.execute-api.us-east-2.amazonaws.com/moviespf");

  const moviesGenres = data.genres.map((genre) => {
    return {
      id: genre.id,
      name: genre.name,
    };
  });

  return moviesGenres;
};

const getSeriesGenres = async () => {
  const { data } = await axios("https://api.themoviedb.org/3/genre/tv/list?api_key=95e749339979dd55fd29df3fa91c46c3");

  const seriesGenres = data.genres.map((genre) => {
    return {
      id: genre.id,
      name: genre.name,
    };
  });

  return seriesGenres;
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
  getMoviesGenres,
  getSeriesGenres,
  createGenre,
  deleteGenre,
};