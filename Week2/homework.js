const prompt = require('prompt');
const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

connection.connect(err => {
  if (err) throw err;
  console.log('db is connected');
});

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

async function queryDatabase() {
  prompt.start();
  try {
    await execQuery('use new_world');
    console.log('select a question number between 1 - 5');
    const input_number = await input(['number']);
    const number = parseInt(input_number.number);
    if (number < 6 && number > 0) {
      if (number === 1) {
        console.log('What is the capital of country ?');
        const x = await input(['country']);
        const input_country = x.country;
        const select_x = await execQuery(
          `select city.name 
        from city 
        join country on city.CountryCode = country.code 
        where city.id = country.capital 
        and country.name = '${input_country}'`,
        );
        select_x.forEach(item => {
          console.log(`${item.name} is the capital of ${x.country}`);
        });
      } else if (number === 2) {
        console.log('List all the languages spoken in the region ?');
        const y = await input(['region']);
        const input_region = y.region;
        const select_y = await execQuery(
          `select countrylanguage.language 
        from countrylanguage 
        join country on country.code = countrylanguage.countryCode
        where country.region = '${input_region}' 
        group by language;`,
        );
        select_y.forEach(element => {
          console.log(element.language);
        });
      } else if (number === 3) {
        console.log('Find the number of cities in which language Z is spoken ?');
        const z = await input(['language']);
        const input_language = z.language;
        const select_z = await execQuery(
          `select count(city.name) as TotalCities 
        from city 
        join countrylanguage on city.countryCode = countrylanguage.countryCode
        where Language = '${input_language}';`,
        );
        select_z.forEach(element => {
          console.log(element.TotalCities);
        });
      } else if (number === 4) {
        console.log(
          'Are Region and Language there any countries in this region with the given language as the official language ?',
        );
        const result4 = await input(['language', 'region']);
        const input_language = result4.language;
        const input_region = result4.region;
        const results = await execQuery(
          `select countrylanguage.Language , country.name as country  , countryLanguage.IsOfficial 
        from country join city on country.code = city.CountryCode
        join countrylanguage on city.CountryCode = countrylanguage.CountryCode
        where country.region = '${input_region}' 
        and Language = '${input_language}' 
        group by country having IsOfficial = 'T' `,
        );
        if (results.length === 0) {
          console.log('false');
        } else {
          results.forEach(element => {
            console.log(element.country);
          });
        }
      } else if (number === 5) {
        console.log(
          'List all the continents with the number of languages spoken in each continent?',
        );
        const all_continents = await execQuery(
          `select country.continent , count(countrylanguage.Language) as totalLanguages 
        from country 
        join countrylanguage on country.code = countrylanguage.CountryCode 
        group by Continent `,
        );
        console.log(all_continents);
      }
    } else {
      console.log('invalide number');
    }
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

queryDatabase();
