const { loadGenresApi } = require("./loadGenres");
const { loadPlatformsApi } = require("./loadPlatforms.js");
// const { loadProgramsApi } = require("./loadPrograms");
const InitialDataStatus = require("../Models/InitialDataStatus.model");

const initializeInitialData = async () => {
  const dataStatus = await InitialDataStatus.findOne();

  if (!dataStatus || !dataStatus.loaded) {
    await loadGenresApi();
    await loadPlatformsApi();
    // await loadProgramsApi();

    if (!dataStatus) {
      await InitialDataStatus.create({ loaded: true });
    } else {
      await dataStatus.update({ loaded: true });
    }
  }
};

module.exports = initializeInitialData;