const mysql = require('mysql');
const util = require('util');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world'
});


const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {


  //Part 1 - 1

  function capitalOfCountry(country_name) {
    return 'select country.name, city.name from city inner join country on city.id = country.capital where country.name = ' + connection.escape(country_name);
  }
  //Part 1 - 2
  function findingSpokenLanguages(country_region) {
    return 'select countryLanguage.language, country.region from country join countryLanguage on country.Code = countryLanguage.countryCode where country.region =' + connection.escape(country_region);
  }

  //Part 1 - 3
  function findingNumberOfCities(country_language) {
    return 'select count(*) as numberOfCities from city join countryLanguage on city.countryCode = countryLanguage.countryCode where language = ' + connection.escape(country_language);
  }
  //Part 1 - 4
  function display_countries() {
    return "select name, region from country as a join countryLanguage as b on a.code = b.countryCode where b.Language = 'French' and b.IsOfficial = 'T' and region in (select region from country as a join countryLanguage as b on a.code = b.countryCode where b.Language = 'French' and b.IsOfficial = 'T' group by region having COUNT(*) > 1 )"
  }
  //part 1 - 5 
  function list_continents() {
    return 'select count(countryLanguage.language), country.continent from country join countryLanguage on country.code = countryLanguage.countryCode group by country.continent'
  }

  connection.connect();

  try {
    let number1 = await execQuery(capitalOfCountry('Syria'));
    console.log(number1);
    let number2 = await execQuery(findingSpokenLanguages('North America'));
    console.log(number2);
    let number3 = await execQuery(findingNumberOfCities('Dutch'));
    console.log(number3);
    let number4 = await execQuery(display_countries());
    console.log(number4);
    let number5 = await execQuery(list_continents());
    console.log(number5);
  } catch (error) {
    console.error(error);
  }

  connection.end();
}
seedDatabase();


// part 2

//CREATE TRIGGER my_trigger  
//BEFORE INSERT ON countryLanguage 
//BEGIN
//DECLARE message VARCHAR(50);
//DECLARE @code VARCHAR(3);
//set @code = (select countryCode from INSERTED);
//IF (select count(language) from countryLanguage where countryCode = @code ) >= 10 THEN SET message = 'you added more than 9 language to this country';
//SET lc_messages = message; SIGNAL SQLSTATE '45000'; END IF; END $$ 

//////the test insert statements////////

// insert into countryLanguage values('USA', 'sansakrity', 'f', 5.3);


