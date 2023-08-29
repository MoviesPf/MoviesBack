const { Router } = require('express');
const axios = require('axios');

const platformsRouter = require('./Platforms.routes');
const moviesRouter = require('./Movies.routes');
const genresRouter = require('./Genres.routes');
const reviewRouter = require('./Reviews.routes');

const router = Router();

router.get('/', async (req, res) => {
  const response = await axios.get(
    'https://eecsj67ln9.execute-api.us-east-2.amazonaws.com/moviespf'
  );

  console.log(response);
  res.send(response.data);
});

router.use('/movies', moviesRouter);
router.use('/genres', genresRouter);
router.use('/platforms', platformsRouter);
router.use('review', reviewRouter);

module.exports = router;
