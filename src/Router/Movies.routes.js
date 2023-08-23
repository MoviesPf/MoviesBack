const { Router } = require("express");
const {
  getAllMovieHandler,
  getActiveMovieHandler,
  getIdMovieHandler,
  createMovieHandler,
  deleteMovieHandler,
  updateMovieHandler,
} = require("../Handlers/Movies.handler");

const router = Router();

// GET DE TODAS LAS PELICULAS
router.get("/all", getAllMovieHandler);

// GET DE PELICULAS ACTIVAS
router.get("/", getActiveMovieHandler);

// GET DE LAS PELICULAS POR ID
router.get("/:movieId", getIdMovieHandler);

// POST - CREAR PELICULAS
router.post("/", createMovieHandler);

// PATCH - EDITAR PELICULAS
router.patch("/", updateMovieHandler);

// DELETE - BANEAR PELICULAS
router.delete("/", deleteMovieHandler);

module.exports = router;
