require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./Router/index.js');
const port = process.env.PORT || 3001;

const sequelize = require('./db');

const createInitialPlatforms = require('./utils/createInitialPlatforms.js');

const initializeInitialData = require('./utils/initializeInitialData.js');

// Se importan los modelos para que se creen las tablas
const {
  Users,
  Reviews,
  Programs,
  Platforms,
  Genres,
  Playlists,
  Donations
} = require('./Models/Relations.js');

const app = express();

//node mailer
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', router);

sequelize.sync({ force: false }).then(async () => {
  console.log('db conectada');

  // Inicializa los datos iniciales
  await initializeInitialData();

  // Llamada a la función para asociar platforms a programs
  await createInitialPlatforms();

  app.listen(3001, () => console.log('Server is running on port', port));
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
