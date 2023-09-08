// require('dotenv').config();
// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(process.env.POSTGRES_URL + "?sslmode=require", {
//   dialect: 'postgres', 
//   logging: false, 
// });

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

module.exports = sequelize;