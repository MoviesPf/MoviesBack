const mercadopago = require('mercadopago');
const Donations = require('../Models/Donations.model');
const Users = require("../Models/Users.model");

const createOrder = async (req, res) => {
  try {
    mercadopago.configure({
      access_token:
        'TEST-8904276648822814-090619-7c57530ea001e5648d390ac642516a24-1472539992'
    });
    const successMessage =
      'Thank you very much! Your donation has been successfully completed';
    const failureMessage =
      'Oh! an error occurred while making your donation, please try again.';
    const popcorn = req.body;

    const user = await Users.findByPk(popcorn.userId)
    console.log(user)
    const result = await mercadopago.preferences.create({
      items: [
        {
          title: popcorn.title,
          currency_id: 'ARS',
          unit_price: Number(popcorn.price),
          quantity: parseInt(popcorn.quantity, 10) ?? 0
        }
      ],
      back_urls: {
        success: `https://movies-front-tau.vercel.app/?message=${encodeURIComponent(
          successMessage
        )}`,
        failure: `https://movies-front-tau.vercel.app/?message=${encodeURIComponent(
          failureMessage
        )}`,
        pending: 'https://movies-front-tau.vercel.app/'
      },
      auto_return: 'approved'
    });

    console.log(result);

    // si fue exitosa la donacion se guarda en la base de datos
    if (result && result.response && result.response.id) {
      user.donator = true;
      user.save();

      console.log('Antes de la creación del registro en la base de datos');
      const newDonation = await Donations.create({
        date: new Date(),
        amount: parseInt(popcorn.price, 10),
        UserId: user.id,
      });
      console.log('Después de la creación del registro en la base de datos');
      console.log(
        'Datos de donación guardados en la base de datos:',
        newDonation.toJSON(),
        "user id", 
        user.id,
      );
    }
    res.status(200).json({ response: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error' });
  }
};

module.exports = {
  createOrder
};
