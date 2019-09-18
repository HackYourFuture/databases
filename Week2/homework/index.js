const inquirer = require('inquirer');
const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'new_world',
});

const queryPromise = util.promisify(connection.query.bind(connection));

const options = {
    first: '1.What is the capital of country X ? ',
    second: '2.List all the languages spoken in the region Y ',
    third: '3.Find the number of cities in which language Z is spoken ',
    fourth: '4.Accept the region and language from the user. ',
    fifth: '5.List all the continents with the number of languages spoken in each continent',
};

(async() => {
    const userChoice = await inquirer.prompt([{
        type: 'list',
        name: 'mainChoice',
        message: 'make your choice?',
        choices: [options.first, options.second, options.third, options.fourth, options.fifth],
    }, ]);

    switch (userChoice.mainChoice) {
        case options.first:
            const userInput1 = await inquirer.prompt([
                { name: 'countryName', message: 'What is the country?' },
            ]);
            const query1 = `SELECT city.Name FROM country JOIN city on city.ID = country.Capital WHERE country.Name = ?;`;
            let result1 = await queryPromise(query1, userInput1.countryName);
            console.log(result1);
            break;
        case options.second:
            const userInput2 = await inquirer.prompt([
                { name: 'regionName', message: 'What is your the region?' },
            ]);
            console.log('the region is : ' + userInput2.regionName);
            break;
        case options.third:
            const userInput3 = await inquirer.prompt([
                { name: 'languageName', message: 'What is language ?' },
            ]);
            console.log('the language  is : ' + userInput3.languageName);
            break;
        case options.fourth:
            const userInput4 = await inquirer.prompt([
                { name: 'regionName', message: 'What is the region?' },
                { name: 'languageName', message: 'What is the language?' },
            ]);
            console.log(`Region: ${userInput4.regionName}, Language: ${userInput4.languageName}`);
            break;
        case options.fifth:
            console.log('run MySQL query');
    }
    connection.end();
})();

//