var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: '7566',
  database: 'world'
});

connection.connect();

const select_query = [
  `SELECT name FROM country WHERE population >= 8000000;`,
  `SELECT name FROM country WHERE name LIKE '%land%'`,
  `SELECT name, population FROM city WHERE population BETWEEN 500000 AND 1000000`,
  `SELECT name FROM country WHERE continent LIKE '%Europe%'`,
  `SELECT name FROM country ORDER BY surface_area_km2 DESC`
];

for (let i of select_query) {
  connection.query(i, function(error, results, fields) {
    if (error) {
      throw error;
    }
    console.log('Going to run ', i);

    for (i of results) {
      // Below line might look like a hacky solution but i couldn't find another one
      // to get rid of 'RowDataPacket' :)
      console.log(JSON.parse(JSON.stringify(i)));
    }
  });
}

connection.end();
