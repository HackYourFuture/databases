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
let query=['INSERT INTO todos(id,done) VALUES '+mysql.escape(18,0),
           'UPDATE todos SET name="ali",due="2019-08-31" WHERE id='+mysql.escape(5),
           'DELETE FROM todos WHERE NAME='+mysql.escape("ali"),
					 'UPDATE todos SET done=1 where id='+mysql.escape(9),
					 'SELECT * FROM todos'

				  ]
let sql = query.map(function(i) {
  connection.query(i, function(error, results, fields) {
    console.log(results);
  });


})
connection.end();
