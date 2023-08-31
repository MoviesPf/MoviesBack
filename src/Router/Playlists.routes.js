const { Router } = require('express');
const {
  getPlaylistHandler,
  getIdPlaylistHandler,
  createPlaylistHandler,
  addPlaylistHandler,
  removePlaylistHandler
} = require('../Handlers/Playlists.handler');

const router = Router()

router.get("/", getPlaylistHandler)

router.get("/:id", getIdPlaylistHandler)

router.post("/create", createPlaylistHandler)

router.patch("/add", addPlaylistHandler)

router.delete("/remove", removePlaylistHandler)

module.exports = router