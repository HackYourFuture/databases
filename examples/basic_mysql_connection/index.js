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
let query=['SELECT COUNT(*) as items FROM todos',
           'SELECT * FROM todos WHERE done',
           'SELECT * FROM todos WHERE !done',
					 'SELECT * FROM todos GROUP BY DUE DESC',
					 'SELECT * FROM todos  ORDER BY id DESC LIMIT 1',
					 'SELECT * FROM todos WHERE Name LIKE "%databases%"'
				  ]
let sql = query.map(function(i) {
  connection.query(i, function(error, results, fields) {
    console.log(results);
  });


})
connection.end();
