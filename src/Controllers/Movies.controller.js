const Movies = require("../Models/Movies.model");

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
  createMovieController,
  updateMovieController,
  deleteMovieController
};
