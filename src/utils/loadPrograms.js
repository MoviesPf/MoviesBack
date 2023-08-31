const Programs = require("../Models/Programs.model");
const axios = require("axios");

async function loadProgramsApi(req, res, next) {
    try {
            const { data } = await axios("https://eecsj67ln9.execute-api.us-east-2.amazonaws.com/moviespf");

            const movies = data.movies.map(async (movie) => {
                
            })
            
    //     // const movies = data.movies.map(async (movie) => {
    
    //     //     // let movieCast = await axios(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=95e749339979dd55fd29df3fa91c46c3`)
    //     //     // let mCast = movieCast.data.cast.map((actor)=>{
    //     //     //     return `${actor.name} - ${actor.character}`
    //     //     // });
            
    //     //     // let movieAditional = await axios(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=95e749339979dd55fd29df3fa91c46c3`)
    //     //     // let movieCompanies = movieAditional.data.production_companies.map((company) => {
    //     //     //     return company.name
    //     //     // });
            
    //     //     // let finalMCompanies = movieCompanies.join(" - ");
            
    //     //     return {
    //     //         title: movie.title,
    //     //         overview: movie.overview,
    //     //         release_date: movie.release_date,
    //     //         backdrop: movie.backdrop_path,
    //     //         poster: movie.poster_path,
    //     //         // runtime: movieAditional.data.runtime,
    //     //         // companies: finalMCompanies,
    //     //         adult: movie.adult,
    //     //         // revenue: movieAditional.data.revenue,
    //     //         // budget: movieAditional.data.budget,
    //     //         // cast: mCast,
    //     //         popularity: movie.popularity,
    //     //         type: "movie",
    //     //     };
    //     // });
        
    //     // const series = data.series.map( async (serie) => {
            
    //         // let serieCast = await axios(`https://api.themoviedb.org/3/tv/${serie.id}/credits?api_key=95e749339979dd55fd29df3fa91c46c3`)
    //         // let sCast = serieCast.data.cast.map((actor)=>{
    //         //     return `${actor.name} - ${actor.character}`
    //         // });
            
    //         // let serieAditional = await axios(`https://api.themoviedb.org/3/tv/${serie.id}/?api_key=95e749339979dd55fd29df3fa91c46c3`)
    //         // let serieCompanies = serieAditional.data.production_companies.map((company) => {
    //         //     return company.name
    //         // });
            
    //         // let finalSCompanies = serieCompanies.join(" - ")
            
    //     //     return {
    //     //         title:serie.name,
    //     //         overview: serie.overview,
    //     //         release_date: serie.first_aid_date,
    //     //         backdrop: serie.backdrop_path,
    //     //         poster: serie.poster_path,
    //     //         // companies:finalSCompanies,
    //     //         adult: serie.adult,
    //     //         // episodes: serieAditional.data.number_of_episodes,
    //     //         // seasons: serieAditional.data.number_of_seasons,
    //     //         // cast:sCast,
    //     //         popularity:serie.popularity,
    //     //         type: "serie"
    //     //     };
    //     // });
        
    //     // await Programs.bulkCreate(movies);
    //     // console.log("Movies Loaded");

    //     await Programs.bulkCreate(data.series);
    //     console.log("series Loaded");

        return res.status(200).json(movies)
    // }
        
    } catch (error) {
        next(error);
    };

};

module.exports = {
    loadProgramsApi,
};