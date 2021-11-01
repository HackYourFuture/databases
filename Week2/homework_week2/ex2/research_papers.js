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

export const connection = createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "papers",
});

connection.connect();

//creating research_ papers table
connection.query(researchPapers, (error, results) => {
  if (error) {
    throw error;
  }
  console.log("the reply is ", results[0]);
});

//creating mentors table
connection.query(mentors, (error, results) => {
  if (error) {
    throw error;
  }
  console.log("the reply is ", results[0]);
});
//inserting authors
connection.query(insertAuthors, [authorsValues], (error, results) => {
  if (error) {
    throw error;
  }
  console.log("the reply is ", results[0]);
});
//Inserting mentors
connection.query(insertMentors, [mentorsValues], (error, results) => {
  if (error) {
    throw error;
  }
  console.log("the reply is ", results[0]);
});
//Inserting Research Papers values
connection.query(
  insertResearchPapers,
  [researchPapersValues],
  (error, results) => {
    if (error) {
      throw error;
    }
    console.log("the reply is ", results[0]);
  }
);
//Creating conferences table
connection.query(conferences, (error, results) => {
  if (error) {
    throw error;
  }
  console.log("the reply is ", results[0]);
});
//Inserting values into conferences
connection.query(insertConferences, [conferencesValues], (error, results) => {
  if (error) {
    throw error;
  }
  console.log("the reply is ", results[0]);
});

connection.end();
