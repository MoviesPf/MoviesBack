const { Router } = require("express");
const {
  getGenresHandler,
  createGenreHandler,
  deleteGenreHandler,
} = require("../Handlers/Genres.handler.js");

const router = Router();

router.get("/", getGenresHandler);
router.post("/", createGenreHandler);
router.delete("/:id", deleteGenreHandler);

module.exports = router;