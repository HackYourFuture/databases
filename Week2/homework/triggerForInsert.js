'use strict';
{
  const { promisify } = require('util');
  const mysql = require('mysql');

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'new_world',
  });

  const executeQuery = promisify(connection.query.bind(connection));

  async function makeQuery(query, valueList) {
    try {
      await executeQuery(query, valueList);
      console.log(`New language added: ${valueList}`);
    } catch (error) {
      console.error(`There was an error inserting new entry: ${valueList}`);
      console.error(`${error.code}-${error.message}`);
    }
  }

  async function main() {
    const maxNumberOfLanguagesTrigger = ` CREATE TRIGGER maxNumberOfLanguagesTrigger \
      BEFORE INSERT ON countrylanguage FOR EACH ROW \
      BEGIN \
        DECLARE numOfLangs INT; \ 
        SET numOfLangs = (SELECT COUNT(language) FROM countrylanguage WHERE countrycode = new.countrycode); \
        IF numOfLangs >=9 \
        THEN \
          SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The country has already 9 languages which is maximum!'; \
        END IF; \
      END`;

    try {
      await executeQuery(`DROP TRIGGER IF EXISTS maxNumberOfLanguagesTrigger`);
      await executeQuery(maxNumberOfLanguagesTrigger);
    } catch (error) {
      console.error(
        `There was an error while creating the trigger: ${error.code} - ${error.message}`,
      );
    }

    // first delete existing records for countrycode AZZ which is a country I created for testing purposes
    const result = await executeQuery(`select * from countrylanguage where countrycode = "AZZ"`);
    if (result.length !== 0) {
      await executeQuery(`delete from countrylanguage where countrycode = "AZZ"`);
    }

    const languages = [
      {
        countrycode: 'AZZ',
        language: 'Turkish',
        isofficial: 'T',
        percentage: 50.5,
      },
      {
        countrycode: 'AZZ',
        language: 'English',
        isofficial: 'T',
        percentage: 35.1,
      },
      {
        countrycode: 'AZZ',
        language: 'Japanese',
        isofficial: 'F',
        percentage: 5.2,
      },
      {
        countrycode: 'AZZ',
        language: 'Dutch',
        isofficial: 'F',
        percentage: 2.2,
      },
      {
        countrycode: 'AZZ',
        language: 'Chinese',
        isofficial: 'F',
        percentage: 2.5,
      },
      {
        countrycode: 'AZZ',
        language: 'French',
        isofficial: 'F',
        percentage: 1.5,
      },
      {
        countrycode: 'AZZ',
        language: 'German',
        isofficial: 'F',
        percentage: 0.5,
      },
      {
        countrycode: 'AZZ',
        language: 'Spanish',
        isofficial: 'F',
        percentage: 0.7,
      },
      {
        countrycode: 'AZZ',
        language: 'Korean',
        isofficial: 'F',
        percentage: 0.6,
      },
      {
        countrycode: 'AZZ',
        language: 'Italian',
        isofficial: 'F',
        percentage: 0.7,
      },
      {
        countrycode: 'AZZ',
        language: 'Portuguese',
        isofficial: 'F',
        percentage: 0.3,
      },
    ];

    // I wanted to add new country but there was a fk constraint since there was a country code field also in the country table,
    // so temporarily disabled it in order to test my trigger with a new country AZZ

    await executeQuery(`SET FOREIGN_KEY_CHECKS=0`);

    for (let language of languages) {
      await makeQuery(
        `insert into countrylanguage set countrycode = ?, language = ?, isofficial = ?, percentage = ? `,
        [language.countrycode, language.language, language.isofficial, language.percentage],
      );
    }

    await executeQuery(`SET FOREIGN_KEY_CHECKS=1`);

    connection.end();
  }

  main();
}
