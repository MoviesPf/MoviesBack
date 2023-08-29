const Playlist = require('../Models/Playlist.model');

const getAllPlaylistController = async () => {
  const data = await Playlist.findAll();

  return {
    data
  };
};

const getAllIdPlaylistController = async (title) => {
  const data = await Playlist.findOne({
    Where: {
      id
    }
  });

  return {
    data
  };
};

const createPlaylistController = async (body) => {
  await Playlist.create(body);

  return {
    message: 'the playlist was created correctly'
  };
};

const updatePlaylistController = async ( id, programs ) => {

}

module.exports = {
  getAllPlaylistController,
  getAllIdPlaylistController,
  createPlaylistController,
};
