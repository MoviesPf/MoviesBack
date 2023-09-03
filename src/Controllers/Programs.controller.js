const { Op, where } = require('sequelize');
const { Programs, Genres, Platforms } = require('../Models/Relations');
const sequelize = require("../db")

const getAllProgramsController = async () => {
  const data = await Programs.findAll({
    include: [
      { model: Genres, through: { attributes: [] } },
      { model: Platforms, through: { attributes: [] } }
    ]
  });

  const totalPrograms = data.length;
  let adultPrograms = 0;
  let activePrograms = 0;
  let bannedPrograms = 0;

  for (const value of data) {
    if (value.adult) adultPrograms++;
    if (value.banned) activePrograms++;
    else bannedPrograms++;
  }

  return {
    totalPrograms,
    adultPrograms,
    activePrograms,
    bannedPrograms,
    data
  };
};

const getAllNameProgramsController = async (title) => {
  const search = title
  const data = await Programs.findAll({
    where: {
      title: {
        [Op.iLike]: `%${title}%`
      }
    },
    include: [
      { model: Genres, through: { attributes: [] } },
      { model: Platforms, through: { attributes: [] } }
    ]
  });

  return {
    search,
    data
  };
};

const getActiveProgramsController = async () => {
  const data = await Programs.findAll({
    where: {
      banned: false
    },
    include: [
      { model: Genres, through: { attributes: [] } },
      { model: Platforms, through: { attributes: [] } }
    ]
  });

  const totalPrograms = data.length;

  return {
    totalPrograms,
    data
  };
};

const getNameProgramsController = async (title) => {
  const search = title
  const data = await Programs.findAll({
    where: {
      title: {
        [Op.iLike]: `%${title}%`
      },
      banned: false
    },
    include: [
      { model: Genres, through: { attributes: [] } },
      { model: Platforms, through: { attributes: [] } }
    ]
  });

  return {
    search,
    data
  };
};

const getIdProgramsController = async (id) => {
  const data = await Programs.findOne({
    where: {
      id
    },
    include: [
      { model: Genres, through: { attributes: [] } },
      { model: Platforms, through: { attributes: [] } }
    ]
  });

  return {
    data
  };
};

const createProgramsController = async (body) => {
  const platform = await Platforms.findAll({
    where: {
      name: body.platforms
    }
  });
  const genre = await Genres.findAll({
    where: {
      name: body.genres
    }
  });

  const program = await Programs.create(body);

  await program.setPlatforms(platform);
  await program.setGenres(genre);

  return { message: 'the movie was created correctly' };
};

const updateProgramsController = async (
  id,
  {
    title,
    overview,
    release_date,
    backdrop,
    poster,
    runtime,
    companies,
    trailer,
    adult,
    revenue,
    budget,
    cast,
    popularity,
    type
  }
) => {
  const { data } = await getIdProgramsController(id);

  data.title = title || data.title;
  data.overview = overview || data.overview;
  data.release_date = release_date || data.release_date;
  data.backdrop = backdrop || data.backdrop;
  data.poster = poster || data.poster;
  data.runtime = runtime || data.runtime;
  data.companies = companies || data.companies;
  data.trailer = trailer || data.trailer;
  data.adult = adult || data.adult;
  data.revenue = revenue || data.revenue;
  data.budget = budget || data.budget;
  data.cast = cast || data.cast;
  data.popularity = popularity || data.popularity;
  data.type = type || data.type;

  await data.save();

  return { message: 'data was updated correctly' };
};

const deleteProgramsController = async (id) => {
  const { data } = await getIdProgramsController(id);

  data.banned = !data.banned;

  await data.save();

  return { message: 'data was updated correctly' };
};


const getProgramsByGenreController = async (genreName) => {

  const programs = await Programs.findAll({
    include: [
      {                   // Incluye en la busqueda
        model: Genres,    // los programas que en su relacion con Genres
        where: {          // tengan el nombre pasado por parametro.
          name: genreName,
        },
        through: { attributes: [] },
      }
    ]
  });
  return programs;
};

const getProgramsByPlatformController = async (platformName) => {

  const programs = await Programs.findAll({
    include: [
      {                       // Incluye en la busqueda
        model: Platforms,     // los programas que en su relacion con Platforms
        where: {              // tengan el nombre pasado por parametro.
          name: platformName,
        },
        through: { attributes: [] },
      }
    ]
  });
  return programs;
};

const getProgramsByGenreAndPlatformController = async (genreName, platformName) => {
  const programs = await Programs.findAll({
    include: [
      {
        model: Genres,
        where: {
          name: genreName,
        },
        through: { attributes: [] },
      },
      {
        model: Platforms,
        where: {
          name: platformName,
        },
        through: { attributes: [] },
      },
    ],
  });
  return programs;
};


module.exports = {
  getAllProgramsController,
  getAllNameProgramsController,
  getActiveProgramsController,
  getNameProgramsController,
  getIdProgramsController,
  createProgramsController,
  updateProgramsController,
  deleteProgramsController,
  getProgramsByGenreController,
  getProgramsByPlatformController,
  getProgramsByGenreAndPlatformController
};
