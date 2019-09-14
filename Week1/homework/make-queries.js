const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
  multipleStatements: true,
});

connection.connect();

const sqlCommand = `
SELECT name,population FROM country WHERE population > 8000000;

SELECT name FROM country WHERE name LIKE '%land%';

SELECT name,population FROM city WHERE population BETWEEN 500000 AND 1000000;

SELECT name,region FROM country WHERE continent='Europe';

SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC;

SELECT name FROM city WHERE CountryCode='NLD';

SELECT population FROM city WHERE name='Rotterdam';

SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;

SELECT name, population FROM city ORDER BY population DESC LIMIT 10;

SELECT SUM(population) FROM country;
`;

connection.query(sqlCommand, (err, result, fields) => {
  if (err) console.log(err.message);
  console.log(Object.values(result));
});

connection.end();
