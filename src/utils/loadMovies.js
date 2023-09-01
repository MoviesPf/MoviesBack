const Programs = require("../Models/Programs.model");
const axios = require("axios");
const { APY_KEY } = process.env;

async function loadMoviesApi(req, res, next) {
    try {
        const { data } = await axios("https://eecsj67ln9.execute-api.us-east-2.amazonaws.com/moviespf");

        const moviesIds = data.movies.map( (movie)=>{
            return movie.id;
        });

        let clearedMoviesId= [];
        let repeatedMoviesId= [];

        const clearMoviesIds = ()=> {
            moviesIds.forEach(id => {
                if (clearedMoviesId.includes(id)) {
                    repeatedMoviesId.push(id);
                } else {
                    clearedMoviesId.push(id);
                };
            });
        };

        clearMoviesIds();

        const allMovies = [];
        
        for( let i = 0; i < clearedMoviesId.length ; i++){
            const movie = {};

            const movieData = await axios(`https://api.themoviedb.org/3/movie/${clearedMoviesId[i]}?api_key=${APY_KEY}`);
            const movieCast = await axios(`https://api.themoviedb.org/3/movie/${clearedMoviesId[i]}/credits?api_key=${APY_KEY}`);
            const img = 'https://image.tmdb.org/t/p/w500';
            
            const mCast = movieCast.data.cast.map((actor)=>{
               return `${actor.name} - ${actor.character}`;
           });

            const movieCompanies = movieData.data.production_companies.map((company) => {
                return company.name;
            });

            movie.id = movieData.data.id;
            movie.title = movieData.data.title;
            movie.overview = movieData.data.overview;
            movie.release_date = movieData.data.release_date;
            movie.backdrop = img + movieData.data.backdrop_path;
            movie.poster = img + movieData.data.poster_path;
            movie.runtime = movieData.data.runtime;
            movie.companies = movieCompanies;
            movie.adult = movieData.data.adult;
            movie.revenue = movieData.data.revenue;
            movie.budget = movieData.data.budget;
            movie.cast = mCast;
            movie.popularity = movieData.data.popularity;
            movie.type = "movie";

            allMovies.push(movie);
        };

    await Programs.bulkCreate(allMovies);
    console.log("Movies Loaded");

        return res.status(200).send("Movies cargadas correctamente");
        
    } catch (error) {
        next(error);
    };

};

module.exports = {
    loadMoviesApi,
};