const Playlists = require('../Models/Playlists.model');
const Programs = require('../Models/Programs.model');

const getPlaylistController = async () => {
  const data = await Playlists.findAll({
    include: {
      model: Programs, through: { attributes: [] }
    }
  });

  return {
    data
  };
};

const getIdPlaylistController = async (id) => {
  const data = await Playlists.findOne({
    Where: {
      id
    }
  });

  return {
    data
  };
};

const createPlaylistController = async ({ name }) => {
  await Playlists.create({ name });

  return {
    message: 'The playlist was created correctly'
  };
};

const addPlaylistController = async ({ id, programId }) => {
  const program = await Programs.findOne({
    where: { id: programId }
  });

  const playlist = await Playlists.findOne({
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

  const playlist = await Playlists.findOne({
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
