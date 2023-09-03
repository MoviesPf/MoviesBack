const Programs = require("../Models/Programs.model");
const Genres = require("../Models/Genres.model");
const axios = require("axios");


async function asociateProgramsAndGenres(req, res, next) {
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

    try {
        
        for( i = 0 ; i < clearedMoviesId.length ; i++){
            const apiProgram =data.movies.filter( movie => {
                return movie.id === clearedMoviesId[i]
            })
            const genres = apiProgram[0].genre_ids;

            const actualProgram = await Programs.findByPk(clearedMoviesId[i])
            const dbGenres = await Genres.findAll({ where: { id: genres}})

            await actualProgram.addGenres(dbGenres)
        }

        for( i = 0 ; i < clearedSeriesId.length ; i++){
            const apiProgram =data.series.filter( serie => {
                return serie.id === clearedSeriesId[i]
            })
            const genres = apiProgram[0].genre_ids;

            const actualProgram = await Programs.findByPk(clearedSeriesId[i])
            const dbGenres = await Genres.findAll({ where: { id: genres}})

            await actualProgram.addGenres(dbGenres)
        }

        res.status(200).json("generos asociados correctamente")
    } catch (error) {
        next(error)
    }
}

module.exports = {
    asociateProgramsAndGenres,
};