var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123123',
  database: 'new_world',
});

connection.connect();

const countryName = process.argv[2];

// 1- What is the capital of country X ? (Accept X from user)
connection.query(
  `SELECT city.Name FROM country JOIN city ON country.code = city.CountryCode WHERE country.capital = city.ID AND country.Name = '${countryName}'`,
  function(error, results, fields) {
    if (error) {
      throw error;
    }

    if (results) {
      results.forEach(result => {
        console.log(`The capital of ${countryName} is ${result.Name}`);
      });
    } else {
      console.log("There's no countries");
    }
  }
);

// 2- List all the languages spoken in the region Y (Accept Y from user)
connection.query(
  `SELECT countrylanguage.Language FROM countrylanguage JOIN country ON country.code = countrylanguage.CountryCode WHERE country.Name = '${countryName}'`,
  function(error, results, fields) {
    if (error) {
      throw error;
    }

    if (results) {
      results.forEach(result => {
        console.log(`the languages spoken in ${countryName} is ${result.Language}`);
      });
    }
  }
);

// 3-Find the number of cities in which language Z is spoken (Accept Z from user)
connection.query(
  `SELECT COUNT(city.Name) AS total FROM countrylanguage JOIN city ON city.CountryCode = countrylanguage.CountryCode WHERE countrylanguage.language = '${countryName}'`,
  function(error, results, fields) {
    if (error) {
      throw error;
    }

    if (results) {
      results.forEach(result => {
        console.log(`the number of cities who speaks ${countryName} are ${result.total}`);
      });
    }
  }
);

// 4- Are there any countries that have A) Same official language B) Same region If yes, display those countries. If no, display TRUE or FALSE

const languageName = process.argv[2];
const regionName = process.argv[3];
// it should be the 3rd parameter into the terminal and if you want to use two words then you need to put them into single single quotes

/*
  The command should be like this [node app.js Arabic 'Middle east']
*/
connection.query(
  `SELECT country.Name, c.Language, country.Region FROM country JOIN countrylanguage AS c ON country.Code = c.CountryCode WHERE c.Language = '${languageName}' AND country.Region = '${regionName}' GROUP BY (country.Name)`,
  function(error, results, fields) {
    if (error) {
      throw error;
    }

    if (!results) {
      console.log('no');
    }
    results.forEach(result => {
      if (result) {
        console.log(`${result.Name}`);
      }
    });
  }
);

// 5-List all the continents with the number of languages spoken in each continent
connection.query(
  `SELECT country.Continent, COUNT(countrylanguage.Language) AS totalLanguages FROM country JOIN countrylanguage ON country.Code = countrylanguage.CountryCode GROUP BY  country.Continent`,
  function(error, results, fields) {
    if (error) {
      throw error;
    }

    if (results) {
      results.forEach(result => {
        console.log(`Continent ${result.Continent} has ${result.totalLanguages} languages spoken`);
      });
    }
  }
);
connection.end();
