require("dotenv").config();
const { POSTGRES_URL } = process.env;

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

pool.connect((err) => {
  if (err) throw err
  console.log("Connect to PostgreSQL succesfully!")
})

module.exports = pool;

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/movies`,  
//   {
//     logging: false,
//     native: false,
//   })
  
//   module.exports = sequelize;

  
