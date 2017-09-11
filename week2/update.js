module.exports = function (id, {done, name, statusId, due}) {
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
    let comma = false;
    let queryBody = "update todos set ";
    let arrayOfValues = [];
    if (done) {
        if (comma) {
            queryBody += ", ";
        }
        queryBody += "Done = ?";
        comma = true;
        arrayOfValues.push(done);
    }
    if (name) {
        if (comma) {
            queryBody += ", ";
        }
        queryBody += "Name = ?";
        comma = true;
        arrayOfValues.push(name);
    }
    if (statusId) {
        if (comma) {
            queryBody += ", ";
        }
        queryBody += "StatusId = ?";
        comma = true;
        arrayOfValues.push(statusId);
    }
    if (due) {
        if (comma) {
            queryBody += ", ";
        }
        queryBody += "Due = ?";
        comma = true;
        arrayOfValues.push(due);
    }
    queryBody += " where Id = ?";
    arrayOfValues.push(id);
    connection.connect();
    connection.query(queryBody, arrayOfValues, function (error, results, fields) {
        if (error) {
            console.error(error);
        }
        else {
            console.log(results);
        }
    });
    connection.end();
};