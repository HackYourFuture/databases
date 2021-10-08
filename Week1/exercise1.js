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

const dropInvitee = 'DROP TABLE IF EXISTS initee;'
const createInvitee = `
  CREATE TABLE invitee (
    invitee_no INT AUTO_INCREMENT,
      invitee_name varchar(35) NOT NULL DEFAULT '',
      invited_by varchar(35),
      PRIMARY KEY(invitee_no)
  );
`;

const dropRoom = 'DROP TABLE IF EXISTS room;'
const createRoom = `
  CREATE TABLE room (
    room_no INT AUTO_INCREMENT,
      room_name varchar(35) NOT NULL DEFAULT '',
      floor_number INT NOT NULL DEFAULT 0,
      PRIMARY KEY (room_no)  
  );
`;

const dropMeeting = 'DROP TABLE IF EXISTS meeting;'
const createMeeting = `
  CREATE TABLE meeting (
    meeting_no INT AUTO_INCREMENT PRIMARY KEY,
      meeting_title varchar(50) NOT NULL DEFAULT '',
      starting_time TIME,
      ending_time TIME,
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
  { invitee_no: 1, invitee_name: "George Saad", invited_by: "Partnership Manager" },
  { invitee_no: 2, invitee_name: "John Doe", invited_by: "Partnership Manager" },
  { invitee_no: 3, invitee_name: "Jane Doe", invited_by: "Education Support" },
  { invitee_no: 4, invitee_name: "Joseph Doe", invited_by: "Education Support" },
  { invitee_no: 5, invitee_name: "Jennifer Doe", invited_by: "Education Support" }
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
  { room_no: 1, room_name: "Main Confferance Room", floor_number: 0 },
  { room_no: 2, room_name: "Second Confferance Room", floor_number: 0 },
  { room_no: 3, room_name: "Main Online Meeting Room", floor_number: 1 },
  { room_no: 4, room_name: "Second Online Meeting Room", floor_number: 1 },
  { room_no: 5, room_name: "Events Room", floor_number: 2 }
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
  { meeting_no: 1, meeting_title: "Database Q&A week1", starting_time: '12:00:00', ending_time: '15:00:00', room_no: 3 },
  { meeting_no: 2, meeting_title: "Database Q&A week2", starting_time: '12:00:00', ending_time: '15:00:00', room_no: 3 },
  { meeting_no: 3, meeting_title: "Database Q&A week3", starting_time: '12:00:00', ending_time: '15:00:00', room_no: 3 },
  { meeting_no: 4, meeting_title: "Mentor Meeting", starting_time: '10:00:00', ending_time: '14:00:00', room_no: 5 },
  { meeting_no: 5, meeting_title: "React Q&A week1", starting_time: '12:00:00', ending_time: '15:00:00', room_no: 3 }
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
