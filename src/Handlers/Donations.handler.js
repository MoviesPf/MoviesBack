const {
  getDonationsController,
  getIdDonationsController,
  createDonationsController
} = require('../Controllers/Donations.controller');

const getDonationsHandler = async (req, res, next) => {
  try {
    const data = await getDonationsController();

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getIdDonationsHandler = async (req, res, next) => {
  try {
    const { donationId } = req.params;

    const data = await getIdDonationsController(donationId);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const createDonationsHandler = async (req, res, next) => {
  try {
    const body = req.body;

    const data = await createDonationsController(body);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDonationsHandler,
  getIdDonationsHandler,
  createDonationsHandler
};