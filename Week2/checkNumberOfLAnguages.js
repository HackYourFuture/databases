'use srtict';
const prompt = require('prompt');
const util = require('util');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

let promptValues = [{ name: 'country' }, { name: 'language' }];
const input = util.promisify(prompt.get.bind(this));
function createQuery(country, language) {
  let sql = 'INSERT INTO countrylanguage VALUES (?,?)';
  const inserts = [country, language];
  sql = mysql.format(sql, inserts);
  return sql;
}

let queries = [
  'CREATE DATABASE IF NOT EXISTS test_world',
  'USE test_world',
  'DROP TABLE IF EXISTS countrylanguage',

  'CREATE TABLE countrylanguage (name VARCHAR(56), language VARCHAR(50))',

  'CREATE TRIGGER `countrylanguage_AFTER_INSERT` AFTER INSERT ON `countrylanguage` FOR EACH ROW BEGIN ' +
    'DECLARE message VARCHAR(100); ' +
    'DECLARE language_count INT; ' +
    'SET language_count= (select count(language) from countrylanguage where name =new.name); ' +
    'IF language_count >=10 ' +
    'THEN ' +
    "SET message= 'number of languages cannot exceed 9'; " +
    "SET lc_messages=message; SIGNAL SQLSTATE '45000'; " +
    'END IF; ' +
    'END',

  "INSERT INTO `countrylanguage` VALUES ('Netherlands','Dutch')",
  "INSERT INTO `countrylanguage` VALUES ('Netherlands','Dutch')",
  "INSERT INTO `countrylanguage` VALUES ('Netherlands','Dutch')",
  "INSERT INTO `countrylanguage` VALUES ('Netherlands','Dutch')",
  "INSERT INTO `countrylanguage` VALUES ('Netherlands','Dutch')",
  "INSERT INTO `countrylanguage` VALUES ('Netherlands','Dutch')",
  "INSERT INTO `countrylanguage` VALUES ('Netherlands','Dutch')",
  "INSERT INTO `countrylanguage` VALUES ('Netherlands','Dutch')",
  "INSERT INTO `countrylanguage` VALUES ('Netherlands','Dutch')",
];
async function main() {
  console.log(
    '\n\nIn the table there is already 9 languages for country Netherlands. \nEnter Netherlands as countryy and any language as language to test the trigger\n\n',
  );
  prompt.start();
  const selection = await input(promptValues);
  const { country, language } = selection;
  const newInsert = createQuery(country, language);
  queries.push(newInsert);
  connection.connect();
  for (let i in queries) {
    connection.query(queries[i], function(error, results, fields) {
      if (error) {
        throw error;
      }
    });
  }
  connection.end();
}
main();
