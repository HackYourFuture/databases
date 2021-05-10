const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  Database: "world",
  port: 3306,
});
connection.connect();

const select_query = [
  "SELECT name FROM country WHERE population > 8000000",
  "SELECT name FROM country WHERE name LIKE 'land%'",
  "SELECT name FROM city WHERE population between 50000 and  1000000",
  "SELECT name FROM country WHERE name LIKE 'EUROPE'",
  "SELECT name, surfaceArea FROM country ORDER BY surfaceArea DESC  ",
  "SELECT name FROM city WHERE countryCode = 'NLD'",
  "SELECT population FROM city  WHERE name = Rotterdam",
  "SELECT name, population FROM city ORDER BY population DESC LIMIT 10",
  "SELECT name FROM city ORDER BY population DESC LIMIT 10",
  "SELECT SUM(population) FROM  country",
];
for (let i in select_query) {
  connection.query(select_query[i], (error, results, fields) => {
    if (error) {
      throw error;
    }
    console.log("the result is ", results);
  });
}
connection.end();
