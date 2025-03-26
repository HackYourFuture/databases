const mysql = require("mysql2/promise");
require('dotenv').config();
async function transferAmount() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
  });

  try {
    await connection.beginTransaction();

    const [sourceAccount] = await connection.execute(`
      SELECT balance FROM account WHERE account_number = 101
    `);

    if (sourceAccount[0].balance < 1000) {
      throw new Error("Insufficient funds in account 101");
    }

    await connection.execute(`
      UPDATE account SET balance = balance - 1000 WHERE account_number = 101
    `);

    await connection.execute(`
      UPDATE account SET balance = balance + 1000 WHERE account_number = 102
    `);

    await connection.execute(`
      INSERT INTO account_changes (account_number, amount, remark)
      VALUES (101, -1000.00, 'Transferred to account 102'), 
             (102, 1000.00, 'Received from account 101')
    `);

    await connection.commit();
    console.log("Transaction completed successfully");
  } catch (error) {
    console.error("Transaction failed, rolling back:", error);
    await connection.rollback();
  } finally {
    await connection.end();
  }
}

transferAmount();