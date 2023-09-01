const Programs = require("../Models/Programs.model");
const { getRandomPlatforms } = require("./util");

const createInitialPlatforms = async () => {
  try {
    const programs = await Programs.findAll();

    for (const program of programs) {
      const platforms = await getRandomPlatforms(2);

      // Asocia las dos plataformas aleatorias a la película actual
      await program.addPlatforms(platforms);

      /*  console.log(`Plataformas asociadas a la película ${program.title}:`);
      for (const platform of platforms) {
        console.log(`- ID: ${platform.id}, Nombre: ${platform.name}`);
      } */
    }
  } catch (error) {
    throw new Error("Error during association of platforms with programs");
  }
};

module.exports = createInitialPlatforms;
