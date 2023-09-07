const Platforms = require("../Models/Platforms.model");

const getAllPlatforms = async () => {
  const platforms = await Platforms.findAll();

  return platforms;
};

const createPlatform = async (name, banned) => {
  await Platforms.create({ name, banned });

  return { message: "Plataforma creada correctamente." };
};

const deletePlatform = async (id) => {
  const platform = await Platforms.findByPk(id);

  if (!platform) {
    throw new Error("Plataforma no encontrada");
  }

  platform.banned = !platform.banned;

  await platform.save(); // Guardar los cambios en la base de datos

  return { message: "Plataforma deshabilitada correctamente." };
};

module.exports = {
  getAllPlatforms,
  createPlatform,
  deletePlatform,
};
