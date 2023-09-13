const Programs = require("../Models/Programs.model");
const axios = require("axios");
const { APY_KEY } = process.env;

async function loadSeriesApi(req, res, next) {
    try {
        const { data } = await axios("https://eecsj67ln9.execute-api.us-east-2.amazonaws.com/moviespf");

        const seriesIds = data.series.map( (serie)=>{
            return serie.id
        })

        let clearedSeriesId = [];
        let repeatedSeriesId = [];

        const ClearSeriesIds = ()=> {
            seriesIds.forEach(id => {
                if (clearedSeriesId.includes(id)) {
                    repeatedSeriesId.push(id)
                } else {
                    if (id === 1930) {
                        repeatedSeriesId.push(id)
                    } else {
                        clearedSeriesId.push(id)
                    }
                }
            });
        }

        ClearSeriesIds();

        const allSeries = [];
        
        for( let i = 0; i < clearedSeriesId.length; i++){

            const serie = {};

            const serieData = await axios(`https://api.themoviedb.org/3/tv/${clearedSeriesId[i]}?api_key=${APY_KEY}`);
            const serieCast = await axios(`https://api.themoviedb.org/3/tv/${clearedSeriesId[i]}/credits?api_key=${APY_KEY}`);
            const img = 'https://image.tmdb.org/t/p/w500';
            
            const sCast = serieCast.data.cast.map((actor)=>{
               return `${actor.name} - ${actor.character}`;
           });

            const serieCompanies = serieData.data.production_companies.map((company) => {
                return company.name;
            });

            serie.id = serieData.data.id;
            serie.title = serieData.data.name;
            serie.overview = serieData.data.overview;
            serie.release_date = serieData.data.first_air_date;
            serie.backdrop = img + serieData.data.backdrop_path;
            serie.poster = img + serieData.data.poster_path;
            serie.companies = serieCompanies;
            serie.adult = serieData.data.adult;
            serie.episodes = serieData.data.number_of_episodes;
            serie.seasons = serieData.data.number_of_seasons;
            serie.cast = sCast;
            serie.popularity = serieData.data.popularity;
            serie.type = "serie";

            allSeries.push(serie);
        }

        await Programs.bulkCreate(allSeries);
        console.log("series Loaded");

        return res.status(200).send("series cargadas correctamente");

    } catch (error) {
        next(error);
    };
};

module.exports = {
    loadSeriesApi,
};