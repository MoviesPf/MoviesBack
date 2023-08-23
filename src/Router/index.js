const { Router } = require("express");
const axios = require("axios");
const platformsRouter = require("./Plataforms.routes");

const router = Router();

router.get("/", async (req, res) => {
  const response = await axios.get(
    "https://eecsj67ln9.execute-api.us-east-2.amazonaws.com/moviespf"
  );

  console.log(response);
  res.send(response.data);
});

router.use(platformsRouter);

module.exports = router;
