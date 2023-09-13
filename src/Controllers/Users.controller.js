const sendEmail = require('../Config/mailer');
const Users = require('../Models/Users.model');
const Playlist = require('../Models/Playlists.model');
const { forgotPassword } = require('../Templates/ForgotPassword');
const banned = require('../Templates/banned');
const unbanning = require('../Templates/unbanning');
const welcome = require('../Templates/welcome');
const { cloudinary } = require('../Config/Cloudinary');

const createUser = async (name, nickname, avatar, email, password, source, status) => {
  const userFound = await Users.findOne({ where: { email } });

  if (source === 'gmail' && userFound) {
    const data = await loginUserController(email, password, source);
    return data;
  }

  const user = await Users.create({
    name,
    nickname,
    avatar,
    password,
    email,
    status
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

  console.log(user);

  await Playlist.findOrCreate({
    where:{
      name: "Favorites",
      UserId: user.id,
      programsIds:""
    }
  })
  await Playlist.findOrCreate({
    where:{
      name: "Watched",
      UserId: user.id,
      programsIds:""
    }
  })
  await Playlist.findOrCreate({
    where:{
      name: "WatchList",
      UserId: user.id,
      programsIds:""
    }
  })

  return { data: user };
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

const deleteUser = async (id) => {
  await Users.destroy({
    where: {
      id: id
    }
  })
  return "eliminado"
}

//CONTROLLERS DE CLOUDINARY
// Controlador para subir una imagen
const uploadImageController = async (userId, image, imageType) => {
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return { error: 'Usuario no encontrado' };
    }
    const folder = imageType === 'avatar' ? 'avatar' : 'background';
    // Subir la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(image, { folder });
    // Actualizar la URL de avatar o background en la base de datos
    user[imageType] = result.secure_url;
    await user.save();
    return { message: 'Imagen subida exitosamente', imageUrl: result.secure_url };
  } catch (error) {
    throw error;
  }
};

// Controlador para modificar una imagen
const modifyImageController = async (userId, image, imageType) => {
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return { error: 'Usuario no encontrado' };
    }
    const folder = imageType === 'avatar' ? 'avatar' : 'background';
    // Eliminar la imagen anterior de Cloudinary si existe
    if (user[imageType]) {
      const publicId = user[imageType].split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`${folder}/${publicId}`);
    }
    // Subir la nueva imagen a Cloudinary
    const result = await cloudinary.uploader.upload(image, { folder });
    // Actualizar la URL de avatar o background en la base de datos
    user[imageType] = result.secure_url;
    await user.save();
    return { message: 'Imagen modificada exitosamente', imageUrl: result.secure_url };
  } catch (error) {
    throw error;
  }
};

// Controlador para eliminar una imagen
const deleteImageController = async (userId, imageType) => {
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return { error: 'Usuario no encontrado' };
    }
    const folder = imageType === 'avatar' ? 'avatar' : 'background';

    // Eliminar la imagen de Cloudinary si existe
    if (user[imageType]) {
      const publicId = user[imageType].split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`${folder}/${publicId}`);
    }
    // Establecer la URL de avatar o background en blanco en la base de datos
    user[imageType] = '';
    await user.save();
    return { message: 'Imagen eliminada' };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  findUserById,
  banUserById,
  userEdit,
  forgotPasswordController,
  changePasswordController,
  loginUserController,
  deleteUser,
  uploadImageController,
  modifyImageController,
  deleteImageController,
};