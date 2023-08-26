const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
};

const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS meetup`;
const useDatabaseQuery = `USE meetup`;
const createInviteeTableQuery = `
  CREATE TABLE IF NOT EXISTS Invitee (
    invitee_no INT AUTO_INCREMENT PRIMARY KEY,
    invitee_name VARCHAR(255),
    invited_by INT
  )
`;
const createRoomTableQuery = `
  CREATE TABLE IF NOT EXISTS Room (
    room_no INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(255),
    floor_number INT
  )
`;
const createMeetingTableQuery = `
  CREATE TABLE IF NOT EXISTS Meeting (
    meeting_no INT AUTO_INCREMENT PRIMARY KEY,
    meeting_title VARCHAR(255),
    starting_time DATETIME,
    ending_time DATETIME,
    room_no INT,
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
  )
`;
const insertDataQueries = [
  `
  INSERT INTO Invitee (invitee_name, invited_by) VALUES
    ('Invitee 1', NULL),
    ('Invitee 2', 1),
    ('Invitee 3', 1),
    ('Invitee 4', 2),
    ('Invitee 5', 3)
  `,
  `
  INSERT INTO Room (room_name, floor_number) VALUES
    ('Room A', 1),
    ('Room B', 2),
    ('Room C', 1),
    ('Room D', 3),
    ('Room E', 2)
  `,
  `
  INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
    ('Meeting 1', '2023-08-26 10:00:00', '2023-08-26 12:00:00', 1),
    ('Meeting 2', '2023-08-27 14:00:00', '2023-08-27 16:00:00', 2),
    ('Meeting 3', '2023-08-28 09:30:00', '2023-08-28 11:30:00', 3),
    ('Meeting 4', '2023-08-29 11:00:00', '2023-08-29 13:00:00', 4),
    ('Meeting 5', '2023-08-30 15:00:00', '2023-08-30 17:00:00', 5)
  `,
];

async function setupDatabase() {
  try {
    const connection = await mysql.createConnection(dbConfig);

    await connection.query(createDatabaseQuery);
    await connection.query(useDatabaseQuery);

    await connection.query(createInviteeTableQuery);
    await connection.query(createRoomTableQuery);
    await connection.query(createMeetingTableQuery);

    for (const query of insertDataQueries) {
      await connection.query(query);
    }

    console.log("Database setup complete.");

    connection.end();
  } catch (error) {
    console.error("Error setting up the database:", error);
  }
}

setupDatabase();
