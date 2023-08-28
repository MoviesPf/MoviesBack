require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./Router/index.js");
const port = process.env.PORT || 3001;
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(port, () => console.log("Server is running on port", port))


app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
