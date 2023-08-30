const { Router } = require('express');
const axios = require('axios');

const platformsRouter = require('./Platforms.routes');
const programsRouter = require('./Programs.routes');
const genresRouter = require('./Genres.routes');
const reviewRouter = require('./Reviews.routes');
const playlistsRouter = require('./Playlists.routes');
const usersRouter = require('./Users.routes');

const router = Router();

router.get('/', async (req, res) => {
  const response = await axios.get(
    'https://eecsj67ln9.execute-api.us-east-2.amazonaws.com/moviespf'
  );

  console.log(response);
  res.send(response.data);
});

router.use('/programs', programsRouter);
router.use('/genres', genresRouter);
router.use('/platforms', platformsRouter);
router.use('/playlists', playlistsRouter);
router.use('/review', reviewRouter);
router.use('/users', usersRouter);

module.exports = router;
