const mysql = require('mysql');
const prompt = require('prompt');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));
async function queryQuestions() {
  try {
    console.log(`What do you want? Select the number of the question to be answered.
-----------------
1-Get the capital city of any country you want. 
2-List all the languages spoken in the region you want. 
3-Get the number of cities in which language you want is spoken .
4-Get the countries in the region you want with the language you want as the official language ?
5-List all the continents with the number of languages spoken in each continent`);
    prompt.start();
    console.log('enter the number:');
    const result = await input(['userInput']);
    const userInput = result.userInput;
    await execQuery(`use world`);

    if (userInput === '1') {
      console.log('Enter the country name:');
      const result = await input(['userInput']);
      const country = result.userInput;
      const data = await execQuery(
        `with result as 
        (select country.name as Country, city.name as Capital
        from world.country join world.city on country.Capital=city.ID)
        select Country, Capital from result where Country like '%${country}%'`,
      );
      console.log(data);
    } else if (userInput === '2') {
      console.log('Enter the region name:');
      const result2 = await input(['userInput']);
      const region = result2.userInput;
      const dataRegion = await execQuery(
        `with result as (select CountryLanguage.language as lang, country.region as region
        from world.countrylanguage join world.country on country.code = countrylanguage.countrycode)
        select region,lang from result where region like '%${region}%'`,
      );
      console.log(dataRegion);
    } else if (userInput === '3') {
      console.log('Enter the language name:');
      const result3 = await input(['userInput']);
      const language = result3.userInput;
      const dataLang = await execQuery(
        `with result as
        (select countrylanguage.Language, countrylanguage.CountryCode, city.Name
        from world.countrylanguage join world.city
        on countrylanguage.CountryCode = city.CountryCode)
        select language, count(Name) as NumberOfCities from result where language like '%${language}%'`,
      );
      console.log(dataLang);
    } else if (userInput === '4') {
      console.log('Enter the region name:');
      const result4 = await input(['userInput']);
      const regionInput = result4.userInput;
      console.log('Enter the language name:');
      const result5 = await input(['userInput']);
      const langInput = result5.userInput;
      const dataQuery4 = await execQuery(
        `with result as (select country.Name, country.Region, country.Code, countrylanguage.Language, countrylanguage.IsOfficial
        from world.country join world.countrylanguage on country.Code = countrylanguage.CountryCode)
        select Name from result where Region like '%${regionInput}%' and Language like '%${langInput}%' and IsOfficial like '%T'`,
      );
      if (dataQuery4.length === 0) {
        console.log('False');
      } else {
        console.log(dataQuery4);
      }
    } else if (userInput === '5') {
      const dataQuery5 = await execQuery(`select country.continent as Continent, count(countrylanguage.language) as NumberOfLanguages
      from world.country join world.countrylanguage on country.code = countrylanguage.countrycode group by continent`);
      console.log(dataQuery5);
    } else {
      console.log('Wrong Input!');
    }
  } catch (error) {
    console.log(error);
  }
  connection.end();
}
queryQuestions();
