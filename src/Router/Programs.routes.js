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
} = require("../Handlers/Programs.handler");
const { loadMoviesApi } = require("../utils/loadMovies");
const { loadSeriesApi } = require("../utils/loadSeries");

const router = Router();

router.get("/load/movies", loadMoviesApi);

router.get("/load/series", loadSeriesApi);

// GET DE TODAS LAS PROGRAMS
router.get("/all", getAllProgramsHandler);

// GET DE PROGRAMS ACTIVAS
router.get("/", getActiveProgramsHandler);

// GET DE LAS PROGRAMS POR ID
router.get("/:ProgramsId", getIdProgramsHandler);

// POST - CREAR PROGRAMS
router.post("/", createProgramsHandler);

// PATCH - EDITAR PROGRAMS
router.patch("/:ProgramsId", updateProgramsHandler);

// DELETE - BANEAR PROGRAMS
router.delete("/:ProgramsId", deleteProgramsHandler);

////////////// Filtros //////////////////

router.get("/filter/:genreName", getProgramsByGenre);

router.get("/filter/platform/:platformName", getProgramsByPlatform);

module.exports = router;
