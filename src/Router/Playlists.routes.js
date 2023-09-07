const { Router } = require('express');
const {
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
} = require('../Handlers/Playlists.handler');

const router = Router();

// router.get('/', getPlaylistsHandler);

// router.get('/:id', getIdPlaylistsHandler);

// router.post('/create', createPlaylistsHandler);

// router.patch('/add', addPlaylistsHandler);

// router.delete('/remove', removePlaylistsHandler);

router.get("/user/:id", getAllUserPlaylist);

router.post("/user/:id", createPlaylistForUser);

router.get("/:id", getPlaylistById);

router.patch("/:id", patchPlaylist);

router.delete("/:id", deletePlaylist);

module.exports = router;