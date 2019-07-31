const mysql = require('mysql');
const util = require('util');
const prompt = require('prompt');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

connection.connect(error => {
  if (error) throw error;
  console.log('database is connected :');
});

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

async function queryDatabase() {
  console.log(`
  select one the following questions by choosing the question number:
  
1. What is the capital of country X ? (Accept X from user)
2. List all the languages spoken in the region Y (Accept Y from user)
3. Find the number of cities in which language Z is spoken (Accept Z from user)
4. Accept the region and language from the user.
   Are there any countries in this region with the given language
   as the official language ?
   If yes, display those countries.
   If no, display FALSE.
   E.g.
   (A) input region : 'Western Europe' and input language : 'Dutch'
   output should be Belgium and Netherlands
   (B) input region : 'Western Europe' and input language : 'Hindi'
   output should be 'FALSE'
5. List all the continents with the number of languages spoken in each continent

  `);

  prompt.start();

  try {
    await execQuery('use new_world');

    const input_number = await input(['number']);
    const number = input_number.number;

    if (number === '1') {
      const chosen_country = await input(['country']);
      const input_country = chosen_country.country;

      const capital_output = await execQuery(
        `select city.name 
        from city 
        join country on city.countryCode = country.code 
        where city.id = country.capital 
        and country.name = "input_country"`,
      );
      console.log(capital_output);

      //-===================
    } else if (number === '2') {
      const chosen_region = await input(['region']);
      const input_region = chosen_region.region;

      const spokenLanguage_output = await execQuery(`
      select countrylanguage.language
      from countrylanguage
      join country on country.code = countrylanguage.countryCode
      group by language 
      `);

      console.log(spokenLanguage_output);
    } else if (number === '3') {
      const chosen_language = await input(['language']);
      const input_language = chosen_language.language;

      const language_output = await execQuery(`
      select count(city.name) as TotalCities
      from city
      join countrylanguage on city.countryCode = countrylanguage.countryCode
      where language == ${input_language}
      `);

      console.log(language_output);
    } else if (number === '4') {
      const chosen_language_and_region = await input(['language', 'region']);
      const input_language = chosen_language_and_region.language;
      const input_region = chosen_language_and_region.region;

      const language_and_region_output = await execQuery(`
      select countrylanguage.language , country.name as country , countrylanguage.IsOfficial
      from country join city on country.code = city.countryCode 
      join countrylanguage on city.countryCode = countrylanguage.countryCode
      where country.region = ${input_region}
      and language = ${input_language}
      group by country having IsOfficial = 'T',
      `);

      if (language_and_region_output.length === 0) {
        console.log('false');
      } else {
        console.log(language_and_region_output);
      }
    } else if (number === '5') {
      const continent = await execQuery(`
        select country.continent , count(countrylanguage.language) as totalLanguages
        from country
        join countrylanguage on country.code = countrylanguage.countryCode
        group by continent  
        `);
      console.log(continent);
    }
  } catch (error) {
    console.error(error);
  }
  connection.end();
}
queryDatabase();
