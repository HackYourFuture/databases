const mysql = require('mysql');
const inquirer = require('inquirer');
const { promisify } = require('util');
const {
  firstPromptQuestion,
  queriesPromptQuestion,
  queryQuestions,
  queries,
} = require('./questions');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'password',
  database: 'new_world',
});

const executeQuery = promisify(connection.query.bind(connection));

async function main() {
  connection.connect(() => {
    console.log('Connected to mysql server successfully!');
  });
  let quit = false;
  do {
    const firstAnswer = await inquirer.prompt(firstPromptQuestion);
    quit = firstAnswer.decision === 'Quit';
    if (quit) break;
    const choice = await inquirer.prompt(queriesPromptQuestion);
    const queryIndex = parseInt(choice.decision[0], 10) - 1; // '1) The capital of a country!' => '1' => 0
    const queryQuestion = queryQuestions[queryIndex];
    let answer = {};
    if (queryQuestion) {
      // input required questions => queryQuestion !== null
      answer = await inquirer.prompt(queryQuestion);
    }
    const queryString = queries[queryIndex](answer);
    try {
      const queryResult = await executeQuery(queryString);
      console.table(queryResult);
      console.log('\n\n');
    } catch (err) {
      console.log('Error occurred while executing query: ', err.message);
    }
  } while (!quit);

  connection.end(() => {
    console.log('Connection ended with mysql server!');
  });
}

main();
