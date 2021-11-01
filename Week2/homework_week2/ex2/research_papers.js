import { createConnection } from "mysql";
import { conferences, mentors, researchPapers } from "./tables.js";
import {
  insertConferences,
  insertAuthors,
  insertMentors,
  insertResearchPapers,
  authorsValues,
  mentorsValues,
  researchPapersValues,
  conferencesValues,
} from "./values.js";

const connection = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "papers",
});
async function creatingTablesAndData() {
  connection.connect();
  try {
    await Promise.all[
      ((((((connection.query(researchPapers, (error, results) => {
        error ? error : console.log("the reply is ", results[0]); // creating research papers table
      }),
      connection.query(mentors, (error, results) => {
        error ? error : console.log("the reply is ", results[0]); //creating mentors table
      })),
      connection.query(insertAuthors, [authorsValues], (error, results) => {
        error ? error : console.log("the reply is ", results[0]); //inserting authors
      })),
      connection.query(insertMentors, [mentorsValues], (error, results) => {
        error ? error : console.log("the reply is ", results[0]); //Inserting mentors
      })),
      connection.query(
        insertResearchPapers,
        [researchPapersValues],
        (error, results) => {
          error ? error : console.log("the reply is ", results[0]); //Inserting Research Papers values
        }
      )),
      connection.query(conferences, (error, results) => {
        error ? error : console.log("the reply is ", results[0]); //Creating conferences table
      })),
      connection.query(
        insertConferences,
        [conferencesValues],
        (error, results) => {
          error ? error : console.log("the reply is ", results[0]); //Inserting values into conferences
        }
      ))
    ];
  } catch (error) {
    console.error(error);
  }
  connection.end();
}
creatingTablesAndData();
