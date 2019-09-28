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

    // Type Indonesia in prompt to test

    await execQuery(
      "INSERT INTO countrylanguage values('IDN', 'NewLang', 'F', 0);",
      (error, res, fields) => {
        if (error) throw error;
        console.log('Row is added');
      },
    );
  } catch (error) {
    console.log(error);
  }

  connection.end();
}

queryDatabase();
