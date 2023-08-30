require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const pool = require('./db');
const router = require('./Router/index.js');
const port = process.env.PORT || 3001;

// Se importan los modelos para que se creen las tablas
const {
  Users,
  Reviews,
  Movies,
  Platforms,
  Genres
} = require('./Models/Relations.js');
const sequelize = require('./db');

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());

app.use('/', router);

<<<<<<< HEAD
sequelize.sync({force: false}).then(() => console.log('db conectada'));

app.listen(port, () => console.log('Server is running on port', port));
=======
sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => console.log('Server is running on port', port));
});
>>>>>>> 3de02119ea35fada91698eccdec5c85fc2b4b82e

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
