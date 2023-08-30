require("dotenv").config();

const express = require("express");
const cors = require("cors");
// const pool = require('./db');
const router = require("./Router/index.js");
const port = process.env.PORT || 3001;

const createInitialPlatforms = require("./utils/createInitialPlatforms.js");

// Se importan los modelos para que se creen las tablas
const {
  Users,
  Reviews,
  Programs,
  Platforms,
  Genres,
} = require("./Models/Relations.js");
const sequelize = require("./db");

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());

app.use("/", router);

sequelize.sync({ force: false }).then(async () => {
  console.log("db conectada");

  // Llamada a la función para asociar platforms a programs
  await createInitialPlatforms();

sequelize.sync({force: false}).then(() => 
  console.log('db conectada'));
  app.listen(port, () => 
    console.log('Server is running on port', port));
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
