'use strict';

const connection = require('../part1/connectDatabase');
const importTrigger = require('./importTrigger');

const addTrigger = async () => {
  try {
    await connection.query('use new_world');
    await importTrigger();
    const pickRandomCountry = `    
    INSERT INTO countrylanguage (CountryCode, Language) 
    SELECT ( SELECT CountryCode  
    FROM countrylanguage   
    GROUP BY CountryCode               
    HAVING COUNT(Language) >= 9
    ORDER BY RAND()
    LIMIT 1), 
    'New_Language' AS Language;`;

    const results = await connection.query(pickRandomCountry);
    console.log(results);
  } catch (e) {
    console.log(e.stack);
  } finally {
    await connection.end();
  }
};

addTrigger();

// I want to get alerts when a country has >= 10 languages.
// E.g. If a country X has 9 languages in the CountryLanguage table,
// and a user INSERTs one more row in the CountryLanguage table, then I should get an alert.
