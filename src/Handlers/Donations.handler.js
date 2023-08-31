const {getDonationsController} = require('../Controllers/Donations.controller')

const getDonationsHandler = async (req, res, next) => {
  try {
    const data = await getDonationsController();

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDonationsHandler
}