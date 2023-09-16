const Programs = require("../Models/Programs.model");
const { getRandomPlatforms } = require("./util");

const createInitialPlatforms = async () => {
  try {
    const programs = await Programs.findAll();

    for (const program of programs) {
      const existingPlatforms = await program.getPlatforms();

      if (existingPlatforms.length === 0) {
        const platforms = await getRandomPlatforms(6);

        await program.addPlatforms(platforms);
      }
    }
  } catch (error) {
    console.error(
      "Error during association of platforms with programs:",
      error
    );
  }
};

module.exports = createInitialPlatforms;
