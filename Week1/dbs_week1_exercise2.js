var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'P@ssw0rd',
  database: 'world'
});

// What are the names of countries with population greater than 8 million?
connection.query('select Name from country where population > ?;',[8000000], (err, result, fields) => {
  if (err) {
    console.error(err);
  } else {

    for (var i = 0; i < result.length; i++) {
      console.log(result[i].Name);
    }
  }

  console.log('------------------------------------------------');
});

// What are the names of countries that have “land” in their names?
connection.query('select Name from country where Name like ?;',['%land%'],
(err, result, fields) => {
  if (err) console.log(err);
  else {
    for (var i = 0; i < result.length; i++) {
      console.log(result[i].Name);
    }
  }
  console.log('------------------------------------------------');
});

// What are the names of the cities with population in between 500,000 and 1 million?

connection.query('select Name from city where population >= ? and population <= ?;',[500000,1000000],
(err, result, fields) => {
  if (err) console.log(err);
  else {
    for (var i = 0; i < result.length; i++) {
      console.log(result[i].Name);
    }
  }
  console.log('------------------------------------------------');
});

// What's the name of all the countries on the continent ‘Europe’?

connection.query('select Name from country where continent = ?',['Europe'],
(err, result, fields) => {
  if (err) console.log(err);
  else {
    for (var i = 0; i < result.length; i++) {
      console.log(result[i].Name);
    }
  }
  console.log('------------------------------------------------');
});

// List all the countries in the descending order of their surface areas.

connection.query('select Name from country order by SurfaceArea DESC;', (err, result, fields) => {
  if (err) console.log(err);
  else {
    for (var i = 0; i < result.length; i++) {
      console.log(result[i].Name);
    }
  }
  console.log('------------------------------------------------');
});

// What are the names of all the cities in the Netherlands?
connection.query('select Name from city where CountryCode = (select Code from country where Name = ?);',['Netherlands'], (err, result, fields) => {
  if (err) console.log(err);
  else {
    for (var i = 0; i < result.length; i++) {
      console.log(result[i].Name);
    }
  }
  console.log('------------------------------------------------');
});

// What is the population of Rotterdam?
connection.query('select population from city where Name = ?;',['Rotterdam'], (err, result, fields) => {
  if (err) console.log(err);
  else {
    console.log(result[0].population);
  }
  console.log('------------------------------------------------');
});
// What's the top 10 countries by Surface Area?
connection.query('select Name from country order by SurfaceArea DESC LIMIT 10;',(err, result, fields) => {
  if (err) console.log(err);
  else {
    for (var i = 0; i < result.length; i++) {
      console.log(result[i].Name);
    }
  }
  console.log('------------------------------------------------');
});

// What's the top 10 most populated cities?
connection.query('select Name from city order by population DESC limit 10;',(err, result, fields) => {
  if (err) console.log(err);
  else {
    for (var i = 0; i < result.length; i++) {
      console.log(result[i].Name);
    }
  }
  console.log('------------------------------------------------');
});
// What is the population number of the world?
connection.query('select sum(population) as  world_population from country;',(err, result, fields) => {
  if (err) console.log(err);
  else {
    console.log('world population = '+result[0].world_population);
  }
  console.log('------------------------------------------------');
});

connection.end();