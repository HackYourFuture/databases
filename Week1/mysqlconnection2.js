// Read the docs at https://www.npmjs.com/package/mysql.
let mysql = require("mysql")

connection = mysql.createConnection({
    host     : '142.93.226.239',
    user     : 'daniel',
    password : 'the-password',
    database : 'new_world',
});

connection.connect()

connection.query(
    'SELECT * FROM country WHERE population > 1000000 AND Continent IN ("Europe", "Africa") LIMIT 2',
    function (error, results, fields) {
	if (error) throw error;

	for (const row of results) {
            console.log(row.Name)
	}
    })

connection.end()
