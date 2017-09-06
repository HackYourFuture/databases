var fs = require('fs');
var mysql = require('mysql');
var prompt = require('prompt');

var config = JSON.parse(fs.readFileSync("config-secret.json"))

var connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	port: config.port,
    database: config.database
});

connection.connect();

const options = process.argv.slice(2);

switch(options[0]){
	case 'add':
		addNewEntry();
		break;
	case 'list':
		listTodos();
		break;
	default:
		console.log('No Entry');
}

function addNewEntry(){
	
	var ItemsToAdd=[];
	prompt.start();
	prompt.get(['Name', 'Due'], function (err, result) {
		ItemsToAdd = [result.Name, result.Due];
		console.log(ItemsToAdd);
		addQurey(ItemsToAdd);
	  });

	function addQurey(addItems){
		console.log(addItems);
		connection.query(`
			INSERT INTO
				todos
				(
					Name,
					Due
				)
				VALUES(
					?,
					?
				)
			`,
			[
				addItems[0],
				addItems[1]
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
			
		)

	};
	connection.end();
};
function listTodos(){
	
	console.log('Done', options[1]);
	connection.query(`
		SELECT * FROM
			todos
			`,
	
	function (error, results){
		if(error) {
			//Handel error
			console.log(error);
		}else{
			//Process results
			console.log(results);
			
		}
	}
	
)
connection.end();
};

// connection.query(`SELECT * FROM todos`,function (error, results) {
// 	if (error) {
// 		console.log(error);
// 	} else {
// 		console.log(results);
// 	}
// } )




