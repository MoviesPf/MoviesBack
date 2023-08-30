const { Router } = require('express');
const axios = require('axios');

const platformsRouter = require('./Platforms.routes');
const programsRouter = require('./Programs.routes');
const genresRouter = require('./Genres.routes');
const reviewRouter = require('./Reviews.routes');
<<<<<<< HEAD
const playlistRouter = require('./Playlist.routes')
=======
const usersRouter = require('./Users.routes');
>>>>>>> 3de02119ea35fada91698eccdec5c85fc2b4b82e

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
<<<<<<< HEAD
router.use('review', reviewRouter);
router.use('/playlist', playlistRouter)
=======
router.use('/review', reviewRouter);
router.use('/users', usersRouter);
>>>>>>> 3de02119ea35fada91698eccdec5c85fc2b4b82e

module.exports = router;
