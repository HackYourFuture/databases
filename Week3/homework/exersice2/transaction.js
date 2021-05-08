const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'Password',
  database: 'Class31',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();

  try {
    await execQuery('START TRANSACTION');
    await execQuery(
      'UPDATE account SET  balance = (balance - 1000)  WHERE account_number = 101',
    );
    await execQuery(
      'UPDATE  account_changes SET  change_number = 1000  WHERE account_number = 102',
    );
    await execQuery(
      'UPDATE account_changes SET amount = (amount + change_number) WHERE account_number = 102',
    );

    await execQuery('COMMIT');
  } catch (error) {
    console.error(error);
    await execQuery('ROLLBACK');
    connection.end();
  }

  connection.end();
}

seedDatabase();
