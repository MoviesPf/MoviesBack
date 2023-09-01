const { Router } = require('express');
const {
  getPlaylistsHandler,
  getIdPlaylistsHandler,
  createPlaylistsHandler,
  addPlaylistsHandler,
  removePlaylistsHandler
} = require('../Handlers/Playlists.handler');

const router = Router();

router.get('/', getPlaylistsHandler);

router.get('/:id', getIdPlaylistsHandler);

router.post('/create', createPlaylistsHandler);

router.patch('/add', addPlaylistsHandler);

router.delete('/remove', removePlaylistsHandler);

module.exports = router;
