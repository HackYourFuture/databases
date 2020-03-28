const util = require("util");
const mysql = require("mysql");
const fs = require("fs");


const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "week3"
});

const execQuery = util.promisify(connection.query.bind(connection));
const readFile = util.promisify(fs.readFile);



async function seedDatabase() {


    connection.connect();

    try {

        const accounData = await readFile(__dirname + "/account.json", "utf8");
        const accounts = await JSON.parse(accounData);

        await Promise.all(
            accounts.map(account => {
                execQuery(`INSERT INTO account SET ?`, account)
            })
        );

        const accountChangesData = await readFile(__dirname + "/accountChanges.json", "utf8");
        const accountChanges = await JSON.parse(accountChangesData);

        await Promise.all(
            accountChanges.map(accountChange => {
                execQuery(`INSERT INTO account_changes SET ?`, accountChange)
            })
        );

    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();

}
seedDatabase();
