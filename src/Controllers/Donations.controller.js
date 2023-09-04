const { Donations, Users } = require('../Models/Relations');

const getDonationsController = async () => {
  const data = await Donations.findAll();

  const totalDonations = data.length;
  console.log(totalDonations);

  const totalAmount = 0;

  return {
    data,
    totalDonations
  };
};

const getIdDonationsController = async (donationId) => {
  const data = await Donations.findOne({
    where: {
      id: donationId
    },
    include: [{ model: Users, attributes: ['id', 'name', 'email'] }]
  });

  return { data };
};

const createDonationsController = async (body) => {
  await Donations.create(body);

  return {
    message: 'The donation was successful, thank you for your contribution!'
  };
};

module.exports = {
  getDonationsController,
  getIdDonationsController,
  createDonationsController
};
