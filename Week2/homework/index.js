'use strict';

const fs = require('fs');
const mysql = require('mysql');
const { promisify } = require('util');
const inquirer = require('inquirer');
const pathFile = './assignment.json';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = promisify(connection.query.bind(connection));
const readFileAsync = promisify(fs.readFile);

const runExecution = async () => {
  connection.connect();
  try {
    const SELECT = await readFileAsync(pathFile);
    const data = JSON.parse(SELECT);

    // Step 1: 1
    const input = [
      {
        type: 'input',
        name: 'country',
        message: 'Write country',
      },
    ];
    console.log(data[0].name);
    const { country } = await inquirer.prompt(input);
    const output = await execQuery(data[0].query, country);
    output.forEach(element => console.log(element.capital));

    // Step 1: 2
    const input2 = [
      {
        type: 'input',
        name: 'region',
        message: 'Write region',
      },
    ];
    console.log(data[1].name);
    const { region } = await inquirer.prompt(input2);
    const output2 = await execQuery(data[1].query, region);
    output2.forEach(element => console.log(element.language));

    // Step 1: 3
    const input3 = [
      {
        type: 'input',
        name: 'language',
        message: 'Write language',
      },
    ];
    console.log(data[2].name);
    const { language } = await inquirer.prompt(input3);
    const output3 = await execQuery(data[2].query, language);
    output3.forEach(element => console.log(element.totalCity));

    // Step 1: 4
    const input4 = [
      {
        type: 'input',
        name: 'regionForLanguage',
        message: 'Write region for language',
      },
      {
        type: 'input',
        name: 'languageForRegion',
        message: 'Write language for region',
      },
    ];
    console.log(data[3].name);
    const { regionForLanguage, languageForRegion } = await inquirer.prompt(input4);
    const output4 = await execQuery(data[3].query, [
      regionForLanguage,
      languageForRegion,
      regionForLanguage,
      languageForRegion,
    ]);
    output4.forEach(element => console.log(element.name));

    // Step 1: 5
    console.log(data[4].name);
    const output5 = await execQuery(data[4].query);
    output5.forEach(element => console.log(element.continent, element.totalLanguage));
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
};

runExecution();
