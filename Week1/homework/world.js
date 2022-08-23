const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

connection.connect();
const answerQueries = [
  "select name from country where population>8000000",
  "select name from country where name like '%land%'",
  "select name from city where population between 500000 and 1000000",
  "select name from country where Continent='europe'",
  "select name from country order by SurfaceArea desc",
  "select name from city where CountryCode= 'NLD'",
  "select population from city where name ='Rotterdam'",
  "select name from country order by SurfaceArea desc limit 10",
  "select name from city order by population desc limit 10",
  "select sum(population) from country",
];

const runQuery = (query) => {
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.table(result);
  });
};

answerQueries.forEach((query) => {
  runQuery(query);
});

connection.end();
