var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

connection.connect();
var insert_queries = [
  "insert into continent(name) values ('Europe')",
  "insert into continent (name) values ('Asia')",
  "insert into continent (name) values ('South America')",
  "insert into continent (name) values ('North America')",
  "insert into continent (name) values ('Africa')",
  "insert into continent (name) values ('Autralia')",
  "insert into continent (name) values ('Kenorland')",
  "insert into Country(name, population, service_area, continentID) values ('Netherlands', 17000000, 41543,1)",
  "insert into Country(name, population, service_area, continentID) values ('France', 67348000, 547030,1)",
  "insert into Country(name, population, service_area, continentID) values ('Germany', 82800000, 357168,1)",
  "insert into Country(name, population, service_area, continentID) values ('Norway', 5295619, 385203,1)",
  "insert into Country(name, population, service_area, continentID) values ('Sweden', 10151588, 450295,1)",
  "insert into Country(name, population, service_area, continentID) values ('Switzerland', 8401120, 41285,1)",
  "insert into Country(name, population, service_area, continentID) values ('Turkey', 80810525, 783356	,1)",
  "insert into City (name, population, countryID) values('Utrecht','345000',1)",
  "insert into City (name, population, countryID) values('Amersfort','155000',1)",
  "insert into City (name, population, countryID) values('Nieuwegein','62235',1)",
  "insert into City (name, population, countryID) values('Amsterdam','854000',1)",
  "insert into City (name, population, countryID) values('The Hague','657894',1)",
  "insert into City (name, population, countryID) values('Roterdam','635000',1)",
];

for (var insert_query of insert_queries) {
  console.log('Going to run ', insert_query);
  connection.query(insert_query, function(error, results, fields) {
    if (error) {
      throw error;
    }
    console.log('the reply is ', results[0]);
  });
}
connection.end();
