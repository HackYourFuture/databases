const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'ammar_week3_database',
});

// Promisify the bind function of query function of connection object
// Pass connection object (because bind expects "this")
// Afterwards execQuery will work as a function that returns a promise but
// we don't have to call "then" over that promise
const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
    const accounts = [
        {
        account_number: 101,
        balance: 1500,
        },
        {
        account_number: 102,
        balance: 256,
        },
        {
        account_number: 103,
        balance: 8000,
        },
      ];
      const accounts_change = [
        {
            change_number: 001,
            account_number: 115,
            amount: 500,
            changed_date: '2010-05-05',
            remark: 'just some filling'
        },
        {
            change_number: 003,
            account_number: 116,
            amount: 100,
            changed_date: '2016-07-05' ,
            remark: 'just some filling'
        },
      ];

  connection.connect();

  try {
    // call the function that returns promise
      accounts.forEach(async account => {
        await execQuery('INSERT INTO account SET ?', account);
      });
      accounts_change.forEach(async account_change => {
        await execQuery('INSERT INTO account_change SET ?', account_change);
      });
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
