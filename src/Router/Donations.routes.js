const { Router } = require('express');
const { createOrder } = require('../Handlers/Donations.handler');

const router = Router();

router.post('/create-order', createOrder);
router.post('/webhook', (req, res) => {
  console.log(req.body);
  res.status(200).send('Webhook received');
});

module.exports = router;