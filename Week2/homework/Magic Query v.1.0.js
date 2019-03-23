const mysql = require('mysql');
const rl = require('readline');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: '7566',
  database: 'new_world',
  multipleStatements: true
});

console.log('\n / Magic Query v.1.0 \\');
console.log(`
1- What is the capital of country X ? (Accept X from user)
2- List all the languages spoken in the region Y (Accept Y from user)
3- Find the number of cities in which language Z is spoken (Accept Z from user)
4- Are there any countries that have A) Same official language ?
5- Are there any countries that have B) Same region ?
6- List all the continents with the number of languages spoken in each continent
`);
const prompts = rl.createInterface(process.stdin, process.stdout);

const queryPrepareStatements = [
  `PREPARE stmt FROM 'SELECT city.Name FROM country JOIN city ON country.code = city.CountryCode WHERE country.capital = city.ID AND country.Name = ?';`,
  `PREPARE stmt FROM 'SELECT DISTINCT countrylanguage.Language FROM countrylanguage JOIN country ON country.code = countrylanguage.CountryCode WHERE country.Region = ?';`,
  `PREPARE stmt FROM 'SELECT COUNT(city.Name) AS total FROM countrylanguage JOIN city ON city.CountryCode = countrylanguage.CountryCode WHERE countrylanguage.language = ?';`,
  `SELECT Name, Language FROM countrylanguage INNER JOIN country ON countrylanguage.countrycode = country.code WHERE countrylanguage.IsOfficial = 'T' ORDER BY countrylanguage.language;`,
  `SELECT Name, Region FROM country ORDER BY Region;`,
  `SELECT continent, COUNT(language) AS Languages FROM (SELECT e1.Continent AS Continent, e2.Language AS Language FROM country AS e1 LEFT JOIN (SELECT * FROM countrylanguage WHERE isOfficial = 'T') AS e2 ON (e1.Code = e2.CountryCode)) AS l GROUP BY continent;`
];

function executeProgram() {
  prompts.question('Which query do you want to do ==>> ', function(answer) {
    if (answer < 7 && answer > 0) {
      switch (answer) {
        case '1':
          QueryByInput('What is the capital of ==>> ', 0);
          break;
        case '2':
          QueryByInput('List all the languages spoken in the region ==>> ', 1);
          break;
        case '3':
          QueryByInput('Find the number of cities in which spoken language is ==>> ', 2);
          break;
        case '4':
          QueryByStatement(3);
          break;
        case '5':
          QueryByStatement(4);
          break;
        case '6':
          QueryByStatement(5);
          break;
      }
    } else {
      console.log("I think you're not sure, just type the number of query !");
      executeProgram();
    }
  });
}

function QueryByInput(question, queryIndex) {
  prompts.question(question, function(answer) {
    if (answer !== undefined) {
      connection.connect();
      connection.query(queryPrepareStatements[queryIndex], function(error, results, fields) {
        if (error) {
          throw error;
        }
      });
      connection.query(
        `SET @variable = '${answer}'; EXECUTE stmt USING @variable; DEALLOCATE PREPARE stmt;`,
        function(error, results, fields) {
          if (error) {
            throw error;
          }
          try {
            switch (queryIndex) {
              case 0:
                console.log(`${results[1][0].Name} is the capital of ${answer}`);
                break;
              case 1:
                for (i in results[1]) {
                  console.log(results[1][i].Language);
                }
                break;
              case 2:
                console.log(results[1][0].total);
                break;
            }
            process.exit();
          } catch (err) {
            console.log('Invalid value ! Try again !');
            process.exit();
          }
        }
      );
      connection.end();
    } else {
      console.log("I think you're not sure, just type 'Y' or 'N'");
    }
  });
}

function QueryByStatement(queryIndex) {
  connection.connect();
  connection.query(queryPrepareStatements[queryIndex], function(error, results, fields) {
    if (error) {
      throw error;
    }
    try {
      switch (queryIndex) {
        case 3:
          console.log('Here it is countries by same official language !');
          for (i in results) {
            console.log(results[i].Language + ' => ' + results[i].name);
          }
          break;
        case 4:
          console.log('Here it is countries by same region !');
          for (i in results) {
            console.log(results[i].Region + ' => ' + results[i].Name);
          }
          break;
        case 5:
          console.log('Here it is number of languages of continents !');
          for (i in results) {
            console.log(results[i].Continent + ' => ' + results[i].Languages);
          }
          break;
      }
      process.exit();
    } catch (err) {
      console.log('Invalid value ! Try again !');
      process.exit();
    }
  });
  connection.end();
}

executeProgram();
