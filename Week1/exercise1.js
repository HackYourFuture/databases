var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
});

connection.connect();

const dropSchema = 'DROP SCHEMA IF EXISTS meetup;';
const createSchema = 'CREATE SCHEMA meetup;';
const useSchema = 'USE meetup;';
const createDatabaseQueries = [dropSchema, createSchema, useSchema];

for(const query of createDatabaseQueries){
  connection.query(query, function (error, results, fields) {
    if (error) {
        throw error;
    }
    for (i in results) {
        console.log(results[i]);
    }
  });
}

const dropInvitee = 'DROP TABLE IF EXISTS invitee;'
const createInvitee = `
  CREATE TABLE invitee (
    invitee_no INT AUTO_INCREMENT,
      invitee_name varchar(35) NOT NULL,
      invited_by varchar(35),
      PRIMARY KEY(invitee_no)
  );
`;

const dropRoom = 'DROP TABLE IF EXISTS room;'
const createRoom = `
  CREATE TABLE room (
    room_no INT AUTO_INCREMENT,
      room_name varchar(35) NOT NULL,
      floor_number INT NOT NULL DEFAULT 0,
      PRIMARY KEY (room_no)  
  );
`;

const dropMeeting = 'DROP TABLE IF EXISTS meeting;'
const createMeeting = `
  CREATE TABLE meeting (
    meeting_no INT AUTO_INCREMENT PRIMARY KEY,
      meeting_title varchar(50) NOT NULL,
      starting_time DATE,
      ending_time DATE,
      room_no INT NOT NULL,
      CONSTRAINT fk_room FOREIGN KEY (room_no)
      REFERENCES room(room_no)
    ON DELETE CASCADE  
    ON UPDATE CASCADE  
  );
`;

const createTablesQueries = [
  dropInvitee,
  createInvitee,
  dropRoom,
  createRoom,
  dropMeeting,
  createMeeting
];

for(const query of createTablesQueries){
  connection.query(query, function (error, results, fields) {
    if (error) {
        throw error;
    }
    for (i in results) {
        console.log(results[i]);
    }
  });
}

const insertInvitee = 'INSERT INTO invitee SET?';
const inviteesData = [
  { invitee_name: "George Saad", invited_by: "Partnership Manager" },
  { invitee_name: "John Doe", invited_by: "Partnership Manager" },
  { invitee_name: "Jane Doe", invited_by: "Education Support" },
  { invitee_name: "Joseph Doe", invited_by: "Education Support" },
  { invitee_name: "Jennifer Doe", invited_by: "Education Support" }
];

for(const row of inviteesData){
  connection.query(insertInvitee, row, function (error, results, fields) {
    if (error) {
        throw error;
    }
    for (i in results) {
        console.log(results[i]);
    }
  });
}

const insertRoom = 'INSERT INTO room SET?';
const roomsData = [
  { room_name: "Main Confferance Room", floor_number: 0 },
  { room_name: "Second Confferance Room", floor_number: 0 },
  { room_name: "Main Online Meeting Room", floor_number: 1 },
  { room_name: "Second Online Meeting Room", floor_number: 1 },
  { room_name: "Events Room", floor_number: 2 }
];

for(const row of roomsData){
  connection.query(insertRoom, row, function (error, results, fields) {
    if (error) {
        throw error;
    }
    for (i in results) {
        console.log(results[i]);
    }
  });
}

const insertMeeting = 'INSERT INTO meeting SET?';
const meetingsData = [
  { meeting_title: "Database Q&A week1", starting_time: '2021-10-10 11:00:07', ending_time: '2021-10-10 13:00:07', room_no: 3 },
  { meeting_title: "Database Q&A week2", starting_time: '2021-10-18 11:00:07', ending_time: '2021-10-18 13:00:07', room_no: 3 },
  { meeting_title: "Database Q&A week3", starting_time: '2021-10-25 11:00:07', ending_time: '2021-10-25 13:00:07', room_no: 3 },
  { meeting_title: "Mentor Meeting", starting_time: '2021-10-07 10:14:07', ending_time: '2021-10-07 14:14:07', room_no: 5 },
  { meeting_title: "React Q&A week1", starting_time: '2021-11-02 12:00:07', ending_time: '2021-11-02 14:00:07', room_no: 3 }
];

for(const row of meetingsData){
  connection.query(insertMeeting, row, function (error, results, fields) {
    if (error) {
        throw error;
    }
    for (i in results) {
        console.log(results[i]);
    }
  });
}

connection.end();
