const mysql = require('mysql');
const util = require('util');
const process = require('process')
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
    return 'select country.name, city.name from city inner join country on id = capital where country.name = ' + connection.escape(country_name);
  }
  //Part 1 - 2
  function findingSpokenLanguages(country_region) {
    return 'select language, region from country join countryLanguage on Code = countryCode where region =' + connection.escape(country_region);
  }

  //Part 1 - 3
  function findingNumberOfCities(country_language) {
    return 'select count(*) as numberOfCities from city a join countryLanguage b on a.countryCode = b.countryCode where language = ' + connection.escape(country_language);
  }
  //Part 1 - 4
  function display_countries() {
    return "select name,region,language,count(*) from country a join countryLanguage b on code = countryCode where IsOfficial = 'T' group by region having count(*) > 1"
  }
  //part 1 - 5 
  function list_continents() {
    return 'select count(language),continent from country join countryLanguage on code = countryCode group by continent'
  }

  connection.connect();

  try {
    switch (process.argv[2]) {
      case 'number1':
        let number1 = await execQuery(capitalOfCountry(process.argv[3]));
        console.log(number1);
        break;
      case 'number2':
        let number2 = await execQuery(findingSpokenLanguages(process.argv[3]));
        console.log(number2);
        break;
      case 'number3':
        let number3 = await execQuery(findingNumberOfCities(process.argv[3]));
        console.log(number3);
        break;
      case 'number4':
        let number4 = await execQuery(display_countries());
        console.log(number4);
        break;
      case 'number5':
        let number5 = await execQuery(list_continents());
        console.log(number5);
    }
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
