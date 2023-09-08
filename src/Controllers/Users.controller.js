const sendEmail = require('../Config/mailer');
const Users = require('../Models/Users.model');
const { forgotPassword } = require('../Templates/ForgotPassword');
const banned = require('../Templates/banned');
const unbanning = require('../Templates/unbanning');
const welcome = require('../Templates/welcome');

const createUser = async (name, nickname, avatar, email, password, source) => {
  console.log(source);
  const userFound = await Users.findOne({ where: { email } });

  if (source === 'gmail' || userFound) {
    const data = await loginUserController(email, password, source);
    return data;
  }

  const user = await Users.create({
    name,
    nickname,
    avatar,
    password
  });

  if (!user) throw Error('error');

  const template = welcome(user);

  const data = {
    from: 'GreenScreen',
    to: user.email,
    subject: `${user.nickname}, we communicate from GreenScreen.`,
    html: template
  };

  sendEmail(data);

  return user;
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

const banUserById = async (id, reason) => {
  const { userById } = await findUserById(id);

  userById.banned = !userById.banned;

  await userById.save();

  if (userById.banned) {
    const template = banned(userById.nickname, reason);

    const data = {
      from: 'GreenScreen',
      to: userById.email,
      subject: `${userById.nickname}, we communicate from GreenScreen.`,
      html: template
    };

    sendEmail(data);
  } else {
    const template = unbanning(userById.nickname);

    const data = {
      from: 'GreenScreen',
      to: userById.email,
      subject: `${userById.nickname}, we communicate from GreenScreen.`,
      html: template
    };

    sendEmail(data);
  }

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

  if (!user) throw Error('User not found');

  const template = forgotPassword(user);

  const data = {
    from: 'GreenScreen',
    to: user.email,
    subject: `${user.nickname}, we tell you about the GreenScreen Support.`,
    html: template
  };

  sendEmail(data);

  return {
    message: 'password has been changed successfully'
  };
};

const changePasswordController = async (email, password) => {
  const user = await Users.findOne({ where: { email } });

  if (!user) throw Error('User not found');

  user.password = password;

  await user.save();

  return { message: 'Change password successfully' };
};

const loginUserController = async (email, password, source) => {
  const user = await Users.findOne({ where: { email } });

  console.log(source);

  if (!user) throw Error('incorrect email or password');

  if (source === 'gmail') {
    return {
      message: 'successful login',
      data: user
    };
  }

  if (user.password === password) {
    console.log('ok');
    return {
      message: 'successful login',
      data: user
    };
  } else throw Error('incorrect password');
};

module.exports = {
  createUser,
  getAllUsers,
  findUserById,
  banUserById,
  userEdit,
  forgotPasswordController,
  changePasswordController,
  loginUserController
};
