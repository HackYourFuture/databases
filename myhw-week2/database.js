const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world'
});

connection.connect();
//Part 1 - 1
let country_name = 'Syria';
let capitalOfCountry = 'select country.name, city.name from city inner join country on city.id = country.capital where country.name = ' + connection.escape(country_name);

//Part 1 - 2
let country_region = 'Western Europe';
let findingSpokenLanguages = 'select countryLanguage.language, country.region from country join countryLanguage on country.Code = countryLanguage.countryCode where country.region =' + connection.escape(country_region);

//Part 1 - 3
let country_language = 'Dutch';
let findingNumberOfCities = 'select count(*) as numberOfCities from city join countryLanguage on city.countryCode = countryLanguage.countryCode where language = ' + connection.escape(country_language);

//Part 1 - 4
let display_countries = " select name,region,language,count(*) from country join countryLanguage on code = countryCode where concat(language - region) = concat(language - region) and IsOfficial = 'T' group by region,language having count(*) > 1 order by language"

//part 1 - 5 
let list_continents = 'select count(countryLanguage.language), country.continent from country join countryLanguage on country.code = countryLanguage.countryCode group by country.continent'

let world = [capitalOfCountry, findingSpokenLanguages, findingNumberOfCities, display_countries, list_continents];

world.forEach(function (el) {
  connection.query(el, function (error, result) {
    if (error) {
      throw error;
    }
    console.log(result);
  })
});

connection.end();

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


