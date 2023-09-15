const {
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
  uploadAvatarImageController,
  uploadBackgroundImageController,
} = require('../Controllers/Users.controller.js');

const postUser = async (req, res, next) => {
  try {
    const { name, nickname, avatar, email, password, source, status } = req.body;

    console.log(source);

    if (!name || !nickname || !avatar || !email )
      return res.status(400).send('Faltan datos');

    const user = await createUser(
      name,
      nickname,
      avatar,
      email,
      password,
      source,
      status
    );
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userById = await findUserById(id);
    res.status(200).json(userById);
  } catch (error) {
    next(error);
  }
};

const banDesbanUser = async (req, res, next) => {
  const { id } = req.params;
  const { reason } = req.body;
  try {
    const bannedUser = await banUserById(id, reason);
    res.status(200).json(bannedUser);
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    if (!body) {
      return res.status(400).json({ error: 'Datos insuficientes' });
    }
    const editedUser = await userEdit(id, body);
    return res.status(200).json(editedUser);
  } catch (error) {
    next(error);
  }
};

const forgotPasswordHandler = async (req, res, next) => {
  try {
    const { email } = req.body;

    const data = await forgotPasswordController(email);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const changePasswordHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email);

    const data = await changePasswordController(email, password);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const loginUserHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const data = await loginUserController(email, password);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const eliminarUsuario = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await deleteUser(id);
    return res.status(200).send(data);
  } catch (error) {
    next(error)
  }
}

// const uploadImageHandler = async (req, res, next) => {
//   try {
//     const { userId, image, imageType } = req.body;
//     const result = await uploadImageController(userId, image, imageType);
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };
const uploadAvatarImageHandler = async (req, res, next) => {
  try {
    const { userId, image } = req.body;
    const result = await uploadAvatarImageController(userId, image);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
const uploadBackgroundImageHandler = async (req, res, next) => {
  try {
    const { userId, image } = req.body;
    const result = await uploadBackgroundImageController(userId, image);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const modifyImageHandler = async (req, res, next) => {
  try {
    const { userId, image, imageType } = req.body;
    const result = await modifyImageController(userId, image, imageType);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteImageHandler = async (req, res, next) => {
  try {
    const { userId, imageType } = req.body;
    const result = await deleteImageController(userId, imageType);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postUser,
  getUsers,
  getUserById,
  banDesbanUser,
  editUser,
  forgotPasswordHandler,
  changePasswordHandler,
  loginUserHandler,
  eliminarUsuario,
  // uploadImageHandler,
  uploadAvatarImageHandler,
  uploadBackgroundImageHandler,
  modifyImageHandler,
  deleteImageHandler,
};