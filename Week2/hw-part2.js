const prompt = require('prompt');
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
  multipleStatements: false,
});

const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

async function queryDatabase() {
  prompt.start();
  try {
    const result = await input(['Country']);

    const numLanguages = `SELECT count(language) FROM country JOIN countryLanguage ON countryCode = Code Where name='${result.Country}'`;

    connection.connect();

    const langs = await execQuery(numLanguages);

    const numLang = langs[0]['count(language)'];
    console.log(`Number of languages spoken: ${numLang}`);

    // Insert row to table to test. I used Indonesia and added different languages until I reached 10

    await execQuery(
      "INSERT INTO countryLanguage(CountryCode,Language,isOfficial, Percentage) values('IDN', 'NewLanguage1', 'F', 0);",
      (error, res, fields) => {
        if (error) throw error;
        if (numLang >= 10) throw Error('ALERT! Language count is equal/more than 10');
        console.log('Row is added');
      },
    );
  } catch (error) {
    console.log(error);
  }

  connection.end();
}

queryDatabase();
