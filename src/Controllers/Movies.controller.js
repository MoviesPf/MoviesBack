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

  return { message: "se creo la pelicula correctamente" };
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
  const movie = await getIdMovieController(id);

  movie.title = title || movie.title;
  movie.overview = overview || movie.overview;
  movie.release_date = release_date || movie.release_date;
  movie.backdrop = backdrop || movie.backdrop;
  movie.poster = poster || movie.poster;
  movie.runtime = runtime || movie.runtime;
  movie.companies = companies || movie.companies;
  movie.trailer = trailer || movie.trailer;
  movie.adult = adult || movie.adult;
  movie.revenue = revenue || movie.revenue;
  movie.budget = budget || movie.budget;
  movie.cast = cast || movies.cast;
  movie.popularity = popularity || movie.popularity;

  await movie.save();

  return { message: "se actualizaron los datos correctamente" };
};

const deleteMovieController = async (id) => {
  const movie = await getIdMovieController(id);

  movie.banned = !movie.banned;

  return { message: "se actualizaron los datos correctamente" };
};

module.exports = {
  getAllMovieController,
  getActiveMovieController,
  getIdMovieController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
};
