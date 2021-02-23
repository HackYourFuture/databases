const mysql = require('mysql');



const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'world',
  port : 3306
});


connection.connect(err => {
  if (err) throw err;
  console.log(" DB world IS connected..");
});


var select_query = [
  "SELECT Name FROM country WHERE Population > 8000000",
  "SELECT Name FROM country WHERE Name LIKE '%land%'",
  "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000",
  "SELECT Name FROM country WHERE Continent like 'Europe'",
  "SELECT * FROM country ORDER BY SurfaceArea DESC",
  "SELECT Name FROM city WHERE CountryCode like 'NLD'",
  "SELECT Population FROM city WHERE Name like 'Rotterdam'",
  "SELECT Name From country ORDER BY SurfaceArea DESC LIMIT 10",
  "SELECT Name From city ORDER BY Population DESC LIMIT 10",
  "SELECT SUM(Population) From country"
];

select_query.map(query =>{

  connection.query(query, function (error, results, fields) {
      if (error) {
          throw error;
      }
      for (i in results) {
          console.log(results[i]);
      };
  });
});

connection.end();