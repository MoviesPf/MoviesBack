const { Router } = require("express");
const {
    postUser,
    getUsers,
    getUserById, 
    banDesbanUser, 
    editUser
} = require("../Handlers/Users.handler.js");

const router = Router();

router.post("/", postUser);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.delete("/:id", banDesbanUser);

router.patch("/:id", editUser);

module.exports = router;