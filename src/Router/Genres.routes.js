const { Router } = require("express");
const {
  getGenresHandler,
  getMoviesGenresHandler,
  getSeriesGenresHandler,
  createGenreHandler,
  deleteGenreHandler,
} = require("../Handlers/Genres.handler.js");

const router = Router();

router.get("/", getGenresHandler);
router.get("/movies", getMoviesGenresHandler);
router.get("/series", getSeriesGenresHandler);
router.post("/", createGenreHandler);
router.delete("/:id", deleteGenreHandler);

module.exports = router;