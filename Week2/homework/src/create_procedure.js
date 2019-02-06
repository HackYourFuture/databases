const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function create_procedures() {
  const CREATE_PROCEDURE_CAPITAL_CITY =
    `
  CREATE PROCEDURE GetCapital_city(country_name VARCHAR(50))
  BEGIN
  select city.Name from city,country where country.name =country_name and ID =capital;
  END;
   `
  const CREATE_PROCEDURE_REGION_LANGUAGE =
    `
    CREATE PROCEDURE GetRegion_language(region VARCHAR(50))
    BEGIN
    SELECT DISTINCT country.Name, countrylanguage.language  FROM countrylanguage INNER JOIN country 
    ON country.Code = countrylanguage.CountryCode
    WHERE country.Region = region;
    END;
    `
  const CREATE_PROCEDURE_Cities_lang =
    `
  CREATE PROCEDURE GetCities_language(lang VARCHAR(50))
  BEGIN
  SELECT city.name FROM city JOIN countrylanguage  USING(CountryCode)
   WHERE countrylanguage.language =lang;  
   END;
  `
  const CREATE_PROCEDURE_COUNTRIES =
    `CREATE PROCEDURE GetCountries_Reg_lang(region VARCHAR(50),official_lang VARCHAR(50))
  BEGIN
  DECLARE message varchar(300);
  DECLARE count_countries int;
   SELECT COUNT(*) INTO count_countries from country JOIN countrylanguage ON country.code = countrylanguage.CountryCode
    WHERE countrylanguage.language = official_lang
    and country.Region = region
    and Isofficial = 'T';
    
 if (count_countries > 1) then
    SELECT country.Name FROM country JOIN countrylanguage ON country.code = countrylanguage.CountryCode
    WHERE countrylanguage.language =official_lang
    and country.Region = region
    and Isofficial = 'T';
  else   
      SET message ='FALSE: No countries on the given region with same official language';
      SET lc_messages=message; 
      SIGNAL SQLSTATE '45000';
   end if;
      END;
    `
  const CREATE_PROCEDURE_LanguagesByContinent =
    `  CREATE PROCEDURE LanguagesByContinent()
    BEGIN
    SELECT country.Continent, COUNT(*) count from country JOIN countrylanguage ON country.Code = countrylanguage.CountryCode
    GROUP BY country.Continent; 
    END;
    `


  connection.connect();

  try {
    await execQuery(CREATE_PROCEDURE_CAPITAL_CITY);
    await execQuery(CREATE_PROCEDURE_REGION_LANGUAGE);
    await execQuery(CREATE_PROCEDURE_Cities_lang);
    await execQuery(CREATE_PROCEDURE_COUNTRIES);
    await execQuery(CREATE_PROCEDURE_LanguagesByContinent);

  } catch (error) {
    console.error(error);
  }
  connection.end();
}

create_procedures();