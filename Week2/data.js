const prompts = require('prompts');

async function getData() {
  try {
    const userInputs = [
      {
        type: 'text',
        name: 'Name',
        validate: Name =>
          !Name.match(/^[a-zA-Z\s\-]+$/)
            ? 'Name is not valid, it can only contains letters, spaces, or dashes'
            : true,
        message: 'What is the capital of country? ENTRY COUNTRY: ',
        initial: 'Netherlands',
      },
      {
        type: 'text',
        name: 'Region',
        validate: Region =>
          !Region.match(/^[a-zA-Z\s\-]+$/)
            ? 'Region is not valid, it can only contains letters, spaces, or dashes'
            : true,
        message: 'List all the languages spoken in the region. ENTRY REGION: ',
        initial: 'Middle East',
      },
      {
        type: 'text',
        name: 'Language',
        validate: Language =>
          !Language.match(/^[a-zA-Z\s\-]+$/)
            ? 'Language is not valid, it can only contains letters, spaces, or dashes'
            : true,
        message: 'Find the number of cities in which language is spoken. ENTRY LANGUAGE: ',
        initial: 'English',
      },
      {
        type: 'text',
        name: 'Region2',
        validate: Region2 =>
          !Region2.match(/^[a-zA-Z\s\-]+$/)
            ? 'Region is not valid, it can only contains letters, spaces, or dashes'
            : true,
        message:
          'Are there any countries in given region with the given language as the official language? ENTRY REGION: ',
        initial: 'Western Europe',
      },
      {
        type: 'text',
        name: 'Language2',
        validate: Language2 =>
          !Language2.match(/^[a-zA-Z\s\-]+$/)
            ? 'Language is not valid, it can only contains letters, spaces, or dashes'
            : true,
        message:
          'Are there any countries in given region with the given language as the official language? ENTRY LANGUAGE: ',
        initial: 'Dutch',
      },
    ];

    const response = await prompts(userInputs);

    const dataSet = [
      {
        question: 'What is the capital of country X ? (Accept X from user)',
        query:
          'select city.Name as Capital_Of_Country from city where ID in(select Capital from country where Name = ?)',
        input: [response.Name],
      },
      {
        question: 'List all the languages spoken in the region Y (Accept Y from user)',
        query:
          'select distinct Language as Languages from countryLanguage where CountryCode in(select code from country where Region = ?)',
        input: [response.Region],
      },
      {
        question: 'Find the number of cities in which language Z is spoken (Accept Z from user)',
        query:
          'select Count(*) as Number_Of_Cities from city where CountryCode in(select CountryCode from countryLanguage where Language = ?)',
        input: [response.Language],
      },
      {
        question:
          "Accept the region and language from the user. Are there any countries in this region with the given language as the official language ? If yes, display those countries. If no, display FALSE. E.g. (A) input region : 'Western Europe' and input language : 'Dutch' output should be Belgium and Netherlands (B) input region : 'Western Europe' and input language : 'Hindi' output should be 'FALSE'",
        query:
          "select Name as Countries from country where region = ? and Code in(select CountryCode from countryLanguage where Language = ? and IsOfficial = 'T')",
        input: [response.Region2, response.Language2],
      },
      {
        question: 'List all the continents with the number of languages spoken in each continent',
        query:
          'select Continent, COUNT(distinct Language) as Number_Of_Spoken_Language from country left join countryLanguage on Code = countryCode group by continent',
        input: '',
      },
    ];
    return dataSet;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getData,
};
