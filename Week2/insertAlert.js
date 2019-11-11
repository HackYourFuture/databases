const mysql = require('mysql');
const { promisify } = require('util');

const CREATE_MAX_ENTRY_TRIGGER = `
                CREATE TRIGGER maximum_entry_trigger 
                BEFORE INSERT ON countryLanguage 
                FOR EACH ROW BEGIN 
                DECLARE message VARCHAR(100); 
                DECLARE languageAmount int; 
                SET languageAmount= (select COUNT(language) from countrylanguage where countryCode=new.countryCode); 
                IF languageAmount >= 10 
                THEN 
                    set message ='There are more than 9 Languages related to this Country'; 
                    SET lc_messages= message; 
                    SIGNAL SQLSTATE '45000';
                END IF; 
                END;`;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

const execQuery = promisify(connection.query.bind(connection));

const seedDatabase = async countryCode => {
  const DROP_TRIGGER = `DROP TRIGGER IF EXISTS maximum_entry_trigger;`;

  const DELETE_NEW_ENTRY = `DELETE FROM countrylanguage WHERE language= 'newLanguage'`;

  const INSERT_NEW_LANGUAGE = ` INSERT INTO countrylanguage  (language,countryCode) values ('newLanguage', ?)`;

  connection.connect(err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connection succeed!');
    }
  });
  try {
    await execQuery(DROP_TRIGGER);
    await execQuery(CREATE_MAX_ENTRY_TRIGGER);
    await execQuery(DELETE_NEW_ENTRY);
    const result = await execQuery(INSERT_NEW_LANGUAGE, [countryCode]);
    console.log('Entry succeed!');
    console.table(result);
  } catch (error) {
    console.error(error);
  }
  connection.end(err => {
    if (err) {
      console.error(err);
    } else {
      console.log('Connection successfully ended!');
    }
  });
};

const [, , countryCode] = process.argv;

seedDatabase(countryCode);
