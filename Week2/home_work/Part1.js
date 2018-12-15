const mysql = require('mysql');
const util = require('util');

var connection = mysql.createConnection({
   host: 'localhost',
   user: 'hyfuser',
   password: 'hyfpassword',
   database: 'new_world'
});

const execQuery = util.promisify(connection.query.bind(connection));

async function world() {

   function countryCapital(x) {
      const result = `SELECT country.name AS city, city.name AS capital FROM city, country WHERE id = capital AND country.name = ${x} `
      return result;
   }

   function languagesInRegion(y) {
      const result = `SELECT DISTINCT country.name, country.region FROM country JOIN countrylanguage on code = countrycode WHERE region = ${y} `
      return result;
   }

   function citiesWithLang(z) {
      const result = ` SELECT COUNT(*) FROM city JOIN countrylanguage ON city.countrycode = countrylanguage.countrycode WHERE language = ${z} `
      return result;
   }

   function sameOfficialLang() {
      const result = ``
      return result;
   }

   function continentsWithLangSpoken() {
      const result = `SELECT COUNT(language) AS languages_spoken, continent FROM country JOIN countrylanguage ON code = countrycode GROUP BY continent ORDER BY COUNT(language) DESC; `
      return result;
   }

   connection.connect();

   try {

      let query1 = await execQuery(countryCapital("'Syria'"));
      console.log(query1)
      let query2 = await execQuery(languagesInRegion("'caribbean'"));
      console.log(query2)
      let query3 = await execQuery(citiesWithLang("'english'"));
      console.log(query3)
      const query5 = await execQuery(continentsWithLangSpoken());
      console.log(query5)

   } catch (error) {

      console.error(error);
   }
};

world();
connection.end();
