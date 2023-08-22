const express  = require('express');
const mysql = require('mysql');
const app = express();


const db = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpass',
  database: 'meetup'
});


// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});

 // Step 3: 3. Create a table called `Invitee` with the following fields (`invitee_no`, `invitee_name` and `invited_by`)

const createInviteeTableQuery = `
  CREATE TABLE IF NOT EXISTS Invitee (
    invitee_no INT PRIMARY KEY,
    invitee_name VARCHAR(50),
    invited_by VARCHAR(50)
  )
`;

db.query(createInviteeTableQuery, (err) => {
  if (err) {
    console.error('Error creating Invitee table: ', err);
  } else {
    console.log('Invitee table created');
  }
});

  

// Step 4: Create a table called `Room` with the following fields (`room_no`, `room_name` and `floor_number`)

const createRoomTableQuery = `
  CREATE TABLE IF NOT EXISTS Room (
    room_no INT PRIMARY KEY,
    room_name VARCHAR(50),
    floor_number INT
  )
`;

db.query(createRoomTableQuery, (err) => {
  if (err) {
    console.error('Error creating Room table: ', err);
  } else {
    console.log('Room table created');
  }
});


// Step 5: Create a table called `Meeting` with the following fields (`meeting_no, meeting_title, starting_time, ending_time`,`room_no`)

const createMeetingTableQuery = `
  CREATE TABLE IF NOT EXISTS Meeting (
    meeting_no INT PRIMARY KEY,
    meeting_title VARCHAR(100),
    starting_time DATETIME,
    ending_time DATETIME,
    room_no INT,
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
  )
`;

db.query(createMeetingTableQuery, (err) => {
  if (err) {
    console.error('Error creating Meeting table: ', err);
  } else {
    console.log('Meeting table created');
  }
});



 // Step 6: Insert 5 rows into each table with relevant fields. Find a way to create the data for those fields

 const insertDataQueries = [
    `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES (1, 'John Doe', 'Jane Smith')`,
    `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES (2, 'Alice Johnson', 'Bob Brown')`,
    `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES (3, 'Michael Williams', 'Emily Davis')`,
    `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES (4, 'Sarah Miller', 'David Wilson')`,
    `INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES (5, 'Daniel Martin', 'Olivia Jones')`,
  ];

// Execute the insertion queries
insertDataQueries.forEach(query => {
    db.query(query, (err) => {
      if (err) {
        console.error('Error inserting data: ', err);
      } else {
        console.log('Data inserted');
      }
    });
  });

app.listen('3000', () => {
    console.log('server started on port 3000')
});
