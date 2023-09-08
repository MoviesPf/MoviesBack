const mercadopago = require("mercadopago");
const Donations = require('../Models/Donations.model');
const createOrder = async (req, res) => {
  try {
    mercadopago.configure({
      access_token: "TEST-8904276648822814-090619-7c57530ea001e5648d390ac642516a24-1472539992"
    })
    const successMessage = "¡Muchas Gracias! Su donación se ha realizado con éxito";
    const failureMessage = "¡Oh! ha ocurrido un error al realizar su donación, vuelve a intentarlo";
    const popcorn = req.body;
    const result = await mercadopago.preferences.create({
      items: [
        {
          title: popcorn.title,
          currency_id: "ARS",
          unit_price: Number(popcorn.price),
          quantity: parseInt(popcorn.quantity, 10) ?? 0,
        }],
      back_urls: {
        success: `http://localhost:5173/donate?message=${encodeURIComponent(successMessage)}`,
        failure: `http://localhost:5173/donate?message=${encodeURIComponent(failureMessage)}`,
        pending: "http://localhost:5173/donate",
      },
      auto_return: "approved",
    });

    console.log(result);

    // si fue exitosa la donacion se guarda en la base de datos
    if (result && result.response && result.response.id) {
      console.log('Antes de la creación del registro en la base de datos');
      const newDonation = await Donations.create({
        date: new Date(),
        amount: parseInt(popcorn.price, 10),
      });
      console.log('Después de la creación del registro en la base de datos');
      console.log('Datos de donación guardados en la base de datos:', newDonation.toJSON());
    }
    res.status(200).json({ response: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error" });
  }
}

module.exports = {
  createOrder
};