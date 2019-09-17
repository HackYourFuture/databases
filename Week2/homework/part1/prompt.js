'use strict';

const rl = require('readline');
const prompt = question => {
  const readLine = rl.createInterface(process.stdin, process.stdout);
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, _reject) => {
    readLine.question(question, answer => {
      resolve(answer);
      readLine.close();
    });
  });
};

const options = `

1. What is the capital of country X ? 
2. List all the languages spoken in the region Y
3. Find the number of cities in which language Z is spoken 
4. Accept the region and language from the user.
   Are there any countries in this region with the given language
   as the official language ?  
5. List all the continents with the number of languages spoken in each continent

Enter the number as an option:
`;

const country = 'Enter a country:';
const region = 'Enter a region:';
const language = 'Enter a language:';

module.exports = { prompt, options, country, region, language };
