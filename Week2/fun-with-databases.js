'use strict';

// Entity Relationship Diagram for the database of the ToDo App:
// https://www.lucidchart.com/invitations/accept/d557af75-fa45-4222-8262-84416e5ddf52

const { readLine, mysqlFunc, readFileFunc, handleError, alertFunc } = require('./src');

const { rl, askAndUse, exit } = readLine;
const { connect, useDB, isDBConnected, execOneAndDisplayResult, execSqlStatement } = mysqlFunc;
const {
  createAndInsert,
  fetch,
  convertNumbersToRegex,
  HELP,
  EXIT,
  YES,
  NO,
  QUERY,
  CREATE_ALERT,
  DELETE_ALERT,
  TEST_ALERT,
} = readFileFunc;
const { createAlert, dropAlert, showAlert } = alertFunc;

const [ONE, TWO, THREE, FOUR, FIVE] = convertNumbersToRegex([1, 2, 3, 4, 5]);

async function program() {
  try {
    console.log('Connecting to the server...');
    await connect();
    console.log('Connected successfully.');

    const { greetings, queries } = await fetch();

    console.log(
      'Do you want to create and use new_world database? ("Yes" to create / "No" to use existing)',
    );
    rl.prompt();

    rl.on('line', async answer => {
      try {
        if (!(await isDBConnected())) {
          switch (true) {
            case YES.test(answer):
              await createAndInsert();
              if (await isDBConnected()) {
                console.log(greetings);
              }
              break;
            case NO.test(answer):
              await useDB();
              if (await isDBConnected()) {
                console.log(greetings);
              }
              break;
            default:
              console.log(`You are not connected to new_world database.`);
              console.log(`Please type Y(es) to create or N(o) to use existing new_world db.`);
              rl.prompt();
              break;
          }
        } else {
          switch (true) {
            case ONE.test(answer):
              await askAndUse('Provide a country', null, queries[0]);
              break;
            case TWO.test(answer):
              await askAndUse('Provide a region', null, queries[1]);
              break;
            case THREE.test(answer):
              await askAndUse('Provide a language', null, queries[2]);
              break;
            case FOUR.test(answer):
              await askAndUse('Provide a region', 'Provide a language', queries[3]);
              break;
            case FIVE.test(answer):
              console.log(
                '\nList all the continents with the number of languages spoken in each continent:',
              );
              await execOneAndDisplayResult(queries[4]);
              break;
            case QUERY.test(answer):
              await execSqlStatement(answer);
              break;
            case CREATE_ALERT.test(answer):
              await createAlert();
              break;
            case DELETE_ALERT.test(answer):
              await dropAlert();
              break;
            case TEST_ALERT.test(answer):
              await showAlert();
              break;
            case HELP.test(answer):
              console.log(greetings);
              break;
            case EXIT.test(answer):
              exit();
              break;
            default:
              console.log('Invalid input.\n');
              console.log(greetings);
              break;
          }
        }
        rl.prompt();
      } catch (error) {
        handleError(error);
      }
    });

    rl.on('SIGINT', () => {
      exit();
    });
  } catch (error) {
    handleError(error);
  }
}

program();
