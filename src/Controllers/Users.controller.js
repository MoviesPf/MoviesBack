const sendEmail = require('../Config/mailer');
const Users = require('../Models/Users.model');

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
  console.log(user);

  const text = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Forgot Password</title>
  </head>
  <style>
    *{
      margin: 0;
      padding: 0;
    }
  </style>
  <body 
  style=" 
  font-family: sans-serif; 
  background-color: #f1f2f4; 
  width: 80%;
  margin: auto; 
  padding: 0 3rem; 
  display: grid; 
  justify-items: center;">

    <h1 
    style="
    padding: 0 1.5rem;
    font-size: 2.5rem; 
    letter-spacing: 2.5px; 
    color: #0e5927;
    margin: 0.5rem auto 1rem; 
    text-align: center; 
    border-bottom: 3px solid #0e5927; 
    width: auto"> 
    Hello, ${user.nickname}</h1>

    <p 
    style="
    font-size: 1.5rem; 
    color: #555; 
    margin: 0.5rem 0;">
    We received a request to reset your password. If you didn't make this request, you can ignore this email.</p>

    <p 
    style="
    font-size: 1.5rem; 
    margin: 0 0 1rem 0; 
    color: #000" >
    If you did request a password reset, please click the following link to reset your password:</p>

    <a 
    style="
    padding: .5rem 1rem; 
    text-align: center; 
    background-color: #34ad30; 
    margin: .7rem auto .3rem; 
    color: #013212;
    font-size: 1.3rem; 
    font-weight: bold; 
    text-decoration: none; 
    outline: 2px solid #0e5927;
    width: 12rem" 
    href="https://yourwebsite.com/reset-password">
    Reset Password</a>

    <p 
    style="
    color: #34ad30; 
    text-align: center;
    font-weight: bold; ">
    *This link will expire in 1 hour*</p>

    <p 
    style="
    margin: 1rem 0 .5rem; 
    font-size: 1.3rem; color: #000">
    Thank you, ${user.name}.</p>

    <p 
    style="
    font-size: 1rem; 
    font-weight: bold; 
    color: #013212;">
    GREENSCREEN SUPPORT</p>
  </body>
  </html>
  `;

  const data = {
    from: 'GreenScreen',
    to: user.email,
    subject: `${user.nickname}, forgot your password?`,
    html: text
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
