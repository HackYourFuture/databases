const Query1 = `
SELECT
city.Name AS capital
FROM
country,
city
WHERE
country.Capital = city.id
AND country.Name = ? `;
const Query2 = `
SELECT DISTINCT
countrylanguage.Language
FROM
country,
countrylanguage
WHERE
countrylanguage.countrycode = country.code
AND country.Region = ? `;

const Query3 = `
SELECT COUNT(*) as Number_Of_Cities 
FROM city WHERE CountryCode 
IN(SELECT CountryCode FROM countryLanguage WHERE Language = ?) `;

const Query4 = `SELECT Name as Countries 
FROM country WHERE region = ? and Code 
IN(SELECT CountryCode FROM countryLanguage WHERE Language = ? and IsOfficial = 'T')`;

const Query5 = `SELECT country.Continent,
COUNT(DISTINCT countrylanguage.language) AS Number_Of_Spoken_Languages  
FROM country,
countrylanguage 
WHERE  country.code=countrylanguage.countryCode
GROUP BY continent
    ORDER BY Number_Of_Spoken_Languages DESC`;

const input1 = [
  {
    type: 'input',
    name: 'countryName',
    message: 'What is the name of country?',
  },
];
const input2 = [
  {
    type: 'input',
    name: 'regionName',
    message: 'What is the name of region?',
  },
];
const input3 = [
  {
    type: 'input',
    name: 'languageName',
    message: 'What is the name of language?',
  },
];
const input4 = [
  {
    type: 'input',
    name: 'regionName',
    message: 'What is the name of region?',
  },
  {
    type: 'input',
    name: 'languageName',
    message: 'What is the name of language?',
  },
];

const input5 = [
  {
    type: 'list',
    name: 'choice',
    message: 'What is your choice(1,2,3,4,5)?',
    choices: ['1', '2', '3', '4', '5'],
  },
];
module.exports = {
  Query1,
  input1,
  Query2,
  input2,
  Query3,
  input3,
  Query4,
  input4,
  Query5,
  input5,
};
