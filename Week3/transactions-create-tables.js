const mysql = require('mysql2/promise');
require('dotenv').config();
async function createTables() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

try {
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS account (
      account_number INT PRIMARY KEY,
      balance DECIMAL(10, 2) NOT NULL
    );
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS account_changes (
      change_number INT PRIMARY KEY AUTO_INCREMENT,
      account_number INT,
      amount DECIMAL(10, 2) NOT NULL,
      changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      remark VARCHAR(255),
      FOREIGN KEY (account_number) REFERENCES account(account_number)
    );
  `);

  console.log("Tables created successfully");
} catch (error) {
  console.error("Error creating tables:", error);
} finally {
  await connection.end();
}
}

createTables();