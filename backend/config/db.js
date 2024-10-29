// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.SUPABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Allow SSL without verifying the certificate
  },
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the Supabase database:', err.stack);
  } else {
    console.log('Connected to Supabase database');
    client.query('SELECT NOW()', (err, res) => {
      release();
      if (err) {
        console.error('Error executing test query:', err.stack);
      } else {
        console.log('Test query result:', res.rows);
      }
    });
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
