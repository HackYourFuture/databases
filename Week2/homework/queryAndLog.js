'use-strict';

const one = `CALL spQuery1(?);`;

const two = `CALL spQuery2(?);`;

const three = `CALL spQuery3(?);`;

const four = `CALL spQuery4(?,?);`;

const five = `CALL spQuery5;`;

const help = `
          [ HackYourFuture databases Week 2 Homework ]
          
To make the app work properly, those steps have to be followed:

1 - Run the sql code in world.sql file in MySQL prompt..
2 - Run the sql code in storedProcedure.sql file in MySQL prompt.
3 - Run the sql code in alert.sql file in MySQL prompt.
4 - You can now run the app by typing 'node app.js' and choose queries.
Usage:
 You can use the App by running 'node app.js'
Options:
 
  1.............the capital of country X
  2.............List all the languages spoken in the region Y
  3.............Find the number of cities in which language Z is spoken
  4.............Are there any countries in this region with the given language as the official language
  5.............List all the continents with the number of languages spoken in each continent

  `;

module.exports = {
  one,
  two,
  three,
  four,
  five,
  help,
};
