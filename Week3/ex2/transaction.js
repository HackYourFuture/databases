const util = require('util');
const connection = require('./dbConfig.js');

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();

  try {
    await execQuery("START TRANSACTION");
    const change = {
      account_number: 101,
      amount: -900,
      date: 'now()',
      remark: "Holiday allowance"
    }
    // await execQuery('UPDATE _accounts SET balance = balance + WHERE ?', [change.account_number, change.amount]);    
    // await execQuery('INSERT INTO account_changes SET ?', );
    // change.account_number = 102;
    // change.amount = 900;
    // await execQuery('UPDATE _accounts SET balance = balance + WHERE ?', [change.account_number, change.amount]);
    // await execQuery('INSERT INTO account_changes SET ?', );
    // await execQuery("COMMIT");
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
    connection.end();
  }

  connection.end();
}

seedDatabase();
