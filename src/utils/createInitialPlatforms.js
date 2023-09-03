const Programs = require("../Models/Programs.model");
const { getRandomPlatforms } = require("./util");

const createInitialPlatforms = async () => {
  try {
    const programs = await Programs.findAll();

    for (const program of programs) {
      const existingPlatforms = await program.getPlatforms();

      if (existingPlatforms.length === 0) {
        const platforms = await getRandomPlatforms(2);

        await program.addPlatforms(platforms);
      }
    }
  } catch (error) {
    throw new Error("Error during association of platforms with programs");
  }
};

module.exports = createInitialPlatforms;
