const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'new_world',
    multipleStatements: true
});

connection.connect();


function getPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn

    connection.query(
        `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = ${code};`,

        function (err, result) {
            if (err) cb(err);
            if (result.length == 0) cb(new Error("Not found"));
            cb(null, result[0].Population);
        }
    );
    connection.end();
}

//Rewrite the function so that it is no longer vulnerable to SQL injection

connection.connect();

function getPopulationProtected(Country, name, cb) {
    // assuming that connection to the database is established and stored as conn

    connection.query(
        `SELECT Population FROM ${Country} WHERE Name =` + connection.escape(name),
        function (err, result) {
            if (err) cb(err);
            if (result.length == 0) cb(new Error("Not found"));
            cb(null, result[0].Population);
        }
    );
    connection.end();
}


getPopulation("country", "Turkey", '1=1', (err, result) => {
    if (err) console.error(err.message);
    else console.log("Result: ", result);
});

//calling the function that it is no longer vulnerable to SQL injection


getPopulationProtected("country", "Turkey", (err, result) => {
    if (err) console.error(err.message);
    else console.log("Result: ", result);
});


