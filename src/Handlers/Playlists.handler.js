const {
  findAllPlaylist,
  findPlaylist,
  editPlaylist,
  eliminatePlaylist,
  findUserPlaylist,
  createPlaylist,
  postOrEliminateProgram
} = require('../Controllers/Playlists.controller');

const getAllPlaylists = async (req, res, next) => {
  try {
    const allPlaylist = await findAllPlaylist();
    res.status(200).json(allPlaylist);
  } catch (error) {
    next(error);
  };
};

const getPlaylistById = async (req, res, next) => {
  const { Id } = req.params;
  try {
    const playlist = await findPlaylist(Id);
    res.status(200).json(playlist);
  } catch (error) {
    next(error)
  };
};

const patchPlaylist = async (req, res, next) => {
  const { Id } = req.params;
  const body = req.body;
  try {
    const data = await editPlaylist(body, Id )
    res.status(200).json(data)
  } catch (error) {
    next(error);
  };
};

const deletePlaylist = async (req, res, next) => {
  const { Id } = req.params;
  try {
    const data = await eliminatePlaylist(Id)
    res.status(200).json(data)
  } catch (error) {
    next(error)
  };
};

const getAllUserPlaylist = async (req, res, next) => {
  const { UserId } = req.params;
  try {
    const allUserPlaylist = await findUserPlaylist(UserId);
    res.status(200).json(allUserPlaylist);
  } catch (error) {
    next(error);
  };
};


const createPlaylistForUser = async (req, res, next) => {
  const { UserId } = req.params;
  const body = req.body;
  try {
    const data = await createPlaylist(body, UserId )
    res.status(200).json(data)
  } catch (error) {
    next(error);
  };
};

const handlePostProgram = async (req, res, next) => {
  const { UserId, PlaylistName, ProgramId } = req.params;
  try {
    const data = await postOrEliminateProgram(UserId, PlaylistName, ProgramId)
    res.status(200).json(data)
  } catch (error) {
    next(error)
  };
};

module.exports = {
  getAllPlaylists,
  getPlaylistById,
  patchPlaylist,
  deletePlaylist,
  getAllUserPlaylist,
  createPlaylistForUser,
  handlePostProgram
};