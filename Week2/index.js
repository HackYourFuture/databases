const prompt = require('prompt');
const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
host: 'localhost',
user: 'hyfuser',
password: 'hyfpassword',
database: 'world'
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
            const inputCountry1 = await in1put(['countryName']);
            const capitalOfCountry2 = await execQuery(countries, inputCountry1.countryName)
                console.log(capitalOfCountry2);

            const inputRegion3 = await input(['regionName']);    
            const spokenLanguage4 = await execQuery(regionName, inputRegion3.regionName);
                console.log(spokenLanguage4);
            
            const inputLanguage5 = await input(['languageName']);
            const citiesNumber6 = await execQuery(language, inputLanguage5.languageName);
                console.log(citiesNumber6);

            const regionAndLanguageInput7 = await input(['regionName', 'languageName']);
            const result = await execQuery(regionAndLanguage, [regionAndLanguageInput7.regionName,
                regionAndLanguageInput7.languageName]);
                if (result.length === 0) {
                    console.log('FALSE');
                } else {
                    console.log(result);
                }
            
            const continentsList8 = await execQuery(continents);
                console.log('number of languages in each continent', continentsList8);
        } catch (error) {
            console.log(error);
        }
 
  connection.end()

}

seedDatabase();