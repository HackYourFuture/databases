const mysql = require('mysql');
const prompt = require('prompt');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password : 'hyfpassword',
    database: 'world'
});

connection.connect();

const capitalCity = `select name from city where id in (select capital from country where name = ?)`;

const regions = `select distinct language from countrylanguage where countrycode in (select code from country where region = ? )`;

const cities = `select count(distinct name) as 'total' from city where countrycode in (select countrycode from countrylanguage where language = ?)`;

const officialLanguage = `select name from country where region = ? 
    and code in(select countrycode from countrylanguage where language = ? and isofficial = 't')`;

const languages = `select country.continent, count(distinct language) as 'total language' from country
     join countrylanguage on country.code = countrylanguage.countrycode group by country.continent`;

prompt.start();
prompt.get('choice', (err, result) =>{
    if(err) {
        console.log(err);
    }
    switch (result.choice) {
        case '1':
            console.log('insert country name: ');
            prompt.get('country', (err, result) => {
                connection.connect();
                const query = mysql.format(capitalCity, result.country.split());
                connection.query(query, (err, result) => {
                    if(result[0] == undefined){
                        console.log('not found!');
                        connection.end();
                        return;
                    }
                    console.log(`Capital city of ${result.country} is ${result[0].name}`);
                    connection.end();
                });
            })
            break;
        case '2':
            console.log('insert region name: ');
            prompt.get('region', (err, result) => {
                const query = mysql.format(regions, result.region.split());
                connection.query(query, (err, result) => {
                    if(result[0] == undefined){
                        console.log('not found!');
                        connection.end();
                        return;
                    }
                    console.log(`Languages in ${result.region} are:`);
                    for (i in result) {
                        console.log(result[i].language);
                    }
                    console.log(`total:${result.length}`);
                    connection.end();
                });
            })
            break;
        case '3':
            console.log('insert language: ');
            prompt.get('language', (err, result) => {
                const query = mysql.format(cities, result.language.split());
                connection.query(query, (err, result) => {
                    if(result[0].total === 0){
                        console.log('not found!');
                        connection.end();
                        return;
                    }
                    console.log(`${res[0].total} cities speak ${result.language}`);
                    connection.end();
                });
            })
            break;
        case '4':
            console.log('insert region and language: ');
            prompt.get(['region', 'language'], (err, result) => {
                const query = mysql.format(officialLanguage, [result.region, result.language] );
                connection.query(query, (err, result) => {
                    if(result[0].total === 0){
                        console.log('not found!');
                        connection.end();
                        return;
                    }
                    console.log(`${result.language} is official language of:`);
                    for (i in res) {
                        console.log(`${res[i].name}`);
                    }
                    connection.end();
                });
            })
            break;
        case '5':
            connection.query(languages, (err,result) => {
                if (err) {
                    console.log(err);
                }
                console.log(`continent total language`);
                for(i in result){
                    console.log(`${result[i].continent} ${result[i]['total language']}`);
                }
                connection.end();
            })
            break;
        default:
            console.log('your choice are numbers : 1 , 2, 3, 4, 5.');
    }
});

console.log(`your choice are numbers : 1 , 2, 3, 4, 5.
________________________________________
Hint:
    1.What is the capital of country X ? (Accept X from user)
    2.List all the languages spoken in the region Y (Accept Y from user)
    3.Find the number of cities in which language Z is spoken (Accept Z from user)
    4.Accept the region and language from the user. Are there any countries in this region with the given language as the official language ? If yes, display those countries. If no, display FALSE. E.g. (A) input region : 'Western Europe' and input language : 'Dutch' output should be Belgium and Netherlands (B) input region : 'Western Europe' and input language : 'Hindi' output should be 'FALSE'
    5.List all the continents with the number of languages spoken in each continent
`);
