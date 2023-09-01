const { Router } = require("express");
const {
    postUser,
    getUsers,
    getUserById, 
    banDesbanUser, 
    editUser,
    forgotPasswordHandler,
    changePasswordHandler
} = require("../Handlers/Users.handler.js");

const router = Router();

router.patch("/forgot-password", forgotPasswordHandler)

router.patch("/change-password", changePasswordHandler)

router.post("/", postUser);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.delete("/:id", banDesbanUser);

router.patch("/:id", editUser);

module.exports = router;