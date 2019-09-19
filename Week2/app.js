const prompts = require('prompts');
const util = require('util');
const use = `use new_world;`;

const {
  connection,
  dataHandler,
  handelError,
  questions1,
  questions2,
  userOptions,
  option,
} = require('./Utils');

const {
  sqlCapital,
  sqlLanguage,
  sqlCities,
  sqlCountries,
  sqlContinentsAndLanguages,
} = require('./queries');

const execQuery = util.promisify(connection.query.bind(connection));

(async () => {
  connection.connect(handelError('mysql connected...'));
  try {
    await execQuery(use);
    console.log('world used!');
    const choice = await prompts(userOptions);
    let response;
    switch (choice.userOption) {
      case option[0]:
        response = await prompts(questions1[0]);
        const capitalInfo = await execQuery(sqlCapital, response.capital);
        console.log(dataHandler(capitalInfo, (val = 'capital')));
        break;
      case option[1]:
        response = await prompts(questions1[1]);
        const languageInfo = await execQuery(sqlLanguage, response.region);
        console.log(dataHandler(languageInfo, (val = 'Language')));
        break;
      case option[2]:
        response = await prompts(questions1[2]);
        const citiesInfo = await execQuery(sqlCities, response.language);
        console.log(dataHandler(citiesInfo, (val = 'numberOfCities')));
        break;
      case option[3]:
        response = await prompts(questions2);
        const sameLanguageCountries = await execQuery(sqlCountries, [
          response.regionName,
          response.sameLanguage,
        ]);
        console.log(dataHandler(sameLanguageCountries, (val = 'name')));
        break;
      case option[4]:
        const continentsAndLanguages = await execQuery(sqlContinentsAndLanguages);
        console.log(dataHandler(continentsAndLanguages, (val = 'Continent'), (val = 'Languages')));
        break;
    }
  } catch (error) {
    console.log(error);
  }
  connection.end(handelError('Connection ended!'));
})();
