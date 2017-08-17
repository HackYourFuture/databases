var fs = require('fs');
var mysql = require('mysql');

var config = JSON.parse(fs.readFileSync("config-secret.json"))

var connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	port: config.port,
    database: config.database
});

connection.connect();

var userInput = 'do your task';
var sql = [
		'INSERT INTO todos (name,due) VALUES(' + mysql.escape(userInput) + ', "2017-8-8")',
		'UPDATE todos SET done= 1   WHERE name= ' + mysql.escape(userInput),
		'UPDATE todos SET StatusId= 3   WHERE name= ' + mysql.escape(userInput),
		'DELETe FROM todos WHERE name=' + mysql.escape(userInput)
	];

let query = sql.map(
	 (i)=> {
		connection.query(i, function (error, results, fields) {
								console.log(results);
							}
		);


	}
)

connection.end();
