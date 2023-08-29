const Genres = require("./Models/Genres.model");
const axios = require("axios");

async function loadGenresApi () {
    try {
        const dataBase = await Genres.findAll();

        if(!dataBase.lenght) {
            const { data } = await axios("https://eecsj67ln9.execute-api.us-east-2.amazonaws.com/moviespf");
            
            const mappedData = data.genres.map((genre) => {
                return {
                    id: genre.id,
                    name: genre.name,
                }
            })

            
            await Genres.bulkCreate(mappedData);
            console.log("Genres loaded");
        }
    } catch (error) {
        console.log("Error: ", error)
    }
}


module.exports = {
    loadGenresApi,
}