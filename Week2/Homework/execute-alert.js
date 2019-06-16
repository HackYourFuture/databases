const mysql = require('mysql');
const util = require('util');
const prompt = require('prompt');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

connection.connect(error => {
  if (error) throw error;
  console.log('\nMysql connected...\n');
});

const help = () => {
  console.log(`
    To test the trigger run the following options in order:

    1 ..... To add the trigger
    2 ..... To insert a new language for a country that has at least 9 languages,
            Repeat this step again one more time
    3 ..... To delete the new language added
  `);
};

async function queryAlert() {
  help();
  prompt.start();
  try {
    const use_database = `use new_world`;
    await execQuery(use_database);

    const options = await input(['number']);
    const input_number = options.number;

    switch (input_number) {
      case '1':
        const dropTrigger = `DROP TRIGGER IF EXISTS language_limit_9;`;
        await execQuery(dropTrigger);
        const addTrigger = `
        CREATE TRIGGER language_limit_9
            BEFORE INSERT 
                ON countrylanguage
              FOR EACH ROW
                BEGIN
                  DECLARE message VARCHAR(255);
                  DECLARE languagesPerCountry INT;
                  SET languagesPerCountry = (SELECT COUNT(language) FROM countrylanguage WHERE countrycode = NEW.countrycode);
                  IF languagesPerCountry > 9 
                    THEN
                      SET message = 'The country has already more than 9 languages, you cannot insert more';
                      SET lc_messages = message; SIGNAL SQLSTATE '45000';
                  END IF;
                END;
        `;
        const firstResults = await execQuery(addTrigger);
        console.log('Trigger added...');
        break;
      case '2':
        const insert_query = `INSERT INTO countrylanguage VALUES ('AGO', 'Arabic', 'F', 0.1);`;
        const secondResults = await execQuery(insert_query);
        console.log('A new language is inserted...');

        break;
      case '3':
        const delete_query = `DELETE FROM countrylanguage WHERE countrycode = 'AGO' AND language = 'Arabic';`;
        const thirdResults = await execQuery(delete_query);
        console.log(`The new language is deleted...`);
        break;
      default:
        console.log(`Please, insert a valid option between 1 and 3`);
        help();
    }
  } catch (error) {
    console.error(error);
  }

  connection.end(error => {
    if (error) throw error;
    console.log('\nMysql disconnected...');
  });
}

queryAlert();
