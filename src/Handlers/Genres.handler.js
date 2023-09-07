const {
    getAllGenres,
    getMoviesGenres,
    getSeriesGenres,
    createGenre,
    deleteGenre,
  } = require("../Controllers/Genres.controller.js");
  
  const getGenresHandler = async (req, res, next) => {
    try {
      const genres = await getAllGenres();
      return res.status(200).json(genres);
    } catch (error) {
      next(error);
    }
  };

  const getMoviesGenresHandler = async (req, res, next) => {
    try {
      const moviesGenres = await getMoviesGenres();
      return res.status(200).json(moviesGenres)
    } catch (error) {
      next(error);
    }
  }

  const getSeriesGenresHandler = async (req, res, next) => {
    try {
      const seriesGenres = await getSeriesGenres();
      return res.status(200).json(seriesGenres)
    } catch (error) {
      next(error);
    }
  }
  
  const createGenreHandler = async (req, res, next) => {
    try {
      const { name, banned } = req.body;
      const data = await createGenre(name, banned);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
  
  const deleteGenreHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await deleteGenre(id);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    getGenresHandler,
    getMoviesGenresHandler,
    getSeriesGenresHandler,
    createGenreHandler,
    deleteGenreHandler,
  };