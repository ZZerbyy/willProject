
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.SUPABASE_USER,
  host: process.env.SUPABASE_HOST,
  database: process.env.SUPABASE_DATABASE,
  password: process.env.SUPABASE_PASSWORD,
  port: process.env.SUPABASE_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
