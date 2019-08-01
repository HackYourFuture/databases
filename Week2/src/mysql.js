'use strict';

const util = require('util');
const mysql = require('mysql');
const handleError = require('./handleError');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  multipleStatements: true,
});

const connect = util.promisify(connection.connect.bind(connection));
const execQuery = util.promisify(connection.query.bind(connection));

async function execOneAndDisplayResult(query, info) {
  try {
    if (info) {
      console.log(`Executing query ${info ? 'for > ' + info + ' <' : ''}`);
      let results = await execQuery(query);
      results = {
        'Affected Rows': results.affectedRows,
        Warnings: results.warnings,
        'Changed Rows': results.changedRows,
      };
      return console.log(`Query OK\nResults:\n${JSON.stringify(results, null, 2)}\n\n`);
    }
    let results = await execQuery(query);
    return console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    handleError(error);
  }
}

async function execMultiAndDisplayResults(queries, info) {
  try {
    console.log(`Executing queries ${info ? 'for > ' + info + ' <' : ''}`);
    const results = await execQuery(queries);
    const resultsTotals = {
      'Total Affected Rows': results.reduce(
        (affectedRows, object) => affectedRows + object.affectedRows,
        0,
      ),
      'Total Warnings': results.reduce((warnings, object) => warnings + object.warningCount, 0),
      'Total Changed Rows': results.reduce(
        (changedRows, object) => changedRows + object.changedRows,
        0,
      ),
    };
    console.log(`Query OK\nResults:\n${JSON.stringify(resultsTotals, null, 2)}\n\n`);
  } catch (error) {
    handleError(error);
  }
}

async function useDB() {
  await execOneAndDisplayResult('USE new_world;', 'Using existing database');
}

async function isDBConnected() {
  try {
    const response = await execQuery('SELECT database();');
    if (response[0]['database()'] === 'new_world') return true;
    return false;
  } catch (error) {
    handleError(error);
  }
}

async function execSqlStatement(string) {
  try {
    const sqlArray = string.split(':');
    const sql = sqlArray[1];
    const results = await execQuery(sql);
    console.log(JSON.stringify(results, null, 2));
    return results;
  } catch (error) {
    handleError(error);
  }
}

module.exports = {
  connect,
  execQuery,
  execOneAndDisplayResult,
  execMultiAndDisplayResults,
  useDB,
  isDBConnected,
  connection,
  execSqlStatement,
};
