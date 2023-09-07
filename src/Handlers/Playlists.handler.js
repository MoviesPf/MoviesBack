const {
  // getPlaylistsController,
  // getIdPlaylistsController,
  // createPlaylistsController,
  // addPlaylistsController,
  // removePlaylistsController
  findUserPlaylist,
  findPlaylist,
  createPlaylist,
  editPlaylist,
  eliminatePlaylist
} = require('../Controllers/Playlists.controller');

// const getPlaylistsHandler = async (req, res, next) => {
//   try {
//     const data = await getPlaylistsController();

//     return res.status(200).json(data);
//   } catch (error) {
//     next(error);
//   }
// };

// const getIdPlaylistsHandler = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const data = await getIdPlaylistsController(id);

//     return res.status(200).json(data);
//   } catch (error) {
//     next(error);
//   }
// };

// const createPlaylistsHandler = async (req, res, next) => {
//   try {
//     const body = req.body;
//     console.log(body);

//     const data = await createPlaylistsController(body);

//     return res.status(200).json(data);
//   } catch (error) {
//     next(error);
//   }
// };

// const addPlaylistsHandler = async (req, res, next) => {
//   try {
//     const body = req.body;

//     const data = await addPlaylistsController(body);

//     return res.status(200).json(data);
//   } catch (error) {
//     next(error);
//   }
// };

// const removePlaylistsHandler = async (req, res, next) => {
//   try {
//     const body = req.body;

//     const data = await removePlaylistsController(body);

//     return res.status(200).json(data);
//   } catch (error) {
//     next(error);
//   }
// };

const getAllUserPlaylist = async (req, res, next) => {
  const { UserId } = req.params;
  try {
    const allUserPlaylist = await findUserPlaylist(UserId);
    res.status(200).json(allUserPlaylist);
  } catch (error) {
    next(error);
  };
};

const getPlaylistById = async (req, res, next) => {
  const { playlistId } = req.params;
  try {
    const playlist = await findPlaylist(playlistId);
    res.status(200).json(playlist);
  } catch (error) {
    next(error)
  };
};

const createPlaylistForUser = async (req, res, next) => {
  const { userId } = req.params;
  const body = req.body;
  try {
    const data = await createPlaylist(body, userId )
    res.status(200).json(data)
  } catch (error) {
    next(error);
  };
};

const patchPlaylist = async (req, res, next) => {
  const { playlistId } = req.params;
  const body = req.body;
  try {
    const data = await editPlaylist(body, playlistId )
    res.status(200).json(data)
  } catch (error) {
    next(error);
  };
};

const deletePlaylist = async (req, res, next) => {
  const { playlistId } = req.params;
  try {
    const data = await eliminatePlaylist(playlistId)
    res.status(200).json(data)
  } catch (error) {
    next(error)
  };
};

module.exports = {
  // getPlaylistsHandler,
  // getIdPlaylistsHandler,
  // createPlaylistsHandler,
  // addPlaylistsHandler,
  // removePlaylistsHandler
  getAllUserPlaylist,
  getPlaylistById,
  createPlaylistForUser,
  patchPlaylist,
  deletePlaylist
};
