const Platforms = require("../Models/Platforms.model");

const getAllPlatforms = async () => {
  const platforms = await Platforms.findAll();
  return platforms;
};

const createPlatform = async (name, banned) => {
  const newPlatform = await Platforms.create({ name, banned });
  return newPlatform;
};

module.exports = {
  getAllPlatforms,
  createPlatform,
};
