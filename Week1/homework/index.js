const mysql = require("mysql");

// Create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hfypassword",
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

const queries = [
  "CREATE TABLE Invitee (invitee_no INT AUTO_INCREMENT PRIMARY KEY, invitee_name  VARCHAR(50), invited_by  VARCHAR(50))",
  "CREATE TABLE Room (room_no INT AUTO_INCREMENT PRIMARY KEY, room_name   VARCHAR(50), floor_number  INT)",
  "CREATE TABLE Meeting (meeting_no INT AUTO_INCREMENT PRIMARY KEY, meeting_title   VARCHAR(50), starting_time  TIME, ending_time TIME, room_no INT)",
];

// Create tables
queries.forEach((query) => addQuery(query, `Table is created`));


// Inserting values into tables
const insertQuery = (query, post, msg) => {
  connection.query(query, post, (err) => {
    if (err) throw err;
    console.log(msg);
  });
};

const valuesQueries = [
  `INSERT INTO Invitee  (invitee_name,invited_by) VALUES ?`,
  `INSERT INTO Room     (room_name,floor_number)  VALUES ?`,
  `INSERT INTO Meeting  (meeting_title,starting_time,ending_time, room_no)  VALUES ?`,
];

const inviteeValues = [
  ["John", "Mary"],
  ["Bob", "Sofia"],
  ["Johnny", "Will"],
  ["Sara", "George"],
  ["Lisa", "Kyle"],
];

let roomValues = [
  ["First room", 1],
  ["Second room", 2],
  ["Third room", 3],
  ["Fourth room", 4],
  ["Fifth room", 5],
];

const meetingValues = [
  ["First meeting", "08:00:00", "10:00:00", 1],
  ["Second meeting", "10:00:00", "12:00:00", 2],
  ["Third meeting", "12:00:00", "14:00:00", 3],
  ["Fourth meeting", "14:00:00", "16:00:00", 4],
  ["Fifth meeting", "16:00:00", "18:00:00", 5],
];

const allValues = [inviteeValues, roomValues, meetingValues ];

for (let i = 0; i < allValues.length; i++) {
  insertQuery(valuesQueries[i], [allValues[i]], `Inserted`);
}

connection.end();