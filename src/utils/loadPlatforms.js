const Platforms = require("../Models/Platforms.model");
const axios = require("axios");

async function loadPlatformsApi() {
  try {
    const dataBase = await Platforms.findAll();

    if (!dataBase.lenght) {
      const { data } = await axios(
        "https://eecsj67ln9.execute-api.us-east-2.amazonaws.com/moviespf"
      );

      const mappedData = data.platforms.map((platform) => {
        return {
          id: platform.id,
          name: platform.name,
        };
      });

      await Platforms.bulkCreate(mappedData);
      console.log("Platforms loaded");
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

module.exports = {
  loadPlatformsApi,
};
