const inquirer = require('inquirer');
const { execQuery, con } = require('./connection');
const {
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
} = require('./queries');

const queryCapital = async () => {
  const { countryName } = await inquirer.prompt(input1);
  const result = await execQuery(Query1, countryName);
  console.log(`The capital city of ${countryName} is ${result[0].capital}`);
};
const queryLanguages = async () => {
  const { regionName } = await inquirer.prompt(input2);
  const result = await execQuery(Query2, regionName);
  console.log(
    `Languages spoken in the region of ${regionName}:\n`,
    result.map(item => Object.values(item).toString()),
  );
};
const queryCities = async () => {
  const { languageName } = await inquirer.prompt(input3);
  const result = await execQuery(Query3, languageName);
  console.log(`The language of ${languageName} is spoken in ${result[0].Number_Of_Cities} cities`);
};
const queryOfficiallanguages = async () => {
  const { regionName, languageName } = await inquirer.prompt(input4);
  const result = await execQuery(Query4, [regionName, languageName]);
  const answer = result.length === 0 ? 'FALSE' : result.map(item => Object.values(item).toString());
  console.log(`Countries  in the ${regionName}(where ${languageName} is official language):`);
  console.log(answer);
};
const queryContinents = async () => {
  const result = await execQuery(Query5);
  Object.entries(result[0]).forEach(([key, value]) => console.log(`${key}: ${value}`));
};
const explanation = `           OPTIONS
1. What is the capital of country X ? 
2. List all the languages spoken in the region Y
3. Find the number of cities in which language Z is spoken 
4. Accept the region and language from the user.Are there any countries in 
   this region with the given language as the official language ?  
5. List all the continents with the number of languages spoken in each continent\n`;
async function seedDatabase() {
  try {
    con.connect();

    console.log(explanation);
    const { choice } = await inquirer.prompt(input5);
    switch (choice) {
      case '1':
        await execQuery(queryCapital);
        break;
      case '2':
        await execQuery(queryLanguages);
        break;
      case '3':
        await execQuery(queryCities);
        break;
      case '4':
        await execQuery(queryOfficiallanguages);
        break;
      case '5':
        await execQuery(queryContinents);
        break;
      default:
        console.log('Invalid option!');
    }
    con.end();
  } catch (err) {
    console.error(err.message);
    con.end();
  }
}

seedDatabase();
