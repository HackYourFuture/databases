var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'world',
});

connection.connect();
// 1. What are the names of countries with population greater than 8 million
connection.query('SELECT name FROM countries WHERE population > 8000000', function (
  error,
  results,
  fields
) {
  if (error) {
    throw error;
  }
  if (results) {
    console.log('the names of countries with population greater than 8 million are:');
    for (value of results) {
      console.log(value.name);
    }
  }
});

// 2. What are the names of countries that have “land” in their names ?
connection.query('SELECT name FROM countries WHERE name LIKE "%land%"', function (
  error,
  results,
  fields
) {
  if (error) {
    throw error;
  }
  if (results) {
    console.log('the names of countries that have “land” in their names are:');
    for (value of results) {
      console.log(value.name);
    }
  }
});

// 3. What are the names of the cities with population in between 500,000 and 1 million ?
connection.query(
  'SELECT city_name FROM cities WHERE population BETWEEN 500000 AND 1000000',
  function (error, results, fields) {
    if (error) {
      throw error;
    }
    if (results) {
      console.log('the names of the cities with population in between 500,000 and 1 million are:');
      for (value of results) {
        console.log(value.city_name);
      }
    }
  }
);

// 4. What's the name of all the countries on the continent ‘Europe’ ?
connection.query('SELECT name FROM countries WHERE region = "Europe"', function (
  error,
  results,
  fields
) {
  if (error) {
    throw error;
  }
  if (results) {
    console.log('the name of all the countries on the continent ‘Europe’ are:');
    for (value of results) {
      console.log(value.name);
    }
  }
});

// 5. List all the countries in the descending order of their surface areas.
connection.query('SELECT * FROM countries ORDER BY area DESC ', function (error, results, fields) {
  if (error) {
    throw error;
  }
  if (results) {
    console.log('List all the countries :');
    for (value of results) {
      console.log(`${value.name} has ${value.area}`);
    }
  }
});

// 6. What are the names of all the cities in the Netherlands?
connection.query('SELECT city_name FROM cities WHERE country = "Netherlands"', function (
  error,
  results,
  fields
) {
  if (error) {
    throw error;
  }
  if (results) {
    console.log('the names of all the cities in the Netherlands are:');
    for (value of results) {
      console.log(`${value.city_name}`);
    }
  }
});

// 7. What is the population of Rotterdam ?
connection.query('SELECT * FROM cities WHERE city_name = "Rotterdam"', function (
  error,
  results,
  fields
) {
  if (error) {
    throw error;
  }
  if (results) {
    console.log('the population of Rotterdam is:');
    for (value of results) {
      console.log(`${value.population}`);
    }
  }
});

// 8. What's the top 10 countries by Surface Area ?
connection.query('SELECT * FROM countries ORDER BY area DESC', function (error, results, fields) {
  if (error) {
    throw error;
  }
  if (results) {
    console.log('top 10 countries by Surface Area');
    for (value of results) {
      console.log(`${value.name}`);
    }
  }
});

// 9. What's the top 10 most populated cities?
connection.query('SELECT * FROM cities ORDER BY population DESC LIMIT 10', function (
  error,
  results,
  fields
) {
  if (error) {
    throw error;
  }
  if (results) {
    console.log('the top 10 most populated cities');
    for (value of results) {
      console.log(`${value.city_name} has ${value.population}`);
    }
  }
});

// 10. What is the population of the world ?
connection.query(
  'SELECT (SELECT SUM(population) FROM countries) + (SELECT SUM(population) FROM cities) AS totalPopulation',
  function (error, results, fields) {
    if (error) {
      throw error;
    }
    if (results) {
      console.log('the population of the world');
      for (value of results) {
        console.log(`${value.totalPopulation}`);
      }
    }
  }
);

connection.end();