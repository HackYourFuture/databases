const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "tarek123321",
});

let deleteDatabaseIfExists = "DROP DATABASE IF EXISTS meetup";
let createDataBase = "CREATE DATABASE meetup;";

// deleting the database if it's exist in order to be able  create it again without having errors
db.query(deleteDatabaseIfExists, (err, results) => {
    if (err) {
        throw err;  
    }
    console.log("database meetup deleted!");
});

// creating the database meetup !
db.query(createDataBase, (err, results) => {
    if (err) {
        console.log("faild to create database meetup", err);
    }
    console.log("database meetup Created!!", results);
});

// creating creatingTablesCommands variables which will holds our sql commands for using the right database , creating tables invitee ,room ,meeting.
let creatingTablesCommands = [
    "USE meetup",
    "CREATE TABLE Invitee ( invitee_no INT NOT NULL  AUTO_INCREMENT, invitee_name VARCHAR(100) , invited_by VARCHAR(100) , PRIMARY KEY(invitee_no) )",
    "CREATE TABLE Room ( room_no INT NOT NULL  AUTO_INCREMENT, room_name VARCHAR(100) , floor_number INT , PRIMARY KEY(room_no) )",
    "CREATE TABLE Meeting ( meeting_no INT NOT NULL  AUTO_INCREMENT, meeting_title VARCHAR(100) , starting_time  DATETIME , ending_time DATETIME , room_no INT, PRIMARY KEY(meeting_no))",
];

// function to create Queries  from the array
const createQueries = function (array) {
    array.forEach((query) => {
        db.query(query, (err, results) => {
            if (err) {
                console.log(err);
            }
            console.log("Table Created!!");
        });
    });
};

// function to insert  Queries from the array
const insertQueries = function (array) {
    array.forEach((query) => {
        db.query(query, (err, results) => {
            if (err) {
                console.log(err);
            }
            console.log("Data Inserted");
        });
    });
};

// passing creatingTablesCommands array to our function, to use the database meetup, then creating tables invitte,room,meeting.
createQueries(creatingTablesCommands);

// creating insertingDataCommands variables which will holds our sql commands for inserting data to the three tables
let insertingDataCommands = [
    'INSERT INTO Invitee (invitee_name , invited_by) VALUES ( "Tarek" , "Tom" ),( "Mark" , "Anne" ),( "Sami" , "Sara" ),( "Rob" , "Thomas" ),( "lana" , "Johan" )',
    'INSERT INTO Room (room_name , floor_number) VALUES ( "Local 1" , "4" ),( "Local 22" ,"4" ),( "living-room","1" ),( "meeting-room","11" ),( "hidden-room","13" )',
    'INSERT INTO Meeting (meeting_title , starting_time , ending_time , room_no ) VALUES ( "Information about Corona" , "2022-01-01 14:00:00" , "2022-01-01 16:00:00" , "2" ),( "How to find a job" , "2025-02-01 14:00:00" , "2025-02-01 16:00:00" , "1"  ),( "Timing", "2025-02-01 17:00:00" , "2025-02-01 19:00:00" , "5" ),( "Pansion","2025-02-01 17:00:00" , "2025-02-01 19:00:00" , "11"  ),( "How to deal with your childeren","2025-02-01 17:00:00" , "2025-02-01 19:00:00" , "11" )',
];

// passing insertingDataCommands array to our function, to insert 5 rows in each tables.
insertQueries(insertingDataCommands);

db.end((err) => {
    console.log("connection ended");
});
