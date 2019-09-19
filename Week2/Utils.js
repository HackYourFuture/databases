const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

function dataHandler(info, val, val2 = '') {
  let data;
  val2.length > 0
    ? (data = info.map(item => `Continent: ${item[val]}, Languages: ${item[val2]}`))
    : (data = info.map(item => item[val]));
  if (!data.length) return 'FALSE';
  return data;
}

function handelError(err, msg) {
  if (err) return console.log(err);
  console.log(msg);
}

const userOptions = [
  {
    type: 'select',
    name: 'userOption',
    message: 'Pick a question',
    choices: [
      { value: '-What is the capital of country X ?' },
      { value: '-List all the languages spoken in the region' },
      { value: '-Find the number of cities in which language Z is spoken' },
      {
        value:
          '-Are there any countries in this region with the given language as the official language ?',
      },
      { value: '-List all the continents with the number of languages spoken in each continent' },
    ],
    hint: 'Use arrow key on your keyboard!',
    initial: '',
  },
];

const option = [
  userOptions[0].choices[0].value,
  userOptions[0].choices[1].value,
  userOptions[0].choices[2].value,
  userOptions[0].choices[3].value,
  userOptions[0].choices[4].value,
];

const questions1 = [
  {
    type: 'text',
    name: 'capital',
    message: 'Give a country name?',
  },
  {
    type: 'text',
    name: 'region',
    message: 'Give a region name',
  },
  {
    type: 'text',
    name: 'language',
    message: 'Give a language?',
  },
];

const questions2 = [
  {
    type: 'text',
    name: 'regionName',
    message: 'Give a region name?',
  },
  {
    type: 'text',
    name: 'sameLanguage',
    message: 'Give a language?',
  },
];

module.exports = {
  connection,
  dataHandler,
  handelError,
  questions1,
  questions2,
  userOptions,
  option,
};
