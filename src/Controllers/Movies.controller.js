const { Op } = require("sequelize");
const Movies = require("../Models/Movies.model");

const getAllMovieController = async () => {
  const data = await Movies.findAll();

  const totalMovies = data.length;
  let adultMovies = 0;
  let activeMovies = 0;
  let bannedMovies = 0;

  for (const value of data) {
    if (value.adult) adultMovies++;
    if (value.banned) activeMovies++;
    else bannedMovies++;
  }

  return {
    totalMovies,
    adultMovies,
    activeMovies,
    bannedMovies,
    data,
  };
};

const getAllNameMovieController = async (title) => {
  const data = await Movies.findAll({
    where: {
      title: {
        [Op.iLike]: `%${title}%`,
      },
    },
  });

  return {
    data,
  };
};

const getActiveMovieController = async () => {
  const data = await Movies.findAll({
    where: {
      banned: false,
    },
  });

  const totalMovies = data.length;

  return {
    totalMovies,
    data,
  };
};

const getNameMovieController = async (title) => {
  const data = await Movies.findAll({
    where: {
      title: {
        [Op.iLike]: `%${title}%`,
      },
      banned: false,
    },
  });

  return {
    data,
  };
};

const getIdMovieController = async (id) => {
  const data = await Movies.findOne({
    where: {
      id,
    },
  });

  return {
    data,
  };
};

const createMovieController = async (body) => {
  await Movies.create(body);

  return { message: "the movie was created correctly" };
};

const updateMovieController = async (
  id,
  {
    title,
    overview,
    release_date,
    backdrop,
    poster,
    runtime,
    companies,
    trailer,
    adult,
    revenue,
    budget,
    cast,
    popularity,
  }
) => {
  const { data } = await getIdMovieController(id);

  data.title = title || data.title;
  data.overview = overview || data.overview;
  data.release_date = release_date || data.release_date;
  data.backdrop = backdrop || data.backdrop;
  data.poster = poster || data.poster;
  data.runtime = runtime || data.runtime;
  data.companies = companies || data.companies;
  data.trailer = trailer || data.trailer;
  data.adult = adult || data.adult;
  data.revenue = revenue || data.revenue;
  data.budget = budget || data.budget;
  data.cast = cast || data.cast;
  data.popularity = popularity || data.popularity;

  await data.save();

  return { message: "data was updated correctly" };
};

const deleteMovieController = async (id) => {
  const { data } = await getIdMovieController(id);

  data.banned = !data.banned;

  await data.save();

  return { message: "data was updated correctly" };
};

module.exports = {
  getAllMovieController,
  getAllNameMovieController,
  getActiveMovieController,
  getNameMovieController,
  getIdMovieController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
};
