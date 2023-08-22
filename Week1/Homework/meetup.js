import mysql from "mysql";

const connection = mysql.createConnection({
  host: "chouaib",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.connect((err) => {
  if (err) {
    console.error("can not connect to the database:", err);
    return;
  }
  console.log("you are Connected to the database!");

  createDatabase();
});

function createDatabase() {
  connection.query("CREATE DATABASE IF NOT EXISTS meetup", (err) => {
    if (err) {
      console.error("Error creating database:", err);
      connection.end();
      return;
    }
    console.log("Database meetup created!");
    useDatabase();
  });
}

function useDatabase() {
  connection.query("USE meetup", (err) => {
    if (err) {
      console.error("Error selecting database:", err);
      connection.end();
      return;
    }
    console.log("Database meetup selected!");
    createInviteesTable();
  });
}

function createInviteesTable() {
  const createInviteeTable = `CREATE TABLE IF NOT EXISTS invitees (
    invitee_no INT(10) AUTO_INCREMENT PRIMARY KEY,
    invitee_name VARCHAR(50),
    invitee_by VARCHAR(50)
  )`;

  connection.query(createInviteeTable, (err) => {
    if (err) {
      console.error("Error creating invitees table:", err);
      connection.end();
      return;
    }
    console.log("Invitees table created!");
    createRoomTable();
  });
}

function createRoomTable() {
  const createRoomTableQuery = `CREATE TABLE IF NOT EXISTS Room (
    room_no INT(10) AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(50),
    floor_number INT(10)
  )`;

  connection.query(createRoomTableQuery, (err) => {
    if (err) {
      console.error("Error creating Room table:", err);
      connection.end();
      return;
    }
    console.log("Room table created!");
    createMeetingTable();
  });
}

function createMeetingTable() {
  const createMeetingTableQuery = `CREATE TABLE IF NOT EXISTS Meeting (
    meeting_no INT(10) AUTO_INCREMENT PRIMARY KEY,
    meeting_title VARCHAR(50),
    starting_time DATETIME,
    ending_time DATETIME,
    room_no INT(10)
  )`;

  connection.query(createMeetingTableQuery, (err) => {
    if (err) {
      console.error("Error creating Meeting table:", err);
      connection.end();
      return;
    }
    console.log("Meeting table created!");
    insertInviteeData();
  });
}

function insertInviteeData() {
  const insertInviteeDataQuery = `INSERT INTO invitees (invitee_name, invitee_by) VALUES 
    ('ALi', 'Mo'),
    ('Rob', 'Josephine'),
    ('JACK', 'JOHN'),
    ('Bas', 'Bill'),
    ('Amin', 'Hakim')`;

  connection.query(insertInviteeDataQuery, (err) => {
    if (err) {
      console.error("Error inserting invitee data:", err);
      connection.end();
      return;
    }
    console.log("Invitees data inserted!");
    insertRoomData();
  });
}

function insertRoomData() {
  const insertRoomDataQuery = `INSERT INTO Room (room_name, floor_name) VALUES
    ('Room 1', 1),
    ('Room 2', 2),
    ('Room 3', 3),
    ('Room 4', 4),
    ('Room 5', 5)`;

  connection.query(insertRoomDataQuery, (err) => {
    if (err) {
      console.error("Error inserting room data:", err);
      connection.end();
      return;
    }
    console.log("Room data inserted!");
    insertMeetingData();
  });
}

function insertMeetingData() {
  const insertMeetingDataQuery = `INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
    ('Meeting 1', '2023-08-22 10:00:00', '2023-08-22 11:00:00', 1),
    ('Meeting 2', '2023-08-22 12:00:00', '2023-08-22 13:00:00', 2),
    ('Meeting 3', '2023-08-22 14:00:00', '2023-08-22 15:00:00', 3),
    ('Meeting 4', '2023-08-22 16:00:00', '2023-08-22 17:00:00', 4),
    ('Meeting 5', '2023-08-22 18:00:00', '2023-08-22 19:00:00', 5)`;

  connection.query(insertMeetingDataQuery, (err) => {
    if (err) {
      console.error("Error inserting meeting data:", err);
      connection.end();
      return;
    }
    console.log("Meeting data inserted!");
    connection.end((err) => {
      if (err) {
        console.error("Error disconnecting from the database:", err);
        return;
      }
      console.log("Disconnected from database!");
    });
  });
}
