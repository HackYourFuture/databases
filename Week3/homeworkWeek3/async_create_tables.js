const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'todoapp'
});

const execQuery = util.promisify(connection.query.bind(connection));

async function createTables() {
    const CREATE_USER_TABLE = `
    CREATE TABLE IF NOT EXISTS user(
    id INT NOT NULL AUTO_INCREMENT primary key,
    user_name VARCHAR(50)
    );`;
    const CREATE_TODO_TABLE = `
    CREATE TABLE IF NOT EXISTS todo(
    id INT NOT NULL AUTO_INCREMENT primary key,
    todo_name VARCHAR(50),
    user_id INT NOT NULL
    );`;
    
    const CREATE_ITEMS_TABLE = `
    
    CREATE TABLE IF NOT EXISTS items (
    id INT NOT NULL AUTO_INCREMENT PRIMARY
    KEY,
    item_disc VARCHAR(50) NOT NULL,
    todo_id INT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT FALSE
    );`;
    const CREATE_REMINDER_TABLE = `
    CREATE TABLE IF NOT EXISTS reminder(
    id INT NOT NULL AUTO_INCREMENT PRIMARY
    KEY,
    todo_id INT NOT NULL,
    time_reminder DATETIME
    );`;
    
    try {
            await execQuery(CREATE_USER_TABLE);
            await execQuery(CREATE_TODO_TABLE);
            await execQuery(CREATE_ITEMS_TABLE);
            await execQuery(CREATE_REMINDER_TABLE);
        } catch (error) {
            console.error(error);
        }
}

createTables();

module.exports = {
    connection: connection,
    execQuery: execQuery,
};