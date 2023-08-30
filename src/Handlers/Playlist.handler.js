const {
  getPlaylistController,
  getIdPlaylistController,
  createPlaylistController,
  addPlaylistController,
  removePlaylistController
} = require('../Controllers/Playlist.controller');

const getPlaylistHandler = async (req, res, next) => {
  try {
    const data = await getPlaylistController();

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getIdPlaylistHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await getIdPlaylistController(id);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const createPlaylistHandler = async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);

    const data = await createPlaylistController(body);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const addPlaylistHandler = async (req, res, next) => {
  try {
    const body = req.body;

    const data = await addPlaylistController(body);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const removePlaylistHandler = async (req, res, next) => {
  try {
    const body = req.body;

    const data = await removePlaylistController(body);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPlaylistHandler,
  getIdPlaylistHandler,
  createPlaylistHandler,
  addPlaylistHandler,
  removePlaylistHandler
};
