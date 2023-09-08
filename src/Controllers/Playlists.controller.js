const Playlists = require('../Models/Playlists.model');
const Users = require('../Models/Users.model');

// const getPlaylistsController = async () => {
//   const data = await Playlists.findAll({
//     include: {
//       model: Programs, through: { attributes: [] }
//     }
//   });

//   return {
//     data
//   };
// };

// const getIdPlaylistsController = async (id) => {
//   const data = await Playlists.findOne({
//     Where: {
//       id
//     }
//   });

//   return {
//     data
//   };
// };

// const createPlaylistsController = async ({ name }) => {
//   await Playlists.create({ name });

//   return {
//     message: 'The playlists was created correctly'
//   };
// };

// const addPlaylistsController = async ({ id, programId }) => {
//   const program = await Programs.findOne({
//     where: { id: programId }
//   });

//   const playlists = await Playlists.findOne({
//     where: {
//       id
//     }
//   });

//   await playlists.addProgram(program);

//   return {
//     message: 'Content has been successfully added'
//   };
// };

// const removePlaylistsController = async ({ id, programId }) => {
//   const program = await Programs.findOne({
//     where: { id: programId }
//   });

//   const playlists = await Playlists.findOne({
//     where: {
//       id
//     }
//   });

//   await playlists.removeProgram(program);

//   return {
//     message: 'Content has been successfully deleted'
//   };
// };

const findUserPlaylist = async (UserId) => {
  const data = await Playlists.findAll({
    where: {
      UserId: UserId,
    }
  });

  return {
    data
  }
}

const findPlaylist = async (playlistId) => {
  const data = await Playlists.findByPk(playlistId)
  return {
    data
  }
}

const createPlaylist = async (body, UserId) => {
  const [playlistCreated, created] = await Playlists.findOrCreate({
    where: {
      name: body.name, 
      UserId:UserId
    },
    defaults: {
      programsIds: body.programsIds
    }
  });

  const user = await Users.findByPk(UserId);

  if (created) {
    await user.addPlaylists(playlistCreated);
    return { message: 'Playlist creada correctamente'}
  } else {
    throw Error("Ya existe una Playlist con ese nombre")
  }
};

const editPlaylist = async (body, playlistId) => {
  const playlist = await Playlists.findByPk(playlistId);

  playlist.name = body.name || playlist.name;
  playlist.programsIds = body.programsIds || playlist.programsIds;

  await playlist.save();

  return { message: 'datos actualizados'};
}

const eliminatePlaylist = async (playlistId) => {
  await Playlists.destroy({
    where: {id: playlistId},
  })

  return { message: 'playlist eliminada'};
};

module.exports = {
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
};