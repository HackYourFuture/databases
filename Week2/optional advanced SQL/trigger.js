const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'test',
});

// Promisify the bind function of query function of connection object
// Pass connection object (because bind expects "this")
// Afterwards execQuery will work as a function that returns a promise but
// we don't have to call "then" over that promise
const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {

  /*
  When using JS client for MySQL server,
  we do not have to change the delimiter.
  Just create trigger query will do.

  When using the MySQL client (command prompt),
  we have to change the delimiter, because semicolon (;)
  is the delimiter for MySQL client
  */
  const CREATE_TRIGGER = `CREATE TRIGGER end_date_trigger
    BEFORE INSERT 
        ON project
            FOR EACH ROW
            BEGIN 
                DECLARE message VARCHAR(100);
                IF new.start_date > new.end_date 
                THEN 
                    set message= 'Project end date cannot be before the start date';
                    SET lc_messages=message; SIGNAL SQLSTATE '45000';
                END IF;
            END;`


  connection.connect();

  try {
    // call the function that returns promise
    await execQuery(CREATE_TRIGGER);
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
