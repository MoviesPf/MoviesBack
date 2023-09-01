// require('dotenv').config();
// const { POSTGRES_URL } = process.env;

// const { Pool } = require('pg')

// const pool = new Pool({
//   connectionString: "postgres://default:kfIPFKdTZV96@ep-damp-night-98907705-pooler.us-west-2.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
// })

// pool.connect((err) => {
//   if (err) throw err
//   console.log("Connect to PostgreSQL succesfully!")
// })

// module.exports = pool;
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