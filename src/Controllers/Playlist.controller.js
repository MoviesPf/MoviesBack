const Playlist = require('../Models/Playlist.model');
const Programs = require('../Models/Programs.model');

const getPlaylistController = async () => {
  const data = await Playlist.findAll({
    include: {
      model: Programs, through: { attributes: [] }
    }
  });

  return {
    data
  };
};

const getIdPlaylistController = async (id) => {
  const data = await Playlist.findOne({
    Where: {
      id
    }
  });

  return {
    data
  };
};

const createPlaylistController = async ({ name }) => {
  await Playlist.create({ name });

  return {
    message: 'The playlist was created correctly'
  };
};

const addPlaylistController = async ({ id, programId }) => {
  const program = await Programs.findOne({
    where: { id: programId }
  });

  const playlist = await Playlist.findOne({
    where: {
      id
    }
  });

  await playlist.addProgram(program);

  return {
    message: 'Content has been successfully added'
  };
};

const removePlaylistController = async ({ id, programId }) => {
  const program = await Programs.findOne({
    where: { id: programId }
  });

  const playlist = await Playlist.findOne({
    where: {
      id
    }
  });

  await playlist.removeProgram(program);

  return {
    message: 'Content has been successfully deleted'
  };
};

module.exports = {
  getPlaylistController,
  getIdPlaylistController,
  createPlaylistController,
  addPlaylistController,
  removePlaylistController
};
