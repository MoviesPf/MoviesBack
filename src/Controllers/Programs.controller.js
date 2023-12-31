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
  const data = await Programs.findAndCountAll({
    limit: 25,
    offset: (Number(page) - 1) * 25,
    include: [
      { model: Genres, through: { attributes: [] } },
      { model: Platforms, through: { attributes: [] } }
    ]
  });
  const total = await Programs.count();

  const totalMovies = await Programs.count({
    where: {
      type: 'movie'
    }
  });

  const totalSeries = await Programs.count({
    where: {
      type: 'serie'
    }
  });

  const bannedPrograms = await Programs.count({
    where: {
      banned: true
    }
  });

  return {
    total: Math.floor(total / 25),
    totalPrograms: total,
    totalMovies,
    totalSeries,
    bannedPrograms,
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
    where: {
      banned: false
    },
    include: [
      { model: Genres, through: { attributes: [] } },
      { model: Platforms, through: { attributes: [] } }
    ]
  });

  const total = await Programs.count({
    where: {
      banned: false
    }
  });

  return {
    total: Math.floor(total / 25),
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

  const total = await Programs.count({
    where: {
      type: 'movie',
      banned: false
    }
  });

  return {
    total: Math.floor(total / 25),
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

  const total = await Programs.count({
    where: {
      type: 'serie',
      banned: false
    }
  });

  return {
    total: Math.floor(total / 25),
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

  return {data,  message: 'data was updated correctly' };
};

const deleteProgramsController = async (id) => {
  const { data } = await getIdProgramsController(id);

  data.banned = !data.banned;

  await data.save();

  return { message: 'data was updated correctly' };
};

const programsFilters = async (datos, page) => {
  const whereGenres = {};
  const wherePlatforms = {};
  const options = {
    banned: false
  };

  if (datos?.programType === "main");
  else if (datos?.programType === "movies") {
    options.type = "movie";
  }
  else if (datos.programType === "series") {
    options.type = "serie";
  }

  if (!datos?.filters.genres);
  else if (datos?.filters.genres && datos?.filters.genres.length > 0) {
    whereGenres.name = datos.filters.genres;
  }
  if (!datos?.filters.platforms);
  else if (datos?.filters.platforms && datos?.filters.platforms.length > 0) {
    wherePlatforms.name = datos?.filters.platforms;
  }

  const data = await Programs.findAndCountAll({
    limit: 25,
    offset: (Number(page) - 1) * 25,
    include: [
      {
        // Incluye en la busqueda
        model: Genres,
        through: { attributes: [] },
        where: whereGenres
      },
      {
        model: Platforms,
        through: { attributes: [] },
        where: wherePlatforms
      }
    ],
    where: options
  });

  let total = 0;

  if (
    (datos?.filters.genres.length === 0 && datos?.filters.platforms.length === 0) ||
    (!datos?.filters.genres && !datos?.filters.platforms)
  ) {
    total = await Programs.count({
      where: options
    });
  } else if (
    (!datos?.filters.genres || datos?.filters.genres.length === 0) &&
    datos?.filters.platforms
  ) {
    total = await Programs.count({
      where: options,
      include: [
        {
          model: Platforms,
          through: { attributes: [] },
          where: wherePlatforms
        }
      ]
    });
  } else if (
    datos?.filters.genres &&
    (!datos?.filters.platforms || datos?.filters.platforms.length === 0)
  ) {
    total = await Programs.count({
      where: options,
      include: [
        {
          // Incluye en la busqueda
          model: Genres,
          through: { attributes: [] },
          where: whereGenres
        }
      ]
    });
  } else if (datos?.filters.genres && datos?.filters.platforms) {
    total = await Programs.count({
      where: options,
      include: [
        {
          // Incluye en la busqueda
          model: Genres,
          through: { attributes: [] },
          where: whereGenres
        },
        {
          model: Platforms,
          through: { attributes: [] },
          where: wherePlatforms
        }
      ]
    });
  }

  return {
    total,
    totalPages: Math.floor(total / 25),
    data: data.rows
  };
};

const getSimilarPrograms = async (genreName, type) => {
  console.log(genreName, type)
  const data =
    type === 'main'
      ? await Programs.findAll({
          include: [
            {
              // Incluye en la busqueda
              model: Genres,
              as: 'Genres',
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


module.exports = {
  getAllProgramsController,
  getAllNameProgramsController,
  getActiveProgramsController,
  getNameProgramsController,
  getIdProgramsController,
  createProgramsController,
  updateProgramsController,
  deleteProgramsController,
  getAllMovies,
  getAllSeries,
  programsFilters,
  getSimilarPrograms
};
