const {
  getAllMovieController,
  getActiveMovieController,
  getIdMovieController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
  getAllNameMovieController,
  getNameMovieController,
} = require("../Controllers/Movies.controller");
const {
  validationBody,
  validationId,
} = require("../Validations/Movie.validations");

const getAllMovieHandler = async (req, res, next) => {
  try {
    const { title } = req.query;

    if (title) {
      const data = await getAllNameMovieController(title);
      return res.status(200).json(data);
    }

    const data = await getAllMovieController();

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getActiveMovieHandler = async (req, res, next) => {
  try {
    const { title } = req.query;

    if (title) {
      const data = await getNameMovieController(title);
      return res.status(200).json(data);
    }

    const data = await getActiveMovieController();

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getIdMovieHandler = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    validationId(movieId);

    const data = await getIdMovieController(movieId);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const createMovieHandler = async (req, res, next) => {
  try {
    const body = req.body;
    // validationBody(body)
    const data = await createMovieController(body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateMovieHandler = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const body = req.body;
    const data = await updateMovieController(movieId, body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteMovieHandler = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    validationId(movieId);
    const data = await deleteMovieController(movieId);
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
