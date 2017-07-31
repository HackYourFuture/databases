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
let query=['select count(*) as items from todos',
           'select *  from todos where done',
           'select *  from todos where !done',
					 'select *  from todos order by due DESC',
					 'select * from todos where due=(select max(due) from todos)',
					 'select * from todos where name like "%homework%"'
				  ]
let sql = query.map(function(i) {
  connection.query(i, function(error, results, fields) {
    console.log(results);
  });


})
connection.end();
