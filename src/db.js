// require('dotenv').config();
// const { POSTGRES_URL } = process.env;

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(
//   'postgres://movies_z8oh_user:NqPBd8oTK0MRLK1J8BrSWNbXsB5m1YC3@dpg-ck11bm7hdsdc73dodup0-a.oregon-postgres.render.com/movies_z8oh',
//   {
//     dialect: 'postgres',
//     dialectOptions: {
//       ssl: {
//         require: true, // Requerir SSL
//         rejectUnauthorized: false // No rechazar conexiones no autorizadas
//       }
//     },
//     logging: false
//   }
// );

// // Manejador de eventos para verificar si la conexión se ha establecido correctamente.
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Conexión a la base de datos establecida con éxito');
//   })
//   .catch((error) => {
//     console.error('Error al conectar a la base de datos:', error);
//   });

// module.exports = sequelize;

require('dotenv').config();
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_DATABASE } =
  process.env;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}/${POSTGRES_DATABASE}`,
  {
    logging: false,
    native: false
  }
);
//
module.exports = sequelize;
