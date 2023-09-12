const { Op, where } = require('sequelize');
const {
  Programs,
  Genres,
  Platforms,
  Reviews,
  Users
} = require('../Models/Relations');
const sequelize = require('../db');

const getAllProgramsController = async (page) => {
  console.log(page);
  const data = await Programs.findAndCountAll({
    limit: 25,
    offset: (Number(page) - 1) * 25,
    include: [
      { model: Genres, through: { attributes: [] } },
      { model: Platforms, through: { attributes: [] } }
    ]
  });

  return {
    data: data.rows
  };
};

const getAllNameProgramsController = async (title) => {
  const search = title;
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

const getActiveProgramsController = async (page) => {
  const data = await Programs.findAndCountAll({
    limit: 25,
    offset: (Number(page) - 1) * 25,
    include: [
      { model: Genres, through: { attributes: [] } },
      { model: Platforms, through: { attributes: [] } }
    ]
  }
  );

  return {
    total: data.count,
    data: data.rows
  };
};

const getAllMovies = async (page) => {
  const data = await Programs.findAndCountAll({
    limit: 25,
    offset: (Number(page) - 1) * 25,
    where: {
      type: 'movie',
      banned: false
    },
    include: [
      { model: Genres, through: { attributes: [] } },
      { model: Platforms, through: { attributes: [] } }
    ]
  });

  return {
    data: data.rows
  };
};

const getAllSeries = async (page) => {
  const data = await Programs.findAndCountAll({
    limit: 25,
    offset: (Number(page) - 1) * 25,
    where: {
      type: 'serie',
      banned: false
    },
    include: [
      { model: Genres, through: { attributes: [] } },
      { model: Platforms, through: { attributes: [] } }
    ]
  });

  return {
    data: data.rows
  };
};

const getNameProgramsController = async (title) => {
  const search = title;
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
      { model: Platforms, through: { attributes: [] } },
      {
        model: Reviews,
        include: [
          {
            model: Users
          }
        ]
      }
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

const getProgramsByGenreController = async (genreName, type) => {
  const data =
    type === 'main'
      ? await Programs.findAll({
          include: [
            {
              // Incluye en la busqueda
              model: Genres,
              as: 'Genres',
              through: { attributes: [] }
            },
            {
              model: Platforms,
              through: { attributes: [] }
            }
          ],
          where: {
            '$Genres.name$': genreName
          }
        })
      : await Programs.findAll({
          include: [
            {
              // Incluye en la busqueda
              model: Genres,
              as: 'Genres',
              through: { attributes: [] }
            },
            {
              model: Platforms,
              through: { attributes: [] }
            }
          ],
          where: {
            type: type,
            '$Genres.name$': genreName
          }
        });

  const totalFiltered = data.length;

  return {
    totalFiltered,
    data
  };
};

const getProgramsByPlatformController = async (platformName, type) => {
  const data =
    type === 'main'
      ? await Programs.findAll({
          include: [
            {
              // Incluye en la busqueda
              model: Platforms,
              as: 'platforms',
              through: { attributes: [] }
            },
            {
              model: Genres,
              through: { attributes: [] }
            }
          ],
          where: {
            '$platforms.name$': platformName
          }
        })
      : await Programs.findAll({
          include: [
            {
              // Incluye en la busqueda
              model: Platforms,
              as: 'Platforms',
              through: { attributes: [] }
            },
            {
              model: Genres,
              through: { attributes: [] }
            }
          ],
          where: {
            '$Platforms.name$': platformName,
            type: type
          }
        });
  const totalFiltered = data.length;

  return {
    totalFiltered,
    data
  };
};

const getProgramsByGenreAndPlatformController = async (
  genreName,
  platformName,
  type
) => {
  const data =
    type === 'main'
      ? await Programs.findAll({
          include: [
            {
              model: Genres,
              as: 'Genres',
              through: { attributes: [] }
            },
            {
              model: Platforms,
              as: 'Platforms',
              through: { attributes: [] }
            }
          ],
          where: {
            '$Platforms.name$': platformName,
            '$Genres.name$': genreName
          }
        })
      : await Programs.findAll({
          include: [
            {
              model: Genres,
              as: 'Genres',
              through: { attributes: [] }
            },
            {
              model: Platforms,
              as: 'Platforms',
              through: { attributes: [] }
            }
          ],
          where: {
            '$Platforms.name$': platformName,
            '$Genres.name$': genreName,
            type: type
          }
        });

  const totalFiltered = data.length;

  return {
    totalFiltered,
    data
  };
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
  getProgramsByGenreAndPlatformController,
  getAllMovies,
  getAllSeries
};
