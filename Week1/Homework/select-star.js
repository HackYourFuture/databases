var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

connection.connect();

var select_queries = [
  'select Country.name from Country where Country.population >= 8000000 order by name ASC',
  "select Country.name from Country where Country.name like '%land%' order by name ASC",
  'select City.name from City where population >= 500000 and population<=1000000',
  'select Country.name from Country inner join continent on Country.continentID = continent.Id order by Country.name ASC',
  'select Country.name from Country order by service_area DESC',
  "select City.name from City inner join Country on City.countryID = Country.Id where Country.name = 'Netherlands' order by City.name ASc",
  "select City.population from City where City.name='Roterdam'",
  'select Country.name from Country order by Country.service_area ASc limit 10',
  'select City.name from City order by City.population limit 10',
  'select sum(City.population)from City',
];

for (const select_query of select_queries) {
  connection.query(select_query, function(error, results, fields) {
    if (error) {
      throw error;
    }
    console.log('Going to run ', select_query);
    console.log('-------------------------------------------------------------');
    for (i in results) {
      console.log(results[i]);
    }
    console.log('-------------------------------------------------------------');
  });
}
connection.end();
