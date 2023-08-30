const Platforms = require("../Models/Platforms.model");

const getAllPlatforms = async () => {
  const platforms = await Platforms.findAll();

  return platforms;
};

const createPlatform = async (name, banned) => {
  await Platforms.create({ name, banned });

  return { message: "Platform created successfully." };
};

const deletePlatform = async (id) => {
  const platform = await Platforms.findByPk(id);

  if (!platform) {
    throw new Error("Platform not found.");
  }

  platform.banned = !platform.banned;

  await platform.save();

  return { message: "Platform disabled successfully." };
};

module.exports = {
  getAllPlatforms,
  createPlatform,
  deletePlatform,
};
