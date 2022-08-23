import mysql from "mysql";
import {
  createDatabase,
  useDatabase,
  createTables,
  insertDataIntoTables,
  dropDatabase,
} from "./queries.js";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

connection.connect();

executeQuery(dropDatabase, "Dropping database");
executeQuery(createDatabase, "Creating database");
executeQuery(useDatabase, "Use database");
executeQuery(createTables, "Creating table");
executeQuery(insertDataIntoTables, "Inserting data in to table");

connection.end();

function executeQuery(queries, message) {
  queries.forEach((query) => {
    connection.query(query, function (error, results) {
      if (error) throw error;
      console.log(`${message} is done!`);
    });
  });
}
