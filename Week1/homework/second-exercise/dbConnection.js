import mysql from "mysql";
import { queries } from "./queries.js";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

connection.connect();

executeQuery(queries);

connection.end();

function executeQuery(queries) {
  queries.forEach((query) => {
    connection.query(query.statement, function (error, results) {
      if (error) {
        throw error;
      } else {
        console.log(query.title);
        console.log(results);
        console.log("==========================");
      }
    });
  });
}
