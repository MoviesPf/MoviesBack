const Platforms = require("../Models/Platforms.model");

const getRandomPlatforms = async (count) => {
  const allPlatforms = await Platforms.findAll();

  const randomPlatforms = [];
  while (randomPlatforms.length < count) {
    const randomIndex = Math.floor(Math.random() * allPlatforms.length);
    const platform = allPlatforms[randomIndex];

    if (!randomPlatforms.includes(platform)) {
      randomPlatforms.push(platform);
    }
  }

  return randomPlatforms;
};

module.exports = { getRandomPlatforms };
