const { Router } = require("express");
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
    uploadImageHandler,
    modifyImageHandler,
    deleteImageHandler
} = require("../Handlers/Users.handler.js");

const router = Router();

router.patch("/forgot-password", forgotPasswordHandler)

router.patch("/change-password", changePasswordHandler)

router.post("/", postUser);

router.get("/", getUsers);

router.post("/login", loginUserHandler);

router.get("/:id", getUserById);

// router.delete("/:id", banDesbanUser);

router.delete("/:id",eliminarUsuario);

router.patch("/:id", editUser);

router.post('/upload-image', uploadImageHandler);

// Ruta para modificar una imagen
router.post('/modify-image', modifyImageHandler);

// Ruta para eliminar una imagen
router.post('/delete-image', deleteImageHandler);

module.exports = router;