const { Router } = require('express');
const { getDonationsHandler } = require('../Handlers/Donations.handler');

const router = Router();

router.get('/', getDonationsHandler);

module.exports = router;
