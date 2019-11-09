const mysql = require('mysql');
const { promisify } = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'password',
  database: 'new_world',
});

const executeQuery = promisify(connection.query.bind(connection));

const languageAlertTrigger = `CREATE TRIGGER max_language_number_exceeded_trigger \
    BEFORE INSERT ON countryLanguage \
            FOR EACH ROW BEGIN \
                DECLARE message VARCHAR(100); \
                DECLARE numberOfLanguages int; \
                SET numberOfLanguages= (select COUNT(Language) from countryLanguage where CountryCode=new.CountryCode); \
                IF numberOfLanguages >= 9 \
                THEN \
                    set message= concat('There are more than 9 Languages related to this Country'); \
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT=message; \
                END IF; \
            END`;

const makeQueryForNewLanguage = (language, countryCode) =>
  `INSERT INTO countryLanguage (CountryCode, Language) VALUES ('${countryCode}', '${language}')`;

const countriesToTry = [
  {
    code: 'CAN',
    alreadyHas: 12,
  },
  {
    code: 'ZAF',
    alreadyHas: 11,
  },
  {
    code: 'PHL',
    alreadyHas: 10,
  },
  {
    code: 'AGO',
    alreadyHas: 9,
  },
  {
    code: 'AUS',
    alreadyHas: 8,
  },
  {
    code: 'UKR',
    alreadyHas: 7,
  },
];

async function main() {
  try {
    connection.connect(() => {
      console.log('Successfully connected to mysql server!');
    });

    // drop trigger if exists
    await executeQuery('DROP TRIGGER IF EXISTS max_language_number_exceeded_trigger');
    // create trigger
    await executeQuery(languageAlertTrigger);

    // delete the old added 'New Language' records
    await executeQuery(`DELETE FROM countryLanguage WHERE Language='New Language'`);

    // try inserting inputs
    const insertions = [];
    countriesToTry.forEach(country => {
      insertions.push(executeQuery(makeQueryForNewLanguage('New Language', country.code)));
    });

    const results = await Promise.all(insertions.map(insertion => insertion.catch(err => err)));
    const triggerExecutedResults = results.filter(result => result instanceof Error);
    const validResults = results.filter(result => !(result instanceof Error));
    console.log('Trial succeeded to insert on:', validResults.length, 'countries');
    console.log('Trial succeeded to trigger error on:', triggerExecutedResults.length, 'countries');
    triggerExecutedResults.forEach(result => {
      console.table(result);
    });
  } catch (error) {
    console.error('Error occurred: ', error.message);
  } finally {
    connection.end(err => {
      if (err) console.error(err);
      else console.log('Connection end with mysql server!');
    });
  }
}

main();
