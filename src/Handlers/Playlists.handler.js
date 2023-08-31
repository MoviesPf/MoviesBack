const {
  getPlaylistsController,
  getIdPlaylistsController,
  createPlaylistsController,
  addPlaylistsController,
  removePlaylistsController
} = require('../Controllers/Playlists.controller');

const getPlaylistsHandler = async (req, res, next) => {
  try {
    const data = await getPlaylistsController();

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getIdPlaylistsHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await getIdPlaylistsController(id);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const createPlaylistsHandler = async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);

    const data = await createPlaylistsController(body);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const addPlaylistsHandler = async (req, res, next) => {
  try {
    const body = req.body;

    const data = await addPlaylistsController(body);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const removePlaylistsHandler = async (req, res, next) => {
  try {
    const body = req.body;

    const data = await removePlaylistsController(body);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPlaylistsHandler,
  getIdPlaylistsHandler,
  createPlaylistsHandler,
  addPlaylistsHandler,
  removePlaylistsHandler
};
