let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world'
});


connection.connect();


function ShowCapital(country) {

  connection.query("SELECT name,capital FROM country WHERE name = ?", [country], function (error, results) {
    if (error) throw error.message;
    console.log("show capital: \n", results, "\n");
  });
}

ShowCapital('Syria');

function ListRegionLanguages(region) {

  connection.query("select countryLanguage.language from countryLanguage join country on country.code = countryLanguage.countryCode WHERE region = ? group by countryLanguage.language", [region], function (error, results) {
    if (error) throw error.message;
    console.log(`list ${region} languages:\n`, results, "\n");
  });
}
ListRegionLanguages('middle east');


function countCitiesByLanguage(language) {
  let statement = "select count(city.id) AS cities_number from city join countryLanguage on city.countryCode= countryLanguage.countryCode WHERE countryLanguage.language =?";
  connection.query(statement, [language], function (error, results) {
    if (error) throw error.message;
    console.log("numbers of cities speak ", language, "\n", results, "\n");
  });
}
countCitiesByLanguage('Urdu');
//next function still needs work
function testSimilarCountries() {
  let first = " A.name AS country1, B.name AS country2 FROM country A ,country B WHERE A.code<>B.code AND A.region = B.region ";
  let second = "SELECT A.language AS language1, B.language AS language2 FROM countryLanguage A, countryLanguage B WHERE A.countryCode<>B.countryCode AND A.language = B.language AND A.isOfficial = 'T' AND B.isOfficial = 'T'";
  connection.query(`SELECT A.name AS country1, B.name AS country2 FROM country A ,country B,IF(${first}),IF(${second},false)`, function (error, results) {
    if (error) throw error.message;
    console.log("similar countries: \n", results, "\n");
  });
}

// testSimilarCountries();

function listContinentsLanguages() {
  let query = " SELECT country.continent , count(countryLanguage.language) AS languages FROM country JOIN countryLanguage ON country.code = countryLanguage.countryCode GROUP BY continent";
  connection.query(query, function (error, results) {
    if (error) throw error.message;
    console.log("Number of spoken languages in each continent:\n", results);

  });
}
listContinentsLanguages();

connection.end();
