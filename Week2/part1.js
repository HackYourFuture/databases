const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world'
});

// Promisify the bind function of query function of connection object
// Pass connection object (because bind expects "this")
// Afterwards execQuery will work as a function that returns a promise but
// we don't have to call "then" over that promise
const execQuery = util.promisify(connection.query.bind(connection));

const countryLang1 = [
  {
    'countryCode': 'ABW',
    'language': 'XXX',
    'isOfficial': 'F',
    'percentage': 3,
  }
];
const countryLang2 = [
  {
    'countryCode': 'KEN',
    'language': 'XXX',
    'isOfficial': 'F',
    'percentage': 13,
  }
];

switch (process.argv[2]) {
  case 'help':
    console.log("Usage of the program:");
    console.log("node part1.js help");
    console.log("node part1.js 1 'TURKEY' (1. What is the capital of country X ? )");
    console.log("node part1.js 2 'Middle East' (2. List all the languages spoken in the region Y )");
    console.log("node part1.js 3 'Turkish' (3. Find the number of cities in which language Z is spoken )");
    console.log("node part1.js 4 'Turkish' (4. Are there any countries that have A) Same official language B) Same region If yes, display those countries. If no, display TRUE or FALSE)");
    console.log("node part1.js 5 (5. List all the continents with the number of languages spoken in each continent)");
    console.log("node part1.js 6 'KEN' 'XXX' 'F' 13");
    break;
  case '1':
    getCapitalOfCountry(process.argv[3]);
    break;
  case '2':
    getSpokenLanguagesInRegion(process.argv[3]);
    break;
  case '3':
    getNumOfCitiesSpokenLang(process.argv[3]);
    break;
  case '4':
    getCountriesSpeekSameLanguageInSameRegion(process.argv[3]);
    break;
  case '5':
    getLangInContinents();
    break;
  case '6':
    insertNewLang(process.argv[3], process.argv[4], process.argv[5], process.argv[6]);
    break;
  default:
    console.log('Wrong choice');
}


//1. What is the capital of country X ? (Accept X from user)
function getCapitalOfCountry(name) {
  const query = 'select * from city where id = (select Capital from country where name =\"' + name + '\")';
  getResult(query);
}

//2. List all the languages spoken in the region Y (Accept Y from user)
function getSpokenLanguagesInRegion(region) {
  const query = 'select DISTINCT language from CountryLanguage where CountryCode in ( select Code from country where Region=\"' + region + '\");'
  getResult(query);
}

//3. Find the number of cities in which language Z is spoken (Accept Z from user)
function getNumOfCitiesSpokenLang(lang) {
  const query = 'select count(*) from city where CountryCode in (select CountryCode from countryLanguage where language=\"' + lang + '\");'
  getResult(query);
}

//4. Are there any countries that have A) Same official language 
//B) Same region If yes, display those countries.If no, display TRUE or FALSE
function getCountriesSpeekSameLanguageInSameRegion(lang) {
  const query = 'select Code, Name, Region from country where Code in (select CountryCode from CountryLanguage where Language = \"' + lang + '\" and isofficial=\"T\") ORDER BY Region;'
  getResult(query);
}
//5. List all the continents with the number of languages spoken in each continent
function getLangInContinents() {
  const query = 'select count(language),continent from countryLanguage, country where CountryCode in (select Code from country order by continent) and countryCode=code GROUP BY continent;';
  getResult(query);
}

//Part2
async function insertNewLang(countryCode, language, isOfficial, percentage) {
  connection.connect();
  ////select * from (select countryCode, count(language) as sumLang from countryLanguage group by countryCode) as a where sumLang>9;
  //const query = 'select * from (select countryCode, count(language) as sumLang from countryLanguage group by countryCode) as a where sumLang>9 and countryCode=\"' + newCountryLanguage.countryCode + '\";'
  const query = 'select count(language)  as langNum from countryLanguage where countryCode=\"' + countryCode + '\";';
  const queryInsert = "insert into countryLanguage values ('" + countryCode + "','" + language + "','" + isOfficial + "','" + percentage + "')";
  console.log(queryInsert);
  try {
    await execQuery(queryInsert);
    const result = await execQuery(query);
    if (result[0].langNum >= 10) {
      console.log('How can I achieve this ?');
    }
  } catch (error) {
    console.log(error);
  }
  connection.end();
}

function getResult(query) {
  connection.connect();

  connection.query(query, function (error, results, fields) {
    //console.log('************************************');
    if (error) { throw error; }
    console.log(results);
    //console.log('************************************');
    return results;
  });
  connection.end();
}
//connection.end();
