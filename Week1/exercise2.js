var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'world'
});

connection.connect();



const queries = [
  'SELECT name FROM country WHERE population > 8000000;',
  'SELECT name FROM country WHERE name LIKE "%land%";',
  'SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000;',
  'SELECT name FROM country WHERE continent LIKE "Europe";',
  'SELECT * FROM country ORDER BY surfaceArea DESC;',
  'SELECT name FROM city WHERE CountryCode LIKE "NLD";',
  'SELECT population FROM city WHERE name LIKE "Rotterdam";',
  'SELECT name FROM country ORDER BY surfaceArea DESC LIMIT 10;',
  'SELECT name FROM city ORDER BY population DESC LIMIT 10;',
  'SELECT SUM(population) AS "population_number_of_the_world" FROM country'  
];

for(const query of queries){
  connection.query(query, function (error, results, fields) {
    if (error) {
        throw error;
    }
    for (i in results) {
        console.log(results[i]);
    }
  });
}


connection.end();
