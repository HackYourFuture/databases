'use strict';

const util = require('util');
const fs = require('fs');
const { execMultiAndDisplayResults } = require('./mysql');
const handleError = require('./handleError');

const DEFAULT_ENCODING = 'utf8';
const DUMP_PATH = __dirname + '/../world.sql';
const GREETINGS_PATH = __dirname + '/greetings.json';
const QUERIES_PATH = __dirname + '/queries.json';
const YES = /^y(es)?$/i;
const NO = /^n(o)?$/i;
const EXIT = /^exit$/i;
const QUERY = /^query:/i;
const CREATE_ALERT = /^create alert$/i;
const DELETE_ALERT = /^delete alert$/i;
const TEST_ALERT = /^test alert$/i;
const HELP = /^help$/i;
const CREATE_AND_USE_DB = 'CREATE DATABASE IF NOT EXISTS new_world; USE new_world;';

const readFile = util.promisify(fs.readFile);

async function readGreetingsAndQueries() {
  try {
    const greetings = await readFile(GREETINGS_PATH, DEFAULT_ENCODING);
    const queries = JSON.parse(await readFile(QUERIES_PATH, DEFAULT_ENCODING));
    return { greetings, queries };
  } catch (error) {
    handleError(error);
  }
}

async function createAndInsert() {
  try {
    await execMultiAndDisplayResults(CREATE_AND_USE_DB, 'Create and use DB');

    const sqlDump = await readFile(DUMP_PATH, DEFAULT_ENCODING);
    await execMultiAndDisplayResults(sqlDump, 'Import SQL from dump');
  } catch (error) {
    handleError(error);
  }
}

function convertNumbersToRegex(array) {
  const convertedNumbers = [];
  array.forEach(number => {
    convertedNumbers.push(new RegExp(`^${number}$`));
  });
  return convertedNumbers;
}

module.exports = {
  readFile,
  readGreetingsAndQueries,
  YES,
  NO,
  EXIT,
  QUERY,
  CREATE_ALERT,
  DELETE_ALERT,
  TEST_ALERT,
  HELP,
  createAndInsert,
  convertNumbersToRegex,
};
