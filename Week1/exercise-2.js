const MySQL = require('mysql');

const connection = MySQL.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const query = [
'USE world;',
'SELECT name FROM country where population > 8000000;',
'SELECT name FROM country where name LIKE "%land%";',
'SELECT name FROM city WHERE population BETWEEN 500000 and 1000000;',
'SELECT name FROM country WHERE Continent = "Europe";',
'SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC;',
'SELECT name FROM city WHERE countrycode = "NLD";',
'SELECT name, population FROM city WHERE name = "Rotterdam";',
'SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;',
'SELECT name, population FROM city ORDER BY population DESC LIMIT 10;',
'SELECT sum(population) FROM country;',
]

const selectingQuery = query => {
  connection.query(query, (err, res) => {
    err ? console.log(err) : console.log(res, 'Database used');
  });
};

query.forEach(query => selectingQuery(query))

connection.end();
