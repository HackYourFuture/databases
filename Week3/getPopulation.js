const mysql = require('mysql2');

// Create connection to MySQL database
require('dotenv').config();

const conn = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Secure function to get population from a given country table
function getPopulation(Country, name, code, cb) {
  // Using parameterized query to prevent SQL injection
  const query = `SELECT Population FROM ?? WHERE Name = ? AND CountryCode = ?`;

  conn.query(query, [Country, name, code], function (err, result) {
    if (err) return cb(err);
    if (result.length === 0) return cb(new Error("Not found"));
    cb(null, result[0].Population);
  });
}

// Test the function with example input
getPopulation('city', 'kabul', 'AFG', (err, population) => {
  if (err) {
    console.error('Error:', err.message);
  } else {
    console.log('Population:', population);
  }

  // Close the connection after query is done
  conn.end();
});