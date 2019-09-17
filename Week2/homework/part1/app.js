'use strict';

const connection = require('./connectDatabase');
const query = require('./query');
const answer = require('./query').answer;
const question = require('./prompt');
const options = require('./prompt').options;
const prompt = require('./prompt').prompt;
const importDatabase = require('./importDatabase');

const start = async () => {
  try {
    await importDatabase(); // You can disable it after calling once
    await connection.query('use new_world');
    const option = await prompt(options);
    switch (option) {
      case '1':
        answer(query.q1, question.country);
        break;
      case '2':
        answer(query.q2, question.region);
        break;
      case '3':
        answer(query.q3, question.language);
        break;
      case '4':
        await answer(query.q4, question.region, question.language);
        break;
      case '5':
        answer(query.q5);
        break;
      default:
        console.log('Invalid option!');
    }
  } catch (e) {
    console.log(e.stack);
  }
};

start();
