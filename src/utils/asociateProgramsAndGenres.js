const Programs = require("../Models/Programs.model");
const Genres = require("../Models/Genres.model");
const axios = require("axios");

async function asociateMoviesAndGenres(req, res, next) {
    const { data } = await axios("https://eecsj67ln9.execute-api.us-east-2.amazonaws.com/moviespf");

    const genreOpcional = await Genres.findOne({ where: { id: 10764}})
    console.log(genreOpcional);

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

    try {
        
        for( i = 0 ; i < clearedMoviesId.length ; i++){
            const apiProgram =data.movies.filter( movie => {
                return movie.id === clearedMoviesId[i]
            })
            const genres = apiProgram[0].genre_ids;

            const actualProgram = await Programs.findByPk(clearedMoviesId[i])
            const dbGenres = await Genres.findAll({ where: { id: genres}})
            // const genreOpcional = await Genres.findOne({ where: { id: 10764}})

            dbGenres.length > 0 ? await actualProgram.addGenres(dbGenres) : await actualProgram.addGenres(genreOpcional)

            console.log(dbGenres)
        }

        res.status(200).json("generos asociados correctamente")
    } catch (error) {
        next(error)
    }
}

async function asociateSeriesAndGenres(req, res, next) {
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

    try {

        for( i = 0 ; i < clearedSeriesId.length ; i++){
            const apiProgram =data.series.filter( serie => {
                return serie.id === clearedSeriesId[i]
            })
            const genres = apiProgram[0].genre_ids;

            const actualProgram = await Programs.findByPk(clearedSeriesId[i])
            const dbGenres = await Genres.findAll({ where: { id: genres}})
            const genreOpcional = await Genres.findAll({where: {id:[10770,10764]}})

            dbGenres.length > 0 ? await actualProgram.addGenres(dbGenres) : await actualProgram.addGenres(genreOpcional)
        }

        res.status(200).json("generos asociados correctamente")
    } catch (error) {
        next(error)
    }
}

module.exports = {
    asociateSeriesAndGenres,
    asociateMoviesAndGenres
};