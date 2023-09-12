const { Router } = require('express');
const {
  getAllPlaylists,
  getPlaylistById,
  patchPlaylist,
  deletePlaylist,
  getAllUserPlaylist,
  createPlaylistForUser,
  handlePostProgram
} = require('../Handlers/Playlists.handler');

const router = Router();

router.get("/", getAllPlaylists);

router.get("/:Id", getPlaylistById);

router.patch("/:Id", patchPlaylist);

router.delete("/:Id", deletePlaylist);

router.get("/user/:UserId", getAllUserPlaylist);

router.post("/user/:UserId", createPlaylistForUser);

router.patch("/user/:UserId/name/:PlaylistName/program/:ProgramId", handlePostProgram);

module.exports = router;