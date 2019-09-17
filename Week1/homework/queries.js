const mySQL = require('mysql');
const connection = mySQL.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'myWorld',
});

const queries = [
  `select name from country where population > 8000000;`,
  `select name from country where name like '%land%';`,
  `select name from city where population > 50000 or population < 1000000;`,
  `select name from country where continent= 'Europe';`,
  `select name from country order by Surface_Area desc;`,
];

connection.connect();
for (let i = 0; i < queries.length; i++) {
  connection.query(queries[i], function(error, results, field) {
    if (error) {
      throw error;
    }
    console.log('Your result is ' + JSON.stringify(results));
  });
}
connection.end();
