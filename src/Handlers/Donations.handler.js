const mercadopago = require("mercadopago");

const createOrder = async (req, res) => {
  try {
    mercadopago.configure({
      access_token: "TEST-8904276648822814-090619-7c57530ea001e5648d390ac642516a24-1472539992"
    })

    const popcorn = req.body;
    const result = await mercadopago.preferences.create({
      items: [
        {
          title: popcorn.title,
          currency_id: "ARS",
          unit_price: Number(popcorn.price),
          quantity: Number(popcorn.quantity),
        }],
      back_urls: {
        success: "http://localhost:3001/donations/success",
        failure: "http://localhost:3001/donations/failure",
        pending: "http://localhost:3001/donations/pending",
      },
      auto_return: "approved",
    });

    console.log(result);
    res.status(200).json({ response: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error" });
  }
}

const getSuccess = async (req, res) => {
  try {
    // Devuelve un JSON con el mensaje de éxito.
    res.status(200).json({ message: "Su donación se ha realizado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFailure = async (req, res) => {
  try {
    // Devuelve un JSON con el mensaje de éxito.
    res.status(200).json({ message: "Oh, subo un error al realizar su donación" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getPending = async (req, res) => {
  try {
    // Devuelve un JSON con el mensaje de éxito.
    res.status(200).json({ message: "Su donación esta en pendiente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  createOrder,
  getSuccess,
  getFailure,
  getPending,
};
