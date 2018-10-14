const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_app2',
};
const pool = mysql.createPool(config);

module.exports = pool;
