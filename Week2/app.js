'use strict';

const mysql = require('mysql');
const process = require('process')
const inquirer = require('inquirer');
const util = require('util');
const test = require('./importData.js');
const prompt = require('prompt');


    // 1- create connection 
const db =  mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'mosleh1234'
});


// 2- connect 

    db.connect((err) => {
    if(err) {
        throw err;
    }
    // console.log('Mysql connected');
});
// 3- Create database 
// let sql = 'CREATE DATABASE IF NOT EXISTS new_world';
//  db.query(sql, (err) =>{
//    if(err) throw err;
// })
// 4- use database new_world
 db.query('USE new_world;', err => {
    if (err) throw err;
  });

// const queryPromise = await util.promisify(db.query.bind(db));

  const queryPromise =  util.promisify(db.query.bind(db));
  const [_, __, ...question] = process.argv;
 
  async function main(){
      
//   1- What is the capital of country X ? (Accept X from user)   
        if (question[0] === 'capital') {
            const input1 = await inquirer.prompt([
            { name: 'Country', message: 'Insert Country:' },
                ]);
                const sql1 = `SELECT city.Name FROM country JOIN city on city.ID = country.Capital WHERE country.Name = ?`;
            
                let result1 = await queryPromise(sql1, input1.Country);
                   if (result1[0] === undefined) {
                    
                    console.log(`${input1.Country} is not exist in database, please insert a valid value`);   
                } 
                else {
                    console.log(`The capital of ${input1.Country} is: ${result1[0].Name}`);
        } 
   

// 2- List all the languages spoken in the region Y (Accept Y from user)
     } else if(question[0] === 'languages'){
        const input2 = await inquirer.prompt([
            { name: 'Region', message: 'Insert region:' },
             ]);
             const sql2 = `SELECT distinct Language FROM country join countrylanguage on country.Code=countrylanguage.CountryCode where Region =?`;
             let result2 = await queryPromise(sql2, input2.Region);
             if (result2[0]=== undefined) {
                 console.log(`${input2.Region} is not exist in database, please insert a valid value`);
                 
             } else {
                 console.log(`The spoken languages in ${input2.Region} are:`);
                 console.log(result2)
             }
// 3- Find the number of cities in which language Z is spoken (Accept Z from user)
     } else if (question[0] === 'number of cities'){
        const input6 = await inquirer.prompt([
                { name: 'language', message: 'Insert language:' },
                ]);
        const sql6 = `SELECT  count(city.name) as Cities FROM city join countrylanguage on city.CountryCode = countrylanguage.CountryCode where Language=? `;
                        let result6 = await queryPromise(sql6, input6.language);
                        if (result6[0].Cities === 0) {
                            console.log(`${input6.language} is not exist in database, please insert a valid value`);
                         
                        } else {
                            console.log(`The number of cities which speaking in ${input6.language} is: ${result6[0].Cities}`);
                        }
// 4- Accept the region and language from the user. Are there any countries in this region with the given language as the official language 
     
     } else if(question[0] === 'official language'){
        const input4 = await inquirer.prompt([
             { name: 'Region', message: 'Insert Region:' },
             { name: 'language', message: 'Insert language:' },
        ]);
        const sql4 = `SELECT Name as Country FROM country join countrylanguage on country.Code=countrylanguage.CountryCode where Region =? and Language=? and IsOfficial='T'; `;
        let result4 = await queryPromise(sql4, [input4.Region, input4.language,input4.official]);
            if (result4[0] === 0 ) {
                console.log(`${input4.language} is not official language in any country in ${input4.Region} `);
            } else {
                console.log(`${input4.language} is official language in:`);
                console.log(result4)
                           
            }
// 5- List all the continents with the number of languages spoken in each continent
    }else if (question[0] === 'languages in continent' ) {
                    const sql5 = `SELECT Continent, COUNT(DISTINCT Language) as Languages FROM country join countrylanguage on country.Code=countrylanguage.CountryCode GROUP BY Continent`;
                    let result5 = await queryPromise(sql5);
                    console.log(result5);
// 6- Get alerts when I want to insert row if a country has >= 10 languages.

} else if (question[0] === 'insert row'){
   
    const  sql6 = 'SELECT  name AS Country, COUNT(Language) AS Number_of_Languages FROM countrylanguage JOIN country ON countrylanguage.CountryCode = country.Code GROUP BY name'
    const trigger = `CREATE TRIGGER languageTrigger 
                            BEFORE INSERT ON countrylanguage
                            FOR EACH ROW
                            BEGIN
                            DECLARE message VARCHAR(100);
                            DECLARE Number_of_Languages INT;
                            SET Number_of_Languages = (select COUNT(Language) from countryLanguage where CountryCode=new.CountryCode);
                                 IF Number_of_Languages >= 10
                                   THEN
                                    set message = 'Warning: Inserted country has more than 10 languages';
                                    SET lc_messages = message; 
                                    SIGNAL SQLSTATE '45000';
                                END IF;
                            END;`
    let result6 = await queryPromise(sql6);
    let countriesWithMoreThanNineLang =  await result6
                            .filter(element => element.Number_of_Languages >= 10)
                            .map(ele => ele.Country)
    const input6 = await inquirer.prompt([
                    { name: 'value', message: 'Insert Country:' },
                     ]);
           
    let sql6_1 = 'insert into countrylanguage SET  CountryCode = ?, Language =?, IsOfficial=?, Percentage =? ';
            
            if (countriesWithMoreThanNineLang.includes(input6.value)){
                 console.log(`Warning: ${input6.value} has more than 9 languages.\nNot allowed to add this row` )
                            db.query(trigger , (err) => {
                            if(err) throw err;
                          });
                   
                } else {
                    const input6_1_1 =  await inquirer.prompt([
                        {name: 'code', message:'Insert code:'},
                        {name: 'language', message:'Insert language:'},
                        {name: 'IsOfficial', message:'Insert "t" or "f": '},
                        {name: 'Percentage', message:'Insert insert percentage:'},
                    ]);
                    db.query(sql6_1 ,[input6_1_1.code, input6_1_1.language, input6_1_1.IsOfficial,input6_1_1.Percentage], (err) => {
                        if(err) throw err;
                        console.log(`New language inserted to ${input6.value} in table countrylanguage`)
                            });
                }
     
          
        } else if(question[0] === undefined || question[0] === null){
        
        console.log(`please run node app again with providing one of the following arguments:
         'capital'               : To show the capital of country X ? (Accept X from user)
         'languages'             : To list all the languages spoken in the region Y (Accept Y from user)
         'number of cities'      : To find the number of cities in which language Z is spoken (Accept Z from user)
         'official language'     : To show if is the specific language in countries in specific region official
         'languages in continent': To list all the continents with the number of languages spoken in each continent.
         'insert row'            : Get alerts when I want to insert row if a country has >= 10 languages.
         `)

        }
 
    db.end();
}
main()
