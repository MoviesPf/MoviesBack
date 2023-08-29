const {
  getAllProgramsController,
  getActiveProgramsController,
  getIdProgramsController,
  createProgramsController,
  updateProgramsController,
  deleteProgramsController,
  getAllNameProgramsController,
  getNameProgramsController,
} = require("../Controllers/Programs.controller");
const {
  validationBody,
  validationId,
} = require("../Validations/Programs.validations");

const getAllProgramsHandler = async (req, res, next) => {
  try {
    const { title } = req.query;

    if (title) {
      const data = await getAllNameProgramsController(title);
      return res.status(200).json(data);
    }

    const data = await getAllProgramsController();

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getActiveProgramsHandler = async (req, res, next) => {
  try {
    const { title } = req.query;

    if (title) {
      const data = await getNameProgramsController(title);
      return res.status(200).json(data);
    }

    const data = await getActiveProgramsController();

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getIdProgramsHandler = async (req, res, next) => {
  try {
    const { ProgramsId } = req.params;
    validationId(ProgramsId);

    const data = await getIdProgramsController(ProgramsId);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const createProgramsHandler = async (req, res, next) => {
  try {
    const body = req.body;
    // validationBody(body)
    const data = await createProgramsController(body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateProgramsHandler = async (req, res, next) => {
  try {
    const { ProgramsId } = req.params;
    const body = req.body;
    const data = await updateProgramsController(ProgramsId, body);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deleteProgramsHandler = async (req, res, next) => {
  try {
    const { ProgramsId } = req.params;
    validationId(ProgramsId);
    const data = await deleteProgramsController(ProgramsId);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProgramsHandler,
  getActiveProgramsHandler,
  getIdProgramsHandler,
  createProgramsHandler,
  updateProgramsHandler,
  deleteProgramsHandler,
};
