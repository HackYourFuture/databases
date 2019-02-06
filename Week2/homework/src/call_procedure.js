'use-strict';
const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function call_procedure(query, colm1, colm2) {

  try {
    const result = await execQuery(query);
    if (colm2 === undefined) {
      for (let index = 0; index < result.length; index++) {
        for (let j = 0; j < result[index].length; j++) {
          console.log(` ${result[index][j][colm1]}`);
        }
      }
      console.log(result[0].length + ' row(s) in set');
      console.log('-------------------');
    } else {

      for (let index = 0; index < result.length; index++) {
        for (let j = 0; j < result[index].length; j++) {
          console.log(` ${result[index][j][colm1]}  ---  ${result[index][j][colm2]} `);
        }
      }

      console.log(result[0].length + ' row(s) in set');
      console.log('-------------------');

    }
  } catch (error) {
    console.error(new Error(`this is error message : ${error}`));
  }

}
connection.connect();

call_procedure('CALL GetCapital_city("Eritrea");', 'Name') // Q.NO.1  
call_procedure('CALL GetRegion_language("southern africa")', 'language') // Q.No.2
call_procedure('CALL GetCities_language("swahili")', 'name') // Q.No.3 
call_procedure('CALL GetCountries_Reg_lang("eastern africa","English");', 'Name'); // Q.No 4 
//call_procedure('CALL GetCountries_Reg_lang("eastern africa","Amharic");', 'Name'); // Q.No 4   if not founded
call_procedure('CALL LanguagesByContinent();', 'Continent', 'count') // Q.No 5

connection.end();


/*
// part 2  SQL Research
``
delimiter //
`CREATE TRIGGER Insert_trigger
    BEFORE INSERT
        ON countrylanguage
            FOR EACH ROW
            BEGIN
                DECLARE message VARCHAR(100);
                DECLARE cc int ;
                SET cc = (select COUNT(*) count from countrylanguage  where CountryCode =New.CountryCode);
                IF cc > 10
                THEN
                    set message= '10 languages already available';
                    SET lc_messages=message; SIGNAL SQLSTATE '45000';
                END IF;
            END //


delimiter ;`
``
//  examples
insert into countrylanguage values('AGO','new','F',12.2);
insert into countrylanguage values('AGO','newLa','F',12.2);

*/