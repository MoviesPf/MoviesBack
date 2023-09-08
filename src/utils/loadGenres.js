const Genres = require("../Models/Genres.model");
const axios = require("axios");
const { APY_KEY } = process.env;

async function loadGenresApi() {
  try {
    const dataBase = await Genres.findAll();

    if (!dataBase.lenght) {
      const { data } = await axios(
        "https://eecsj67ln9.execute-api.us-east-2.amazonaws.com/moviespf"
      );

      const seriesData = await axios(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${APY_KEY}`
      )

      const seriesGenres = seriesData.data.genres 

      const genresS = seriesGenres.map((genre) => {
        return {
          id: genre.id,
          name: genre.name,
        }
      })

      const mappedData = data.genres.map((genre) => {
        return {
          id: genre.id,
          name: genre.name,
        };
      });

      await Genres.bulkCreate(mappedData);
      
      for (i=0; i<genresS.length; i++){
        let actualGenre = genresS[i]
        await Genres.findOrCreate({
          where: {id: actualGenre.id, name: actualGenre.name}
        })
      }
      
      console.log("Genres loaded");

    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

module.exports = {
  loadGenresApi,
};