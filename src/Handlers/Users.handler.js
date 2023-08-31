const {
  createUser,
  getAllUsers,
  findUserById,
  banUserById,
  userEdit,
  forgotPasswordController
} = require('../Controllers/Users.controller.js');

const postUser = async (req, res, next) => {
  try {
    const { name, nickname, avatar, email, password, status } = req.body;
    if (!name || !nickname || !avatar || !email || !password || !status)
      return res.status(400).send('Faltan datos');

    const user = await createUser(
      name,
      nickname,
      avatar,
      email,
      password,
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
  try {
    const bannedUser = await banUserById(id);
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

    return res.status(200).json(data)
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
  forgotPasswordHandler
};
