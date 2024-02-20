var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'world'
});


const queries = [
    { description: "Countries with population greater than 8 million", query: "SELECT name, population FROM country WHERE population > 8000000" },
    { description: "Countries that have 'land' in their names", query: "SELECT name FROM country WHERE name LIKE '%land%'" },
    { description: "Cities with population in between 500,000 and 1 million", query: "SELECT name, population FROM city WHERE population BETWEEN 500000 AND 1000000" },
    { description: "Countries on the continent Europe", query: "SELECT name FROM country WHERE continent = 'Europe'" },
    { description: "Countries in the descending order of their surface areas", query: "SELECT name, surfacearea FROM country ORDER BY surfacearea DESC" },
    { description: "Names of all the cities in the Netherlands", query: "SELECT name FROM city WHERE countrycode = 'NLD'" },
    { description: "Population of Rotterdam", query: "SELECT population FROM city WHERE name = 'Rotterdam'" },
    { description: "Top 10 countries by Surface Area", query: "SELECT name, surfacearea FROM country ORDER BY surfacearea DESC LIMIT 10" },
    { description: "Top 10 most populated cities", query: "SELECT name, population FROM city ORDER BY population DESC LIMIT 10" },
    { description: "Population number of the world", query: "SELECT SUM(population) AS 'Total world population' FROM country" }
  ];

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL server.');
    
    queries.forEach(({ description, query }, index) => {
        connection.query(query, (error, results, fields) => {
          if (error) {
            throw error;
          }
          console.log(`-------- ${description} ---------`);
          console.log(results);
        });
      });
    
    connection.end();
  });



