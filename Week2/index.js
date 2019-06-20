const prompt = require('prompt');
const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
host: 'localhost',
user: 'hyfuser',
password: 'hyfpassword',
database: 'new_world'
});
const execQuery = util.promisify(connection.query.bind(connection))
const input = util.promisify(prompt.get.bind(this));



async function seedDatabase() { 
    
    const countries = 
        `SELECT city.name FROM country
        JOIN city on city.ID = country.capital
        WHERE country.name = ? `;

    const regionName =
        `SELECT DISTINCT language
        FROM countrylanguage
        JOIN country ON countrylanguage.countrycode =country.code
        WHERE country.region = ? `;

    const language =
        `SELECT COUNT(city.name)
         FROM city JOIN countrylanguage ON city.countrycode = countrylanguage.countrycode
         WHERE countrylanguage.language = ? `;

    const regionAndLanguage =
         `SELECT name FROM country
         JOIN countrylanguage ON country.code = countrylanguage.countrycode
         WHERE isofficial="T" AND country.region =? AND countrylanguage.language = ? `;

    const continents =
         `SELECT continent, count(DISTINCT language) AS number_of_languages
         FROM country
         JOIN countrylanguage ON country.code=countrylanguage.countrycode
         GROUP BY continent
         ORDER BY
         number_of_languages desc`;
        
   connection.connect()
      prompt.start();
        try {
            const inputCountry = await input(['countryName']);
            const capitalOfCountry = await execQuery(countries, inputCountry.countryName)
                console.log(capitalOfCountry);

            const inputRegion = await input(['regionName']);    
            const spokenLanguage = await execQuery(regionName, inputRegion.regionName);
                console.log(spokenLanguage);
            
            const inputLanguage = await input(['languageName']);
            const citiesNumber = await execQuery(language, inputLanguage.languageName);
                console.log(citiesNumber);

            const regionAndLanguageInput = await input(['regionName', 'languageName']);
            const result = await execQuery(regionAndLanguage, [regionAndLanguageInput.regionName,
                regionAndLanguageInput.languageName]);
                if (result.length === 0) {
                    console.log('FALSE');
                } else {
                    console.log(result);
                }
            
            const continentsList = await execQuery(continents);
                console.log('number of languages in each continent', continentsList);
        } catch (error) {
            console.log(error);
        }
 
  connection.end()

}

seedDatabase();