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
//my input

const input= "New Name";
connection.query(`
	INSERT INTO
		todos
		(
			Name
		)
		VALUES(
			?
		)
`,
[
	input
],
function (error, results){
	if(error) {
		//Handel error
		console.log(error);
	}else{
		//Process results
		console.log(results);
	}
}
);

connection.query('SELECT * FROM todos', function (error, results, fields) {
	console.log(results);
	if (error) console.log(error);
});

connection.end();