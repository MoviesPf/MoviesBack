const { Router } = require('express');
const axios = require('axios');

const platformsRouter = require('./Platforms.routes');
const programsRouter = require('./Programs.routes');
const genresRouter = require('./Genres.routes');
const reviewRouter = require('./Reviews.routes');
const playlistsRouter = require('./Playlists.routes');
const usersRouter = require('./Users.routes');
const donationsRouter = require('./Donations.routes')

const router = Router();

router.use('/programs', programsRouter);
router.use('/genres', genresRouter);
router.use('/platforms', platformsRouter);
router.use('/playlists', playlistsRouter);
router.use('/review', reviewRouter);
router.use('/users', usersRouter);
router.use('/donations', donationsRouter)

module.exports = router;