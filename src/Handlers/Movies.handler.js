const {
  createMovieController,
  updateMovieController,
  deleteMovieController,
} = require("../Controllers/Movies.controller");

const getAllMovieHandler = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const getActiveMovieHandler = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const getIdMovieHandler = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const createMovieHandler = async (req, res, next) => {
  try {
    const body = req.body;
    // validacion (body)
    const data = await createMovieController(body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateMovieHandler = async (req, res, next) => {
  try {
    const body = req.body;
    // validacion (body)
    const data = await updateMovieController(body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteMovieHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    //validation()
    const data = await deleteMovieController(id);
    return res.status(200).json(data);
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
