const { Op } = require("sequelize");
const Programs = require("../Models/Programs.model");

const getAllProgramsController = async () => {
  const data = await Programs.findAll();

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
    data,
  };
};

const getAllNameProgramsController = async (title) => {
  const data = await Programs.findAll({
    where: {
      title: {
        [Op.iLike]: `%${title}%`,
      },
    },
  });

  return {
    data,
  };
};

const getActiveProgramsController = async () => {
  const data = await Programs.findAll({
    where: {
      banned: false,
    },
  });

  const totalPrograms = data.length;

  return {
    totalPrograms,
    data,
  };
};

const getNameProgramsController = async (title) => {
  const data = await Programs.findAll({
    where: {
      title: {
        [Op.iLike]: `%${title}%`,
      },
      banned: false,
    },
  });

  return {
    data,
  };
};

const getIdProgramsController = async (id) => {
  const data = await Programs.findOne({
    where: {
      id,
    },
  });

  return {
    data,
  };
};

const createProgramsController = async (body) => {
  await Programs.create(body);

  return { message: "se creo la pelicula correctamente" };
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

  return { message: "se actualizaron los datos correctamente" };
};

const deleteProgramsController = async (id) => {
  const { data } = await getIdProgramsController(id);

  data.banned = !data.banned;

  await data.save();

  return { message: "se actualizaron los datos correctamente" };
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
};
