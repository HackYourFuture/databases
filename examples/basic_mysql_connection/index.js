var fs = require('fs');
var mysql = require('mysql');

console.log("\n\n--<( ToDo App )>--\n\n");

var config = JSON.parse(fs.readFileSync("config-secret.json"))
var connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	port: config.port,
    database: config.database
});

connection.connect();

//Get the name and due date of all todo items about 'databases'
const input = `New Namffdhfuidhfjksdhkfsdfhjksdhfksdhe`

connection.query(`
	insert into
		todos
			(Name)
		values
			(?)`,
		[input],
	function (error, results, fields) {
		if (error) {
			console.error(error);
		}
		else {
			console.log(results);
		}
    
});
connection.query(`select * from todos`, function(error,results) {
	if(error) {
		console.error(error);
	}
	else {
		console.log(results);
	}
});

connection.end();