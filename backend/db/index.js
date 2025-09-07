// backend/db/index.js
const { Pool } = require('pg');
require('dotenv').config();
console.log("--- DATABASE CONNECTION ---");
console.log("Attempting to connect to database URL:");
console.log(process.env.DATABASE_URL);
console.log("---------------------------");

// The pg library automatically reads the DATABASE_URL variable from .env
// We add the ssl configuration to connect to cloud databases like Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};