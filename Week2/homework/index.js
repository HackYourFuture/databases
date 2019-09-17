const pro = require('prompt');
const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
})



const searchCapital = `select name from city where id in (select capital from country where name = ?);`
const searchRegion = `select distinct language from countrylanguage where countrycode in(select code from country where region = ?);`
const searchNumOfCities = `select distinct name from city where countrycode in (select countrycode from countrylanguage where language = ?);`
const searchOfficialLanguage = `select name from country where region = ? and code in(select countrycode from countrylanguage where language = ? and isofficial = 't');`;
const getContinentList = `select distinct continent from country`;
const getNumOfLanguagesInContinent = `select distinct language from countrylanguage where countrycode in (select code from country where continent = ?);`


console.log('select your searching type:\n Press "1" to search capital of a country;\n Press "2" to search languages in a region\n Press "3" to get number of cities by language');
console.log('Press 4 to check region and official language');
console.log('Press 5 to get list of continents with number of languages');

pro.get('type', function (err, result) {
  if (err) {
    console.log(err)
  };
  switch (result.type) {
    case '1':
      console.log('please insert a country name:')
      pro.get('country', (err, result) => {
        con.connect();
        const query_capital = mysql.format(searchCapital, result.country.split());
        con.query(query_capital, (err, res) => {
          if (res[0] == undefined) {
            console.log(`doesn't match any country name!`);
            con.end();
            return;
          }
          console.log(`The capital of ${result.country} is ${res[0].name}`);
          con.end();
        })
      });
      break;
    case '2':
      console.log('please insert a region name:')
      console.log(`doesn't match any country name!`);
      console.log(`hint: list of regions in the world:
      Caribbean
      Southern and Central Asia
      Central Africa
      Southern Europe
      Middle East
      South America
      Polynesia
      Antarctica
      Australia and New Zealand
      Western Europe
      Eastern Africa
      Western Africa
      Eastern Europe
      Central America
      North America
      Southeast Asia
      Southern Africa
      Eastern Asia
      Nordic Countries
      Northern Africa
      Baltic Countries
      Melanesia
      Micronesia
      British Islands
      Micronesia/Caribbean`);
      pro.get('region', (err, result) => {
        con.connect();
        const query_region = mysql.format(searchRegion, result.region.split());
        con.query(query_region, (err, res) => {
          if (res[0] == undefined) {
            console.log(`region name doesn't match any region!`)
            con.end();
            return;
          }

          console.log(`Languages spoken in ${result.region} are:`);
          for (i in res) console.log(res[i].language);
          console.log(`total:${res.length}`);
          con.end();
        })
      });
      break;
    case '3':
      console.log('please insert a language:')
      pro.get('language', (err, result) => {
        con.connect();
        const query_NOCities = mysql.format(searchNumOfCities, result.language.split());
        con.query(query_NOCities, (err, res) => {
          if (res[0] == undefined) {
            console.log(`doesn't match any  language!`);
            con.end();
            return;
          }
          console.log(`${result.language} is spoken in ${res.length} cities.`);
          con.end();
        })
      });
      break;
    case '4':
      console.log('please insert region and language:')
      pro.get(['region', 'language'], (err, result) => {
        con.connect();

        const query_isOfficial = mysql.format(searchOfficialLanguage, [result.region, result.language]);
        con.query(query_isOfficial, (err, res) => {
          if (res[0] == undefined) {
            console.log(false);
            con.end();
            return;
          }

          console.log(`${result.language} is official language of:`);
          for (i in res) console.log(`${res[i].name}`);
          con.end();
        })
      });
      break;
    case '5':
      con.connect();
      console.log('continents and number of languages:')
      con.query(getContinentList, (err, result) => {
        if (err) {
          console.log(err);
          con.end();
          return;
        }
        let query_array = result.map(element => element.continent).sort();
        query_array.forEach(query => {

          const query_countLanguages = mysql.format(getNumOfLanguagesInContinent, [query]);
          con.query(query_countLanguages, (err, res) => {
            if (err) console.log(err);
            console.log(`${query}:  ${res.length}`)
          })
        });
        con.end();
      })
      break;
    default:
      console.log(`chosen number doesn't match any searching type!`)
  }
});