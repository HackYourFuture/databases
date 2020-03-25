const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'ammar_week3_database',
});

const amount = 1000; 
const sourceAccount = 101;
const recipientAccount = 102; 
const date = new Date; 
let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();


// Promisify the bind function of query function of connection object
// Pass connection object (because bind expects "this")
// Afterwards execQuery will work as a function that returns a promise but
// we don't have to call "then" over that promise
const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
    const transaction_queries = [
        'set autocommit = 0 ',
        'start transaction;',
//Get the latest transaction number
'SELECT @transaction_number:=MAX(change_number)+1 FROM account_change;',
//insert the transaction in the account_change table
`INSERT INTO account_change(
    change_number,
    account_number,
    amount,
    changed_date,
    remark)
VALUES(
    @transaction_number,
    ${sourceAccount},
    ${amount},
    '${formatted_date}',
    'From ${sourceAccount} to ${recipientAccount}');`, 
//update the accounts
`UPDATE account SET 
balance = balance +${amount}
WHERE account_number = ${recipientAccount};
`, 
`UPDATE account SET 
balance = balance -${amount}
WHERE account_number = ${sourceAccount};`,
//commit changes  
'COMMIT;'
    ]

  connection.connect();

  try {
    // call the function that returns promise
    transaction_queries.forEach(async query => {
        await execQuery(query);
      });
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
