const Donations = require('../Models/Donations.models')

const getAllDonationsControllers = async () => {
  const data = await Donations.findAll()

  return {
    data
  }
}

module.exports = {
  getAllDonationsControllers
}