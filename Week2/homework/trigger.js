'use strict';

const mysql = require('mysql');
const { promisify } = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const TRIGGER = `
CREATE TRIGGER language_trigger
  BEFORE INSERT
      ON countrylanguage
          FOR EACH ROW
          BEGIN
              DECLARE numberOfLanguage INT;
              SET numberOfLanguage = (SELECT COUNT(language) FROM countrylanguage WHERE CountryCode = NEW.CountryCode);
              IF (numberOfLanguage > 9)
              THEN
                  SIGNAL SQLSTATE '45000'
                  SET MESSAGE_TEXT = 'You can not insert more than 10 countrylanguage for any country!';
              END IF;
          END
`;

const execQuery = promisify(connection.query.bind(connection));

const insertLanguage = async (CountryCode, Language) => {
  const insertQuery = `INSERT INTO countrylanguage SET ?`;
  const selectQuery = `
    SELECT COUNT(Language) AS number, Language 
    FROM countrylanguage 
    WHERE CountryCode = "${CountryCode}"
  `;

  const languageObject = {
    CountryCode,
    Language,
    isOfficial: 'F',
    Percentage: 0,
  };

  await execQuery(insertQuery, languageObject);
  const [result] = await execQuery(selectQuery);

  return console.log(`Now ${CountryCode} has ${result.number} languages`);
};

const runExecution = async () => {
  connection.connect();
  try {
    await execQuery('DROP TRIGGER IF EXISTS language_trigger');
    await execQuery(TRIGGER);
    await insertLanguage('AGO', 'Arabic');
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

runExecution();
