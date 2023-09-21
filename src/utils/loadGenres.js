const Genres = require("../Models/Genres.model");
const axios = require("axios");
const { APY_KEY } = process.env;

const seriesData = {
  genres: [
  {
  id: 10759,
  name: "Action & Adventure"
  },
  {
  id: 16,
  name: "Animation"
  },
  {
  id: 35,
  name: "Comedy"
  },
  {
  id: 80,
  name: "Crime"
  },
  {
  id: 99,
  name: "Documentary"
  },
  {
  id: 18,
  name: "Drama"
  },
  {
  id: 10751,
  name: "Family"
  },
  {
  id: 10762,
  name: "Kids"
  },
  {
  id: 9648,
  name: "Mystery"
  },
  {
  id: 10763,
  name: "News"
  },
  {
  id: 10764,
  name: "Reality"
  },
  {
  id: 10765,
  name: "Sci-Fi & Fantasy"
  },
  {
  id: 10766,
  name: "Soap"
  },
  {
  id: 10767,
  name: "Talk"
  },
  {
  id: 10768,
  name: "War & Politics"
  },
  {
  id: 37,
  name: "Western"
  }
  ]
}

async function loadGenresApi() {
  try {
    const dataBase = await Genres.findAll();

    if (!dataBase.lenght) {
      const { data } = await axios(
        "https://eecsj67ln9.execute-api.us-east-2.amazonaws.com/moviespf"
      );

      const seriesGenres = seriesData.genres;

      const genresS = seriesGenres.map((genre) => {
        return {
          id: genre.id,
          name: genre.name,
        };
      });

      const mappedData = data.genres.map((genre) => {
        return {
          id: genre.id,
          name: genre.name,
        };
      });

      await Genres.bulkCreate(mappedData);

      for (i = 0; i < genresS.length; i++) {
        let actualGenre = genresS[i];
        await Genres.findOrCreate({
          where: { id: actualGenre.id, name: actualGenre.name },
        });
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
