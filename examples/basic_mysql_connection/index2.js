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


const sqlStatments=[
				'INSERT INTO todos (Name, Done) VALUES ("Odai",1)',
				'UPDATE todos SET Name = "Odai" WHERE Id=20',
				`UPDATE todos SET StatusId=(select Id FROM statuses WHERE Name='odai') WHERE Id=20`, 
				'DELETE FROM todos WHERE Name="odai"',
]


let sql = sqlStatment.map(function(value) {
  connection.query(value, function(error, results, fields) {
    console.log(results);
  });


})
connection.end();
