const { Router } = require("express");
const {
  getAllProgramsHandler,
  getActiveProgramsHandler,
  getIdProgramsHandler,
  createProgramsHandler,
  deleteProgramsHandler,
  updateProgramsHandler,
  getProgramsSimilares,
  getActiveMovies,
  getActiveSeries,
  programsFiltersHandler
} = require("../Handlers/Programs.handler");
const { loadMoviesApi } = require("../utils/loadMovies");
const { loadSeriesApi } = require("../utils/loadSeries");
const { asociateProgramsAndGenres } = require("../utils/asociateProgramsAndGenres");

const router = Router();

router.get("/asociate", asociateProgramsAndGenres);

router.get("/load/movies", loadMoviesApi);

router.get("/load/series", loadSeriesApi);

// GET DE TODOS LOS PROGRAMS
router.get("/all", getAllProgramsHandler);


// GET DE PROGRAMS ACTIVOS
router.get("/", getActiveProgramsHandler);

router.get("/movies", getActiveMovies);

router.get("/series", getActiveSeries);

// GET DE PROGRAM POR ID
router.get("/:ProgramsId", getIdProgramsHandler);

// POST - CREAR PROGRAMS
router.post("/", createProgramsHandler);

// PATCH - EDITAR PROGRAMS
router.patch("/:ProgramsId", updateProgramsHandler);

// DELETE - BANEAR PROGRAMS
router.delete("/:ProgramsId", deleteProgramsHandler);

////////////// Filtros //////////////////

router.get("/filter/genre/:genreName/:type", getProgramsSimilares);

router.post("/filters", programsFiltersHandler);

module.exports = router;