const mysql = require("mysql2/promise");
require('dotenv').config();
async function insertSampleData() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    await connection.execute(`
      INSERT INTO account (account_number, balance)
      VALUES (101, 5000.00), (102, 2000.00)
      ON DUPLICATE KEY UPDATE balance = balance
    `);

    console.log("Sample data inserted successfully");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  } finally {
    await connection.end();
  }
}

insertSampleData();