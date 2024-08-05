const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword", 
  database: 'meetup'
});

const executeQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_DATABASE = `CREATE DATABASE IF NOT EXISTS meetup`;
  const USE_DATABASE = `USE meetup`;

  const CREATE_INVITEE_TABLE = `
    CREATE TABLE IF NOT EXISTS Invitee 
    (
    invitee_no INT AUTO_INCREMENT ,
    invitee_name VARCHAR(50),
    invited_by VARCHAR(50),
    PRIMARY KEY(invitee_no)
    );`;

  const CREATE_ROOM_TABLE = `
    CREATE TABLE IF NOT EXISTS Room 
    (
    room_no INT AUTO_INCREMENT ,
    room_name VARCHAR(50),
    floor_number INT,
    PRIMARY KEY(room_no)
    );`;

    const CREATE_MEETING_TABLE = `
    CREATE TABLE IF NOT EXISTS Meeting 
    (
      meeting_no INT AUTO_INCREMENT,
      meeting_title VARCHAR(50),
      starting_time DATETIME,
      ending_time DATETIME,
      room_no INT,
      PRIMARY KEY(meeting_no),
      FOREIGN KEY(room_no) REFERENCES Room(room_no)
    );`;

  const invitees = [
    { invitee_name: "Alice", invited_by: "Bob" },
    { invitee_name: "Bob", invited_by: "Charlie" },
    { invitee_name: "Charlie", invited_by: "Alice" },
    { invitee_name: "Dave", invited_by: "Eve" },
    { invitee_name: "Eve", invited_by: "Dave" }
  ];

  const rooms = [
    { room_name: "Conference Room A", floor_number: 1 },
    { room_name: "Conference Room B", floor_number: 2 },
    { room_name: "Conference Room C", floor_number: 3 },
    { room_name: "Conference Room D", floor_number: 4 },
    { room_name: "Conference Room E", floor_number: 5 }
  ];

  const meetings = [
    {
      meeting_title: "Project Kickoff",
      starting_time: "2024-01-01 10:00:00",
      ending_time: "2024-01-01 11:00:00",
      room_no: 1
    },
    {
      meeting_title: "Design Review",
      starting_time: "2024-01-02 14:00:00",
      ending_time: "2024-01-02 15:00:00",
      room_no: 2
    },
    {
      meeting_title: "Sprint Planning",
      starting_time: "2024-01-03 09:00:00",
      ending_time: "2024-01-03 10:00:00",
      room_no: 3
    },
    {
      meeting_title: "Team Building",
      starting_time: "2024-01-04 16:00:00",
      ending_time: "2024-01-04 17:00:00",
      room_no: 4
    },
    {
      meeting_title: "Retrospective",
      starting_time: "2024-01-05 11:00:00",
      ending_time: "2024-01-05 12:00:00",
      room_no: 5
    }
  ];

  connection.connect();
  try {
    await executeQuery(CREATE_DATABASE);
    await executeQuery(USE_DATABASE);
    await Promise.all([
      executeQuery(CREATE_INVITEE_TABLE),
      executeQuery(CREATE_ROOM_TABLE),
      executeQuery(CREATE_MEETING_TABLE)
    ]);
    await Promise.all(
      invitees.map((invitee) =>
        executeQuery("INSERT INTO Invitee SET ?", invitee)
      )
    );
    await Promise.all(
      rooms.map((room) => executeQuery("INSERT INTO Room SET ?", room))
    );
    await Promise.all(
      meetings.map((meeting) =>
        executeQuery("INSERT INTO Meeting SET ?", meeting)
      )
    );
  } catch (error) {
    console.error(error);
  }

  connection.end();
}
seedDatabase();
