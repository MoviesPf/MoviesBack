const { Router } = require("express");
const {
  getAllProgramsHandler,
  getActiveProgramsHandler,
  getIdProgramsHandler,
  createProgramsHandler,
  deleteProgramsHandler,
  updateProgramsHandler,
  getProgramsByGenre,
  getProgramsByPlatform,
  getProgramsByGenreAndPlatform,
  getActiveMovies,
  getActiveSeries
} = require("../Handlers/Programs.handler");
const { loadMoviesApi } = require("../utils/loadMovies");
const { loadSeriesApi } = require("../utils/loadSeries");
const { asociateProgramsAndGenres } = require("../utils/asociateProgramsAndGenres");

const router = Router();

router.get("/asociate", asociateProgramsAndGenres);

router.get("/load/movies", loadMoviesApi);

router.get("/load/series", loadSeriesApi);

// GET DE TODAS LAS PROGRAMS
router.get("/all", getAllProgramsHandler);

// GET DE PROGRAMS ACTIVAS
router.get("/", getActiveProgramsHandler);

router.get("/movies", getActiveMovies);

router.get("/series", getActiveSeries);

// GET DE LAS PROGRAMS POR ID
router.get("/:ProgramsId", getIdProgramsHandler);

// POST - CREAR PROGRAMS
router.post("/", createProgramsHandler);

// PATCH - EDITAR PROGRAMS
router.patch("/:ProgramsId", updateProgramsHandler);

// DELETE - BANEAR PROGRAMS
router.delete("/:ProgramsId", deleteProgramsHandler);

////////////// Filtros //////////////////

// GET DE PROGRAMS POR GÉNERO
router.get("/filter/genre/:genreName", getProgramsByGenre);

// GET DE PROGRAMS POR PLATAFORMA
router.get("/filter/platform/:platformName", getProgramsByPlatform);

// GET DE PROGRAMS POR GÉNERO Y PLATAFORMA COMBINADOS
router.get("/filter/genre/:genreName/platform/:platformName", getProgramsByGenreAndPlatform);

module.exports = router;
