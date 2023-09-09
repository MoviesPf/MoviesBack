const Playlists = require('../Models/Playlists.model');
const Users = require('../Models/Users.model');

const findAllPlaylist = async () => {
  const data = await Playlists.findAll()

  return {
    data
  }
}

const findPlaylist = async (Id) => {
  const data = await Playlists.findByPk(Id)
  return {
    data
  }
}

const editPlaylist = async (body, Id) => {
  const playlist = await Playlists.findByPk(Id);

  const ids = body.programsIds.join("-")
  
  playlist.name = body.name || playlist.name;
  playlist.programsIds = ids || playlist.programsIds;
  
  await playlist.save();
  
  return { message: 'datos actualizados'};
}

const eliminatePlaylist = async (Id) => {
  await Playlists.destroy({
    where: {id: Id},
  })

  return { message: 'playlist eliminada'};
};

const findUserPlaylist = async (UserId) => {
  const data = await Playlists.findAll({
    where: {
      UserId: UserId,
    }
  });

  const totalPlaylist = data.length
  return {
    totalPlaylist,
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
      programsIds: body.programsIds.join("-")
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

const postOrEliminateProgram = async (UserId, PlaylistName, ProgramId) => {
  const playlist = await Playlists.findOne({
    where: {
      name: PlaylistName,
      UserId: UserId,
    }
  })

  const ids = playlist.programsIds.length ? playlist.programsIds.split("-") : []

  if (!ids.includes(ProgramId)) {
    ids.push(ProgramId)
    playlist.programsIds = ids.join("-")
    playlist.save();
    return "Programa agregado correctamente";
  } else {
    const filtrado = ids.filter( id => id !== ProgramId);
    playlist.programsIds = filtrado.join("-");
    playlist.save();
    return "programa eliminado correctamente";
  };
};

module.exports = {
  findAllPlaylist,
  findPlaylist,
  editPlaylist,
  eliminatePlaylist,
  findUserPlaylist,
  createPlaylist,
  postOrEliminateProgram
};