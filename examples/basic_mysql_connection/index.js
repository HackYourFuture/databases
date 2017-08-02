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
let sql = ['SELECT COUNT(*) as todo-Items FROM todos',
			'SELECT * FROM todos where done',
			'SELECT * FROM todos where !done',
			'SELECT * FROM todos ORDER BY Id DESC',
			'SELECT * FROM todos ORDER BY Id DESC LIMIT 1',
			'SELECT * FROM todos WHERE Name like "%databases%"'
			]

let mySql = sql.map(function(value) {

connection.query('SELECT * FROM todos', function (error, results, fields) {
    console.log(results);
	});
})
connection.end();
