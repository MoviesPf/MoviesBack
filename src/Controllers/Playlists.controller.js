const Playlists = require('../Models/Playlists.model');
const Users = require('../Models/Users.model');
const Programs = require('../Models/Programs.model');

const findAllPlaylist = async () => {
  const allPlaylists = await Playlists.findAll();
  const finalPlaylists = [];

    for (i = 0; i < allPlaylists.length; i++) {
    const onePlay = allPlaylists[i];
    const onePlayIds = onePlay.programsIds.length ? onePlay.programsIds.split("-") : [];
    const onePlayPrograms = [];
    
    for (j = 0; j < onePlayIds.length; j ++) {{
      const program = await Programs.findByPk(Number(onePlayIds[j]))
      const copy = {
        id: program.id,
        title: program.title,
        poster: program.poster
      }
      onePlayPrograms.push(copy);
    }}

    finalPlaylists.push({
      id: onePlay.id,
      name: onePlay.name,
      UserId: onePlay.UserId,
      programs: onePlayPrograms
    })
  }
  return {
    finalPlaylists
  }
}

const findPlaylist = async (Id) => {
  const data = await Playlists.findByPk(Id);
  let programs = [];
  const programsIds = data.programsIds.length ? data.programsIds.split("-") : [];

  for (i = 0; i < programsIds.length; i ++) {{
    const program = await Programs.findByPk(Number(programsIds[i]))
    const copy = {
      id: program.id,
      title: program.title,
      poster: program.poster
    }
    programs.push(copy);
  }}
  return {
    id: data.id,
    name: data.name,
    userId: data.UserId,
    programs: programs
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
  const allPlaylists = await Playlists.findAll({
    where: {
      UserId: UserId,
    }
  });

  const finalPlaylists = [];

  for (i = 0; i < allPlaylists.length; i++) {
    const onePlay = allPlaylists[i];
    const onePlayIds = onePlay.programsIds.length ? onePlay.programsIds.split("-") : [];
    const onePlayPrograms = [];
    
    for (j = 0; j < onePlayIds.length; j ++) {{
      const program = await Programs.findByPk(Number(onePlayIds[j]))
      const copy = {
        id: program.id,
        title: program.title,
        poster: program.poster
      }
      onePlayPrograms.push(copy);
    }}

    finalPlaylists.unshift({
      id: onePlay.id,
      name: onePlay.name,
      UserId: onePlay.UserId,
      programs: onePlayPrograms
    })
  }

  const totalPlaylist = allPlaylists.length
  return {
    totalPlaylist,
    finalPlaylists
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
  const program = await Programs.findByPk(Number(ProgramId))
  
  if (!program) throw Error("El program no existe")

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

}

module.exports = {
  findAllPlaylist,
  findPlaylist,
  editPlaylist,
  eliminatePlaylist,
  findUserPlaylist,
  createPlaylist,
  postOrEliminateProgram
};