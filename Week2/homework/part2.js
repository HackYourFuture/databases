'use strict';

const config = require('./config');
config.connect();

async function triggerQuery() {
  try {
    // I'm getting an error when I change the (DELIMITER $$) in the same string, so I change it manually in the command line for now.
    const q_trigger = `
    CREATE TRIGGER alert_insert
      BEFORE INSERT
        ON countryLanguage
          FOR EACH ROW
          BEGIN
            DECLARE message VARCHAR(100);
            DECLARE c_languages VARCHAR(20);
            SET c_languages = (SELECT COUNT(Language) FROM countryLanguage cl JOIN country c ON (cl.CountryCode = c.Code) WHERE c.Name = Name);
            IF c_languages >= 10
            THEN
              SET message = 'This country has >= 10 languages.';
              SET lc_messages = message; SIGNAL SQLSTATE '45000';
            END IF;
          END
    `;

    await config.query(q_trigger, (error, result) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log(JSON.parse(JSON.stringify(result)));
        console.log('\nIt works...');
      }
    });
    config.end();
  } catch (err) {
    console.log(err.message);
  }
}
triggerQuery();
