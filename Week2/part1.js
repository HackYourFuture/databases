const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world'
});

connection.connect();
//What is the capital of country X ? (Accept X from user)
function capitalOfCountry(country) {
  country = connection.escape(country);
  const capital = 'select city.name from city join country where city.id = country.capital and country.name = ' + country;
  connection.query(capital, function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log(results);
  })
}
capitalOfCountry('india');

//List all the languages spoken in the region Y (Accept Y from user)
function languagesSpokenInRegion(region) {
  region = connection.escape(region);
  const SpokenLanguages = 'select language from countrylanguage as a join country as b where a.countrycode = b.code and b.region = ' + region + ' GROUP BY a.language order by a.percentage desc'
  connection.query(SpokenLanguages, function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log(results);
  })
}
languagesSpokenInRegion("Polynesia");

//Find the number of cities in which language Z is spoken (Accept Z from user)
function numberOfCitiesThatSpeakLanguage(language) {
  language = connection.escape(language);
  const cityCount = 'select count(*) from city as a  join country as b on a.countrycode = b.code inner join countrylanguage as c on c.countrycode = b.code where c.language = ' + language;
  connection.query(cityCount, function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log(results);
  })
}
numberOfCitiesThatSpeakLanguage("dutch");

//Are there any countries that have A) Same official language B) Same region If yes, display those countries. If no, display TRUE or FALSE
function showCountriesWithSamelanguageAndRegion(language) {
  language = connection.escape(language);
  const countryWithLanguageAndRegion =
    'select name, region from country as a join countrylanguage as b on a.code = b.countrycode  where b.Language = ' + language + ' and b.IsOfficial = "t" and region in (select region from country as a join countrylanguage as b on a.code = b.countrycode where b.Language = ' + language + ' and b.IsOfficial = "t" group by region having COUNT(*) > 1)order by region';
  connection.query(countryWithLanguageAndRegion, function (error, results, fields) {
    if (error) {
      throw error;
    }
    else if (results != 0) {
      console.log(results);
    }
    else {
      return false;
    }
  })
}

showCountriesWithSamelanguageAndRegion("english");

//List all the continents with the number of languages spoken in each continent
function showNumberOfLanguagesInContinent() {
  const languagesInContinent = 'select Continent, count(Language) from country as a join countrylanguage as b on a.code = b.countrycode group by continent'
  connection.query(languagesInContinent, function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log(results);
  })
}

showNumberOfLanguagesInContinent();

