const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql');

const app = express();
const port = 3000;

const config = JSON.parse(fs.readFileSync('config-secret.json'));

const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  port: config.port,
  database: config.database
});

connection.connect(err => { if (err) throw err; });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', (req, res, next) => {
	console.log(req.body);

	// Bad (vulnerable to injection)
	// Try this in the email field: "foo@example.com' OR 1 = 1; -- "
	// Will result in this query: "SELECT * FROM users WHERE email = 'foo@example.com' OR 1 = 1; -- ' AND password = ''"
	connection.query(`SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`, (err, result, fields) => {
		if (err) {
			next(err);
			return;
		}

		if (result && result.length == 1) {
			console.log(result[0]);
			res.redirect('/secret.html');
			return;
		}
		res.redirect('/wrong.html');
	});

	// Good (uses implicit escaping to avoid SQL injections)
	// connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [
	// 	req.body.email,
	// 	req.body.password,
	// ], (err, result, fields) => {
	// 	if (err) {
	// 		next(err);
	// 		return;
	// 	}

	// 	if (result && result.length == 1) {
	// 		console.log(result[0]);
	// 		res.redirect('/secret.html');
	// 		return;
	// 	}
	// 	res.redirect('/wrong.html');
	// });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
