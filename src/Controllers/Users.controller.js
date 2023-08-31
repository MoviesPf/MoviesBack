const sendEmail = require('../Config/mailer');
const Users = require('../Models/Users.model');
const { forgotPassword } = require('../Templates/ForgotPassword');

const createUser = async (name, nickname, avatar, email, password, status) => {
  const [userCreated, created] = await Users.findOrCreate({
    where: { email, nickname },
    defaults: {
      name,
      nickname,
      avatar,
      password,
      status
    }
  });

  if (created) {
    return userCreated;
  } else {
    throw Error('El mail o el nickname ya esta en uso');
  }
};

const getAllUsers = async () => {
  const allUsersActive = await Users.findAll({
    where: {
      banned: false
    }
  });

  const allUsersBanned = await Users.findAll({
    where: {
      banned: true
    }
  });

  return (allUsers = { active: allUsersActive, banned: allUsersBanned });
};

const findUserById = async (id) => {
  const userById = await Users.findByPk(id);
  return { userById };
};

const banUserById = async (id) => {
  const { userById } = await findUserById(id);

  userById.banned = !userById.banned;

  await userById.save();

  return userById;
};

const userEdit = async (id, body) => {
  const { name, nickname, avatar, password, status } = body;

  const { userById } = await findUserById(id);

  userById.name = name || userById.name;
  userById.nickname = nickname || userById.nickname;
  userById.avatar = avatar || userById.avatar;
  userById.password = password || userById.password;
  userById.status = status || userById.status;

  await userById.save();

  return 'se actualizaron los datos correctamente';
};

// CONFIGURACION DE NODEMAILER --------------------------------------------------------

const forgotPasswordController = async (email) => {
  const user = await Users.findOne({ where: { email } });

  const template = forgotPassword(user);

  const data = {
    from: 'GreenScreen',
    to: user.email,
    subject: `${user.nickname}, we tell you about the GreenScreen Support.`,
    html: template
  };

  sendEmail(data);

  return {
    data: 'Send email'
  };
};

module.exports = {
  createUser,
  getAllUsers,
  findUserById,
  banUserById,
  userEdit,
  forgotPasswordController
};
