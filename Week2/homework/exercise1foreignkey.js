// Read the docs at https://www.npmjs.com/package/mysql.
let mysql = require("mysql")

connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'daniel',
    password : '',
    database : 'exercises',
});

connection.connect()

connection.query(
    'ALTER TABLE `collaborators` ADD FOREIGN KEY (`author_id`) REFERENCES `authors`(`author_no`) ON DELETE RESTRICT ON UPDATE RESTRICT;',
    function (error, results, fields) {
	if (error) throw error;

	for (const row of results) {
            console.log(row.Name)
	}
    })

connection.end()



