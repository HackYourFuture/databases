const mysql = require('mysql');
const prompts = require('prompts');
const { connection, execQuery } = require('./connection');
const { question1, question2, question3, question4, question5 } = require('./queries');

const getCapitalOfCountry = async () => {
  try {
    const response = await prompts({
      type: 'text',
      name: 'country',
      message: `What is the capital of ?`,
    });
    
    const capitalQuery = await execQuery(question1, response.country);
    const capitalOfCountry = capitalQuery[0].capital;
    console.log(capitalOfCountry);
  } catch (error) {
    console.log(`There is no country for this input. ${error.message}`);
  }
};

const getLanguagesInRegion = async () => {
  try {
    const response = await prompts({
      type: 'text',
      name: 'region',
      message: `List all the languages spoken in the region ...?`,
    });
    const regionQuery = await execQuery(question2, response.region);
    if (regionQuery.length === 0 ){
      console.log(`Type  valid region`)
    }else{
    regionQuery.map(elem => console.log(elem.language))
    }
  }
   catch (error) {
    console.log(error);
  }
};

const getTotalCityWithLanguage = async () => {
  try {
    const response = await prompts({
      type: 'text',
      name: 'language',
      message: `Find out how many cities speak this language?`,
    });
    const totalCitiesSpeakLanguage = await execQuery(question3, response.language);
    if (totalCitiesSpeakLanguage.length === 0) {
      console.log('There is no record.')
    } else {
      console.log(totalCitiesSpeakLanguage[0].total_cities)
    }
  } catch (error) {
    console.log(error);
  }
};

const getOfficialOrNot = async () => {
  const response = await prompts({
    type: 'list',
    name: 'value',
    message: 'Are there any countries uses this language officially or not?',
    initial: 'Ex:Middle East,Turkish',
    separator: ',',
  });
  const isOfficial = await execQuery(question4, response.value);
  if (isOfficial.length === 0) {
    console.log('false');
  } else {
    isOfficial.map(item => console.log(item.country));
  }
};

const getContinentTotalLanguages = async () => {
  try {
    const response = await prompts({
      type: 'text',
      name: 'language',
      initial: 'Press enter...',
      message: `Find out how many languages are spoken in each continent`,
    });
    const continentSpokenLanguage = await execQuery(question5);
    continentSpokenLanguage.map(item =>
      console.log(`${item.total_spoken_language} languages are spoken in ${item.continent}`),
    );
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  try {
    await getCapitalOfCountry();
    await getLanguagesInRegion();
    await getTotalCityWithLanguage();
    await getOfficialOrNot();
    await getContinentTotalLanguages();
  } catch (error) {
    console.log(error.message);
  } finally {
    connection.end();
  }
})();
