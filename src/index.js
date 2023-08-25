require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const router = require("./Router/index.js");
const port = process.env.PORT || 3001;

// Se importan los modelos para que se creen las tablas
const {
  Users,
  Reviews,
  Movies,
  Platforms,
  Genres,
} = require("./Models/Relations.js");

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());

app.use("/", router);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log("Server running on 3001");
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});