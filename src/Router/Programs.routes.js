const { Router } = require("express");
const {
  getAllProgramsHandler,
  getActiveProgramsHandler,
  getIdProgramsHandler,
  createProgramsHandler,
  deleteProgramsHandler,
  updateProgramsHandler,
} = require("../Handlers/Programs.handler");
const { loadProgramsApi } = require("../utils/loadPrograms");

const router = Router();

router.get("/load", loadProgramsApi);

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

module.exports = router;
