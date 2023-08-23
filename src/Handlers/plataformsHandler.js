const platformsController = require("../Controllers/plataformsController");

const getPlatformsHandler = async (req, res) => {
  try {
    const platforms = await platformsController.getAllPlatforms();
    res.status(200).json(platforms);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las plataformas." });
  }
};

const createPlatformHandler = async (req, res) => {
  try {
    const { name, banned } = req.body;
    const newPlatform = await platformsController.createPlatform(name, banned);
    res.status(201).json(newPlatform);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la plataforma." });
  }
};

module.exports = {
  getPlatformsHandler,
  createPlatformHandler,
};
