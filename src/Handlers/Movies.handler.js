const {
  getAllMovieController,
  getActiveMovieController,
  getIdMovieController,
} = require("../Controllers/Movies.controller");

const getAllMovieHandler = async (req, res, next) => {
  try {
    const data = await getAllMovieController();

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getActiveMovieHandler = async (req, res, next) => {
  try {
    const data = await getActiveMovieController();

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getIdMovieHandler = async (req, res, next) => {
  try {
    const { id } = req.params

    console.log(id)
    const data = await getIdMovieController(id);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const createMovieHandler = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const updateMovieHandler = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const deleteMovieHandler = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMovieHandler,
  getActiveMovieHandler,
  getIdMovieHandler,
  createMovieHandler,
  updateMovieHandler,
  deleteMovieHandler,
};
