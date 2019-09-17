'use strict';

const connection = require('../part1/connectDatabase');
const importTrigger = require('./importTrigger');

const addTrigger = async () => {
  try {
    await connection.query('use new_world');
    await importTrigger();

    // This is a test query
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
