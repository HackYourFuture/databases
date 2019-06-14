'use-strict';

const prompt = require('prompt');
const util = require('util');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});
const execQuery = util.promisify(connection.query.bind(connection));
const input = util.promisify(prompt.get.bind(this));

const start = () => {
  prompt.start();
};

const renderResult = async (que, data) => {
  connection.connect();
  let resultsFirst = await execQuery(que, data);
  for (result of resultsFirst.shift()) {
    console.log(JSON.parse(JSON.stringify(result)));
  }
  connection.end();
};

const renderResults = async (arg, que) => {
  const option = await input([arg]);
  let data = option[arg];
  renderResult(que, data);
};

const renderResultsFour = async (arg, arg2, que) => {
  const region = await input([arg]);
  let data = region[arg];
  const language = await input([arg2]);
  let data2 = language[arg2];
  console.log(region);
  console.log(language);
  let params = [data, data2];
  renderResult(que, params);
};

module.exports = { renderResults, renderResultsFour, renderResult, start, input };
