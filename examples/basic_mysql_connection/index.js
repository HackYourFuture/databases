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
<<<<<<< HEAD
			'SELECT * FROM todos WHERE Name like "%databases%"',
			'INSERT INTO todos (Name,Done) VALUES ("go climbing",0)',
			'UPDATE todos SET Due="2017-9-10" WHERE Name="repair my bike"',
			'UPDATE todos SET Done=1 WHERE Name="repair my bike"',
			'DELETE FROM todos WHERE Name="go climbing"'
			]

let mySql = sql.map(function(value) {

connection.query('SELECT * FROM todos', function (error, results, fields) {
    console.log(results);
	});
})
connection.end();
=======
			'SELECT * FROM todos WHERE Name like "%databases%"'
			]
let mySql = sql.map(function(value) {
	connection.query('SELECT * FROM todos', function (error, results, fields) {
    console.log(results);
	});
})
connection.end();
>>>>>>> ae33bbd9e3be04ba52f6bc3ac316c56091916066
