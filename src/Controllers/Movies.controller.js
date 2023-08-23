const Movies = require("../Models/Movies.model");

const getAllMovieController = async () => {
  const data = await Movies.findAll();

  const totalMovies = data.length;

  return {
    totalMovies,
    data,
  };
};

const getActiveMovieController = async () => {
  const data = await Movies.findAll({
    where: {
      banned: false,
    },
  });

  return {
    data
  }
};

const getIdMovieController = async (id) => {
  const data = await Movies.findOne()

  return {
    data
  }
};


module.exports = {
  getAllMovieController,
  getActiveMovieController,
  getIdMovieController,
}
