const mysql = require("mysql");

// Create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hyfpassword",
});

// Connect
connection.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected...");
});

// Adding query for Database
const addQuery = (query, msg) => {
  connection.query(query, (err) => {
    if (err) throw err;
    console.log(msg);
  });
};

// Create DB
const deleteDb = "DROP DATABASE IF EXISTS meetup";
const createDb = "CREATE DATABASE meetup";
const useDb = "USE meetup";

addQuery(deleteDb, `Deleted.`);
addQuery(createDb, `Database is created.`);
addQuery(useDb, `Connected.`);

// Create tables
const queries = [
  "CREATE TABLE Invitee (invitee_no INT AUTO_INCREMENT PRIMARY KEY, invitee_name  VARCHAR(50), invited_by  VARCHAR(50))",
  "CREATE TABLE Room (room_no INT AUTO_INCREMENT PRIMARY KEY, room_name   VARCHAR(50), floor_number  INT)",
  "CREATE TABLE Meeting (meeting_no INT AUTO_INCREMENT PRIMARY KEY, meeting_title   VARCHAR(50), starting_time  TIME, ending_time TIME, room_no INT)",
];
queries.forEach((query) => addQuery(query, `Table is created`));

// Insert Values
const insertQueries = [
  {
    statement: "INSERT INTO Invitee  (invitee_name,invited_by) VALUES ?",
    values: [
      ["Burak", "Adam"],
      ["Bob", "Sofia"],
      ["Johnny", "Will"],
      ["Sara", "George"],
      ["Lisa", "Kyle"],
    ],
    message: "",
  },
  {
    statement: "INSERT INTO Room     (room_name,floor_number)  VALUES ?",
    values: [
      ["First room", 2],
      ["Second room", 4],
      ["Third room", 6],
      ["Fourth room", 8],
      ["Fifth room", 10],
    ],
    message: "",
  },
  {
    statement:
      "INSERT INTO Meeting  (meeting_title,starting_time,ending_time, room_no)  VALUES ?",
    values: [
      ["First meeting", "08:00:00", "10:00:00", 1],
      ["Second meeting", "10:00:00", "12:00:00", 2],
      ["Third meeting", "12:00:00", "14:00:00", 3],
      ["Fourth meeting", "14:00:00", "16:00:00", 4],
      ["Fifth meeting", "16:00:00", "18:00:00", 5],
    ],
    message: "",
  },
];

function insertQuery(insertQueries, msg) {
  connection.query(insertQueries.statement, [insertQueries.values], (err) => {
    if (err) throw err;
    console.log(msg);
  });
}

function addMessage(insertQuery, index) {
  return { ...insertQuery, message: `Hi Burak ${index}!` };
}

insertQueries.forEach((query) => insertQuery(query, `Values are inserted`));

insertQueries.map(addMessage);

connection.end();
