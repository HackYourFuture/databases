const util = require('util');
const connection = require('./dbConfig.js');
const { accounts, changes} = require('./data.js');
const { exit } = require('process');

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();

  try {

    accounts.forEach(async account => {
        await execQuery(`INSERT INTO _account SET ?`, account);
    });

    changes.forEach(async change => {
      await execQuery("START TRANSACTION");
      await execQuery("UPDATE _account SET balance = balance + ? WHERE account_number = ?", 
      [change.amount, change.account_number]);
      //await execQuery(`INSERT INTO account_changes(account_number, amount, change_date, remark) VALUES ?`, change);
      await execQuery("COMMIT");
    });
    
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
    connection.end();
  }

  connection.end();
}

seedDatabase();
