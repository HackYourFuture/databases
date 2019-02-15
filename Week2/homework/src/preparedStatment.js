const util = require('util');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = util.promisify(connection.execute.bind(connection));

async function createPreparedStm() {
  connection.connect();

  function formatedoutput(result) {
    for (let index = 0; index < result.length; index++) {
      console.log(Object.values(result[index]).join(' ---------- '));
    }
    console.log(result.length + ' row(s) in set');
    console.log('-------------------');
  }

  try {
    const q1 = await execQuery(
      'select city.Name from city,country where country.name =? and ID =capital;',
      ['Eritrea'],
    );
    formatedoutput(q1);

    const q2 = await execQuery(
      `SELECT DISTINCT country.Name, countrylanguage.language  FROM countrylanguage INNER JOIN country
        ON country.Code = countrylanguage.CountryCode
       WHERE country.Region = ?;`,
      ['southern africa'],
    );
    formatedoutput(q2);

    const q3 = await execQuery(
      `SELECT city.name FROM city JOIN countrylanguage  USING(CountryCode)
         WHERE countrylanguage.language =?;`,
      ['swahili'],
    );
    formatedoutput(q3);

    const q4 = await execQuery(
      ` SELECT country.Name FROM country JOIN countrylanguage ON country.code = countrylanguage.CountryCode
      WHERE countrylanguage.language =?
      and country.Region = ?
    and Isofficial = 'T';`,
      ['English', 'Eastern africa'],
    );
    if (q4.length <= 1) {
      console.log('False: No countries on the given region with same official language');
    } else {
      formatedoutput(q4);
    }

    const q5 = await execQuery(
      `SELECT country.Continent, COUNT(*) count from country JOIN countrylanguage ON country.Code = countrylanguage.CountryCode
       GROUP BY country.Continent  ORDER BY COUNT(*) DESC;`,
    );
    formatedoutput(q5);
  } catch (error) {
    console.log('this is an error ' + error);
  }
  connection.end();
}
createPreparedStm();


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