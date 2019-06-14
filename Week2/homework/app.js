'use-strict';

const { renderResults, renderResultsFour, renderResult, start, input } = require('./renderResult');
const { one, two, three, four, five, help } = require('./queryAndLog');

const queryDatabase = async () => {
  console.log(help);
  start();
  try {
    let input_number = '';
    const options = await input(['option']);
    input_number = options.option;

    input_number === '1'
      ? renderResults('Country', one)
      : input_number === '2'
      ? renderResults('Region', two)
      : input_number === '3'
      ? renderResults('Language', three)
      : input_number === '4'
      ? renderResultsFour('Region', 'Language', four)
      : input_number === '5'
      ? renderResult(five)
      : console.log(`Please put a valid number!`);
  } catch (error) {
    console.error(error);
  }
};

queryDatabase();
