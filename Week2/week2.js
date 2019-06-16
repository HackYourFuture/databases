const mysql = require('mysql');
const prompt = require('prompt');
const util = require('util');
const myQueries = require("./queryPackage");


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
});

db.connect(err => {
  if (err) throw err;
//   console.log('DB connection successful...');
});

const use_db = `USE new_world`;
db.query(use_db, (err) => {
  if (err) throw err;
//   console.log('DB <new_world> selected...');
});

const execQuery = util.promisify(db.query.bind(db))
const input = util.promisify(prompt.get.bind(this))


const introMessage = `Please select one of the following queries by typing in their number:
Press 1 for "What is the capital of country X ?"
Press 2 for "List all the languages spoken in the region Y"
Press 3 for "Find the number of cities in which language Z is spoken"
Press 4 for "Are there any countries in a given region with the given language as the official language?"
Press 5 for "List of all the continents with the number of languages spoken in each continent."
`
async function getQuery() {
  console.log(introMessage)
  const result = await input(['userInput']);
  const userInput = result.userInput;
  return userInput;
}
const command = getQuery();

if(command === '1') {
  queryDatabase(myQueries.languagesInACountry);
} else if (command === '2'){
  queryDatabase(myQueries.capitalCityQuery);
} else if (command === '3') {
  queryDatabase(myQueries.numberOfCitiesLangSpoken);
} else if (command === '4') {
  queryDatabase(myQueries.languagesInARegion);
} else if (command === '5') {
  queryDatabase(myQueries.officialLanguagesInRegion);
} else {
  // console.log("Invalid command. See below for possible options:");
  // console.log(introMessage);
};


async function queryDatabase(query) {
    prompt.start();
    try {
        const result1 = await input(['userInput']);
        const userInput1 = result1.userInput                         
        // console.log(userInput);
        // console.log(query);
        const results = await execQuery(query, userInput1);
        console.log("Result of your query:")
        for (r of results) {
            console.log(`${r}`)
        }                                  
    } catch(error) {
        console.error(error);
    }
    db.end();
}


