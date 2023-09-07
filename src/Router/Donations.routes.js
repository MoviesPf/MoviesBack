const { Router } = require('express');
const {
  getDonationsHandler,
  getIdDonationsHandler,
  createDonationsHandler
} = require('../Handlers/Donations.handler');

const router = Router();

router.get('/', getDonationsHandler);

router.get('/:id', getIdDonationsHandler);

router.post('/create', createDonationsHandler);

module.exports = router;
