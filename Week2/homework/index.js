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

const noMatch = 'NO match is found in the database!\nBe sure that you typed a valid word';

connection.connect(function(err) {
    if (err) console.log(err);
});

(async() => {
    try {
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
                const query1 = `SELECT city.Name FROM country JOIN city on city.ID = country.Capital WHERE country.Name = ?`;
                let result1 = await queryPromise(query1, userInput1.countryName);
                if (result1.length === 0) {
                    console.log(noMatch);
                    break;
                } else {
                    console.log(`The capital name is: ${result1[0].Name}`);
                    break;
                }

            case options.second:
                const userInput2 = await inquirer.prompt([
                    { name: 'regionName', message: 'What is your the region?' },
                ]);
                const query2 = `SELECT distinct Language FROM country join countrylanguage on country.Code=countrylanguage.CountryCode where Region =?`;
                let result2 = await queryPromise(query2, userInput2.regionName);

                if (result2.length === 0) {
                    console.log(noMatch);
                    break;
                } else {
                    console.log(`The languages are:`);
                    result2.forEach(element => console.log(element.Language));
                    break;
                }

            case options.third:
                const userInput3 = await inquirer.prompt([
                    { name: 'languageName', message: 'What is language ?' },
                ]);
                const query3 = `SELECT  count(city.name) as Cities FROM city join countrylanguage on city.CountryCode=countrylanguage.CountryCode where Language=? `;
                let result3 = await queryPromise(query3, userInput3.languageName);
                if (result3[0].Cities === 0) {
                    console.log(noMatch);
                    break;
                } else {
                    console.log(`The number of cities is: ${result3[0].Cities}`);
                    break;
                }
            case options.fourth:
                const userInput4 = await inquirer.prompt([
                    { name: 'regionName', message: 'What is the region?' },
                    { name: 'languageName', message: 'What is the language?' },
                ]);
                const query4 = `SELECT Name FROM country join countrylanguage on country.Code=countrylanguage.CountryCode where Region =? and Language=?; `;
                let result4 = await queryPromise(query4, [userInput4.regionName, userInput4.languageName]);
                if (result4.length === 0) {
                    console.log(noMatch);
                    break;
                } else {
                    console.log(`The counties are:`);
                    result4.forEach(element => console.log(element.Name));
                    break;
                }

            case options.fifth:
                const query5 = `SELECT distinct Continent , Language FROM country join countrylanguage on country.Code=countrylanguage.CountryCode order by Continent`;
                let result5 = await queryPromise(query5);
                result5.forEach(element => {
                    console.log(`Continent: ${element.Continent} || Language: ${element.Language}.`);
                });
                break;
        }
    } catch (err) {
        console.log(err.message);
    } finally {
        connection.end(function(err) {
            if (err) {
                return console.log('error:' + err.message);
            }
            console.log('The  connection to the database is closed.\nYou can run the file agin.');
        });
    }
})();

//