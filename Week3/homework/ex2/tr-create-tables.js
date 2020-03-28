const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "week3"
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {

    const createAccount = `
    CREATE TABLE IF NOT EXISTS account(
    account_number INT PRIMARY KEY,
    balance int
    );`;

    const createAccountChanges = `
    CREATE TABLE IF NOT EXISTS account_changes(
    change_number INT PRIMARY KEY,
    account_number INT,
    amount INT,
    changed_date DATE,
    remark varchar(50)
    ); `;

    connection.connect();

    try {
        await Promise.all[execQuery(createAccount), execQuery(createAccountChanges)];

    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();

}
seedDatabase();
