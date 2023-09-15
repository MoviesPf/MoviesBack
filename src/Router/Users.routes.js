const { Router } = require('express');
const {
  postUser,
  getUsers,
  getUserById,
  banDesbanUser,
  editUser,
  forgotPasswordHandler,
  changePasswordHandler,
  loginUserHandler,
  eliminarUsuario,
  getAllUsersAdminHandler,
    // uploadImageHandler,
    modifyImageHandler,
    deleteImageHandler,
    uploadAvatarImageHandler,
    uploadBackgroundImageHandler
} = require('../Handlers/Users.handler.js');

const router = Router();

router.get('/all', getAllUsersAdminHandler);

router.patch('/forgot-password', forgotPasswordHandler);

router.patch('/change-password', changePasswordHandler);

router.post('/', postUser);

router.get('/', getUsers);

router.post('/login', loginUserHandler);

router.get('/:id', getUserById)

router.delete('/ban/:id', banDesbanUser)

router.delete('/delete/:id', eliminarUsuario);

router.patch('/:id', editUser);

//admin
router.get('/all', getAllUsersAdminHandler);

router.post('/avatar/upload-image', uploadAvatarImageHandler);
router.post('/background/upload-image', uploadBackgroundImageHandler);

router.post('/modify-image', modifyImageHandler);

router.post('/delete-image', deleteImageHandler);

module.exports = router;
