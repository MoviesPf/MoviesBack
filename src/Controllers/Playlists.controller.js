const Playlists = require('../Models/Playlists.model');
const Programs = require('../Models/Programs.model');

const getPlaylistsController = async () => {
  const data = await Playlists.findAll({
    include: {
      model: Programs, through: { attributes: [] }
    }
  });

  return {
    data
  };
};

const getIdPlaylistsController = async (id) => {
  const data = await Playlists.findOne({
    Where: {
      id
    }
  });

  return {
    data
  };
};

const createPlaylistsController = async ({ name }) => {
  await Playlists.create({ name });

  return {
    message: 'The playlists was created correctly'
  };
};

const addPlaylistsController = async ({ id, programId }) => {
  const program = await Programs.findOne({
    where: { id: programId }
  });

  const playlists = await Playlists.findOne({
    where: {
      id
    }
  });

  await playlists.addProgram(program);

  return {
    message: 'Content has been successfully added'
  };
};

const removePlaylistsController = async ({ id, programId }) => {
  const program = await Programs.findOne({
    where: { id: programId }
  });

  const playlists = await Playlists.findOne({
    where: {
      id
    }
  });

  await playlists.removeProgram(program);

  return {
    message: 'Content has been successfully deleted'
  };
};

module.exports = {
  getPlaylistsController,
  getIdPlaylistsController,
  createPlaylistsController,
  addPlaylistsController,
  removePlaylistsController
};
