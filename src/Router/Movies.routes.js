const { Router } = require("express");
const {
  getAllMovieHandler,
  getActiveMovieHandler,
  getIdMovieHandler,
  getNameMovieHandler,
} = require("../Handlers/Movies.handler");

const router = Router();

// GET DE TODAS LAS PELICULAS
router.get("/all", getAllMovieHandler);

// GET DE PELICULAS ACTIVAS
router.get("/", getActiveMovieHandler);

// GET DE LAS PELICULAS POR ID
router.get("/:movieId", getIdMovieHandler);

module.exports = router;
