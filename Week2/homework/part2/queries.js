const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser2',
  password: 'hyfpassword',
  database: 'new_world',
  multipleStatements: false,
});

const help = () => {
  console.log(
    '\nTo add trigger for Vietnam type <node . trigger> \nTo insert new language for Vietnam type <node . insert>\n'
  );
  connection.end();
};

const addTrigger = () => {
  connection.connect(err => {
    if (err) throw err;
    console.log('Connected...');
    const sql = `
  DROP TRIGGER IF EXISTS language_check;   
  DELIMITER $
  CREATE TRIGGER language_check
     AFTER INSERT ON countrylanguage FOR EACH ROW
       BEGIN
         IF (SELECT COUNT(DISTINCT Language)
             FROM countrylanguage where countrycode = 'VNM') >= 10
         THEN
           SIGNAL SQLSTATE '02000' SET MESSAGE_TEXT = 'Warning: The number of language that is spoken in this country is bigger than 10';
         END IF;
       END;
  $
  DELIMITER ;
  `;
    connection.query(sql, (err, result) => {
      if (err) console.log(err); // throw err;
      console.log('Trigger deleted.');
    });
    connection.end();
  });
};

const insertLanguage = () => {
  connection.connect();
  connection.query(
    `INSERT INTO countrylanguage VALUES ('VNM','Chinese2','F',1.4)`,
    (err, results) => {
      if (err) throw err;
      console.log(results.message);
    }
  );
  connection.end();
};

module.exports = {
  help,
  addTrigger,
  insertLanguage,
};
