module.exports = function (id) {
    const fs = require('fs');
    const mysql = require('mysql');
    const config = JSON.parse(fs.readFileSync("config-secret.json"))
    const connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
        database: config.database
    });
    connection.connect();
    connection.query(
        `delete from todos where Id = ?`, [id],
        function (error, results, fields) {
            if (error) {
                console.error(error);
            }
            else {
                console.log(results);
            }
        }
    );
    connection.end();
};