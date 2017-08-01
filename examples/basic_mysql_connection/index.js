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
const sqlStatments=['SELECT COUNT(*) as "Total No of Todos" FROM todos',
					'SELECT * FROM todos WHERE Done',
					'SELECT * FROM todos WHERE !Done',	
					'SELECT * FROM todos GROUP BY Id DESC',
					'SELECT * FROM todos  ORDER BY id DESC LIMIT 1',
					'SELECT * FROM todos WHERE Name like "%databases%"',

				  ]
let sql = sqlStatments.map(function(value) {
  connection.query(value, function(error, results, fields) {
    console.log(results);
	console.log("=========================================================");
  });


})
connection.end();