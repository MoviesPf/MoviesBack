const {
  getAllProgramsController,
  getActiveProgramsController,
  getIdProgramsController,
  createProgramsController,
  updateProgramsController,
  deleteProgramsController,
  getAllNameProgramsController,
  getNameProgramsController,
  getProgramsByGenreController,
  getProgramsByPlatformController,
  getProgramsByGenreAndPlatformController,
  getAllMovies,
  getAllSeries
} = require('../Controllers/Programs.controller.js');
// const {
//   // validationBody,
//   // validationId,
// } = require('../Validations/Programs.validations');

const getAllProgramsHandler = async (req, res, next) => {
  try {
    const { title, page = 1 } = req.query;

    if (title) {
      const data = await getAllNameProgramsController(title, page);
      return res.status(200).json(data);
    }

    const data = await getAllProgramsController(page);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getActiveProgramsHandler = async (req, res, next) => {
  try {
    const { title, page = 1 } = req.query;

    if (title) {
      const data = await getNameProgramsController(title, page);
      return res.status(200).json(data);
    }

    const data = await getActiveProgramsController(page);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getActiveMovies = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const data = await getAllMovies(page);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getActiveSeries = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const data = await getAllSeries(page);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getIdProgramsHandler = async (req, res, next) => {
  try {
    const { ProgramsId } = req.params;
    // validationId(ProgramsId);

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
    const data = await deleteProgramsController(ProgramsId);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getProgramsByGenre = async (req, res, next) => {
  try {
    const programsFound = await getProgramsByGenreController(
      req.params.genreName,
      req.params.type,
      req.query.page = 1
    );
    if (programsFound.length <= 0) {
      return res.status(404).json({
        msg: 'Parameters are incorrect, insufficient, or no match found. try another name.'
      });
    }
    return res.status(200).json(programsFound);
  } catch (error) {
    next(error);
  }
};

const getProgramsByPlatform = async (req, res, next) => {
  try {
    const programsFound = await getProgramsByPlatformController(
      req.params.platformName,
      req.params.type,
      req.query.page = 1
    );
    console.log(programsFound);
    if (programsFound.length <= 0) {
      return res.status(404).json({
        msg: 'Parameters are incorrect, insufficient, or no match found. try another name.'
      });
    }
    return res.status(200).json(programsFound);
  } catch (error) {
    next(error);
  }
};

const getProgramsByGenreAndPlatform = async (req, res, next) => {
  try {
    const genreName = req.params.genreName;
    const platformName = req.params.platformName;
    const type = req.params.type;
    const page = req.query.page;
    const programsFound = await getProgramsByGenreAndPlatformController(
      genreName,
      platformName,
      type,
      page = 1
    );

    if (programsFound.length <= 0) {
      return res.status(404).json({
        msg: 'Parameters are incorrect, insufficient, or no match found. Try another name.'
      });
    }

    return res.status(200).json(programsFound);
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
  getProgramsByGenre,
  getProgramsByPlatform,
  getProgramsByGenreAndPlatform,
  getActiveMovies,
  getActiveSeries
};
