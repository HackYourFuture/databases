'use strict';

const readline = require('readline');
const handleError = require('./handleError');
const { execQuery, connection } = require('./mysql');
const { YES, NO } = require('./readFile');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.setPrompt('=> ');

async function askAndUse(question, questionTwo, query) {
  rl.question(`${question}: `, async answer => {
    try {
      if (questionTwo) {
        rl.question(`${questionTwo}: `, async answerTwo => {
          try {
            const results = await execQuery(query, [answer, answerTwo]);
            console.log(results[0] ? JSON.stringify(results, null, 2) : 'FALSE');
            return rl.prompt();
          } catch (error) {
            handleError(error);
          }
        });
      } else {
        const results = await execQuery(query, answer);
        console.log(results[0] ? JSON.stringify(results, null, 2) : 'FALSE');
        return rl.prompt();
      }
    } catch (error) {
      handleError(error);
    }
  });
}

function exit() {
  rl.question('Are you sure you want to exit? ', answer => {
    if (answer.match(YES)) {
      connection.end();
      console.log('Connection to the server has terminated.\nBye.');
      rl.close();
      return process.stdin.destroy();
    }
    if (answer.match(NO)) {
      console.log('Okay.');
      return rl.prompt();
    }
    console.log('Program is still running.');
    return rl.prompt();
  });
}

module.exports = { rl, askAndUse, exit };
