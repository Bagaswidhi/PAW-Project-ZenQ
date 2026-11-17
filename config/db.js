require('dotenv').config();
const { Pool } = require('pg');


const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
});

pool.connect()
  .then((client) => {
    console.log(' Terhubung ke PostgreSQL');
    client.release();
  })
  .catch((err) => {
    console.error(' Gagal konek ke database:', err.message);
  });
  


module.exports = pool;