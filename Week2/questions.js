const firstPromptQuestion = [
  {
    type: 'list',
    name: 'decision',
    message: 'What do you want to do?',
    choices: ['Query database: "new_world"', 'Quit'],
  },
];

const queriesPromptQuestion = [
  {
    type: 'list',
    name: 'decision',
    message: 'What do you want to query?',
    choices: [
      '1) The capital of a country!',
      '2) All the languages spoken in a region!',
      '3) Number of cities in which a specific language is spoken!',
      '4) Any countries in a specific region with a specific language as the official language!',
      '5) All the continents with the number of languages spoken in each continent',
    ],
  },
];

const queryQuestions = [
  {
    type: 'input',
    name: 'country',
    message: 'Please enter the name of the country: ',
  },
  {
    type: 'input',
    name: 'region',
    message: 'Please enter the name of the region: ',
  },
  {
    type: 'input',
    name: 'language',
    message: 'Please enter the name of the language: ',
  },
  [
    {
      type: 'input',
      name: 'region',
      message: 'Please enter the name of the region: ',
    },
    {
      type: 'input',
      name: 'language',
      message: 'Please enter the name of the language: ',
    },
  ],
  null, // no input required
];

const queries = [
  ({ country }) =>
    `SELECT city.Name as capitalCity FROM city INNER JOIN country ON city.ID = country.Capital WHERE country.Name = '${country}'`,
  ({ region }) =>
    `SELECT Language FROM countryLanguage WHERE CountryCode IN (SELECT CountryCode FROM city INNER JOIN country ON country.Capital = city.ID WHERE country.Region = '${region}')`,
  ({ language }) =>
    `SELECT COUNT(city.ID) as numberOfCities, Language FROM city INNER JOIN countryLanguage ON city.CountryCode = countryLanguage.CountryCode WHERE countryLanguage.Language = '${language}'`,
  ({ region, language }) =>
    `SELECT country.Name as Country FROM country INNER JOIN city ON city.ID = country.Capital WHERE country.Region = '${region}' AND city.CountryCode IN (SELECT CountryCode FROM countryLanguage WHERE Language = '${language}' AND IsOfficial = 'T')`,
  () =>
    'SELECT COUNT(countryLanguage.Language) as numberOfLanguagesSpoken, country.Continent FROM country INNER JOIN city ON country.Capital = city.ID INNER JOIN countryLanguage ON city.countryCode = countryLanguage.countryCode GROUP BY country.Continent;',
];

module.exports = {
  firstPromptQuestion,
  queriesPromptQuestion,
  queryQuestions,
  queries,
};
