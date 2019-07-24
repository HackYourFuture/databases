const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);

async function getData(file) {
  const data = await readFilePromise(__dirname + `/${file}.json`, 'utf8');
  return JSON.parse(data);
}

module.exports = getData;
