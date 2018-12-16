const mysql = require("mysql");
const util = require("util");
const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world"
});

const execQuery = util.promisify(con.query.bind(con));

async function queryPromise() {

  function capitalOfCountry(x) {
    return `SELECT country.name, city.name FROM city, country WHERE id = capital AND country.name = ${x};`;
  }
  function languagesInRegion(x) {
    return `SELECT Language FROM countrylanguage, country WHERE Code = countryCode AND Region = ${x};`;
  }
  function numberOfCitiesSpeak(x) {
    return `SELECT COUNT(*) AS numberOfCities FROM city, countryLanguage WHERE city.countryCode = countryLanguage.countryCode AND countryLanguage.language = ${x};`;
  }
  function sameOfficialLanguage(x, y) {
    return `SELECT Name FROM country, countrylanguage WHERE Code = countrycode AND Region = ${y} AND Language = ${x} AND IsOfficial = 'T' ORDER BY Region;`
  }

  function numberOfLanguages() {
    return `SELECT country.continent, COUNT(language) FROM country, countryLanguage WHERE code = countryCode group by continent ORDER BY COUNT(language);`
  }

  function printAnswer(results, i) {
    console.log("=====  Answer " + i + " =====");
    results.forEach(result => {
      for (let el in result) {
        console.log(result[el]);
      }
    });
  }

  con.connect(err => console.log(err ? err.stack : "connected..."));

  try {
    const result1 = await execQuery(capitalOfCountry("'Netherlands'"));
    printAnswer(result1, 1);
    const result2 = await execQuery(languagesInRegion("'Western Europe'"));
    printAnswer(result2, 2);
    const result3 = await execQuery(numberOfCitiesSpeak("'Dutch'"));
    printAnswer(result3, 3);
    const result4 = await execQuery(sameOfficialLanguage("'Arabic'", "'Middle East'"));
    printAnswer(result4, 4);
    const result5 = await execQuery(numberOfLanguages());
    printAnswer(result5, 5);
  } catch (err) {
    console.log(err.message);
  }

  con.end(err => console.log(err ? err.message : "disconnected."));
}

queryPromise();








