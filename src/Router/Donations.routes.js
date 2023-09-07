const { Router } = require('express');
const { createOrder, getSuccess, getFailure, getPending } = require('../Handlers/Donations.handler');

const router = Router();

router.post('/create-order', createOrder);
router.get('/success', getSuccess);
router.get('/failure', getFailure);
router.get('/pending', getPending);
router.post('/webhook', (req, res) => {
  console.log(req.body);
  res.status(200).send('Webhook received');
});

module.exports = router;
