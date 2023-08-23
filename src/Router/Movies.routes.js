const { Router } = require("express");
const {
  createMovieHandler,
  deleteMovieHandler,
  updateMovieHandler,
} = require("../Handlers/Movies.handler");

const router = Router();

// POST - CREAR PELICULAS
router.post("/", createMovieHandler);

// PATCH - EDITAR PELICULAS
router.patch("/", updateMovieHandler);

// DELETE - BANEAR PELICULAS
router.delete("/", deleteMovieHandler);

module.exports = router;
