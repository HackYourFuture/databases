// Require the data module
const data = require('./data.js');
const inviteesInfo = data.inviteesInfo;
const roomsInfo = data.roomsInfo;
const meetingsInfo = data.meetingsInfo;

// Create the connection
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'meetup',
  // port : 3307
});

connection.connect();
// Create tables
const createTableInvitees = "CREATE TABLE invitees (invitee_no INT AUTO_INCREMENT, invitee_name VARCHAR(50), invited_by VARCHAR(50), PRIMARY KEY(invitee_no))";

const createTableRooms = "CREATE TABLE Rooms (room_no INT, room_name VARCHAR(50), floor_no INT, PRIMARY KEY(room_no))";

const createTableMeetings = "CREATE TABLE Meetings (meeting_no INT, meeting_title VARCHAR(50),starting_time datetime, ending_time datetime, room_no INT, PRIMARY KEY(meeting_no))";


// activate the creating tables queries
connection.query(createTableInvitees, function (error, results, fields) {
  if (error) {
      throw error;
  }
  console.log(results);
});
connection.query(createTableRooms, function (error, results, fields) {
  if (error) {
      throw error;
  }
  console.log(results);
});
connection.query(createTableMeetings, function (error, results, fields) {
  if (error) {
      throw error;
  }
  console.log(results);
});


// insert the data
const insertInviteesData = `INSERT INTO invitees( invitee_name, invited_by ) VALUES ? `
const insertRoomsData = `INSERT INTO Rooms(room_no, room_name, floor_no ) VALUES ? `
const insertMeetingsData = `INSERT INTO Meetings(meeting_no, meeting_title, starting_time, ending_time, room_no) VALUES ? `

// make the inserting queries
connection.query(insertInviteesData, [inviteesInfo], (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  // get inserted rows
  console.log('Row inserted:' + results.affectedRows);
});

connection.query(insertRoomsData, [roomsInfo], (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  // get inserted rows
  console.log('Row inserted:' + results.affectedRows);
});
connection.query(insertMeetingsData, [meetingsInfo], (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  // get inserted rows
  console.log('Row inserted:' + results.affectedRows);
});


// end the connection
connection.end();
