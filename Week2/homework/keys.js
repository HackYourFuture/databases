
const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword"
});


const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {

    const CREATE_DATABASE = 'CREATE DATABASE IF NOT EXISTS homework_database';
    const USE_DATABASE = `USE homework_database`;

    const CREATE_AUTHORS_TABLE = `
    CREATE TABLE IF NOT EXISTS authors (
        author_no INT PRIMARY KEY,
        author_name VARCHAR(50),
        university VARCHAR(50),
        date_of_birth DATE,
        h_index INT,
        gender ENUM("m", "f")
    );`;

    const ADD_COLUMN_AUTHORS = 'ALTER TABLE authors ADD COLUMN friend int';

    const ADD_FOREIGNKEY_TABLE = `
    ALTER TABLE authors ADD CONSTRAINT FK_Authors  FOREIGN KEY (friend) REFERENCES authors(author_no);
	`;

    connection.connect();

    try {
        await Promise.all[execQuery(CREATE_DATABASE), execQuery(USE_DATABASE), execQuery(CREATE_AUTHORS_TABLE), execQuery(ADD_COLUMN_AUTHORS),
            execQuery(ADD_FOREIGNKEY_TABLE)];

    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();
}

seedDatabase();

