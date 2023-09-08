const {
  getAllPlatforms,
  createPlatform,
  deletePlatform,
} = require("../Controllers/Platforms.controller");

const getPlatformsHandler = async (req, res, next) => {
  try {
    const platforms = await getAllPlatforms();
    return res.status(200).json(platforms);
  } catch (error) {
    next(error);
  }
};

const createPlatformHandler = async (req, res, next) => {
  try {
    const { name, banned } = req.body;
    const data = await createPlatform(name, banned);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const deletePlatformHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deletePlatform(id);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPlatformsHandler,
  createPlatformHandler,
  deletePlatformHandler,
};