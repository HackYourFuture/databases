const util = require('util');
const connection = require('./dbConfig.js');

const execQuery = util.promisify(connection.query.bind(connection));

async function initDatabase() {
  connection.connect();

  try {


    await execQuery(`
    CREATE TABLE IF NOT EXISTS _account(
      account_number INT PRIMARY KEY,
        balance DECIMAL
    );`);

    await execQuery(`
    CREATE TABLE IF NOT EXISTS account_changes(
      change_number INT PRIMARY KEY AUTO_INCREMENT, 
        account_number INT NUT NULL, 
        amount DECIMAL NOT NULL,
        changed_date DATE, 
        remark VARCHAR(400),
        FOREIGN KEY (account_number)
          REFERENCES _account(account_number)
    );`);

  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

initDatabase();
