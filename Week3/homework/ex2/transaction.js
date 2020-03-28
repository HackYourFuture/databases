const mySql = require('mysql');
const util = require('util');

const connection = mySql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'week3'
});

const execQuery = util.promisify(connection.query.bind(connection))

async function transactionsData(amount, accountFrom, accountTo) {
    const autoCommit = `set autocommit = 0;`;
    const transaction = `start transaction;`;
    const rollback = `rollback;`;
    const commit = `commit;`;

    const transAmount = `UPDATE account SET balance = balance - ${amount} WHERE account_number = ${accountFrom}`;
    const transFrom = `UPDATE account SET balance = balance + ${amount} WHERE account_number = ${accountTo}`;
    const transChange = `insert INTO account_changes value(1, ${accountFrom}, ${amount},'2020-03-28','yes')`;

    connection.connect();
    try {

        await execQuery(autoCommit);
        await execQuery(transaction);
        await execQuery(transAmount);
        const remainingMoney = await execQuery(`select balance from account where account_number = ${accountFrom}`);

        if (remainingMoney[0].balance < amount) {
            await execQuery(`rollback`);
            return;
        }

        await execQuery(transFrom);
        await execQuery(transChange);
        await execQuery(commit);

    } catch (err) {

        execQuery(rollback);
        console.log('there is a error', err);

    }
    connection.end();
}

transactionsData(1001, 101, 102);  