// Import PostgreSQL client
const { Client } = require("pg");

// Connect to default postgres DB (needed to drop/create database)
const adminClient = new Client({
  user: "hyfuser",
  host: "localhost",
  database: "postgres", // temporary DB to run CREATE/DROP commands
  password: "hyfpassword",

  port: 5432,
});

// Function to recreate the meetup database
async function recreateDatabase() {
  await adminClient.connect();

  // Drop database if exists
  await adminClient.query("DROP DATABASE IF EXISTS meetup");

  // Create database again
  await adminClient.query("CREATE DATABASE meetup");

  await adminClient.end();
}

// Function that connects to meetup DB and creates tables
async function createTablesAndInsert() {
  const client = new Client({
    user: "hyfuser",
    host: "localhost",
    database: "meetup",
    password: "hyfpassword",
    port: 5432,
  });

  await client.connect();

  // Create Invitee table
  await client.query(`
    CREATE TABLE Invitee (
      invitee_no SERIAL PRIMARY KEY,
      invitee_name VARCHAR(50),
      invited_by VARCHAR(50)
    );
  `);

  // Insert rows
  await client.query(`
    INSERT INTO Invitee (invitee_name, invited_by)
    VALUES 
    ('Anna', 'John'),
    ('Mark', 'Anna'),
    ('Julia', 'Anna'),
    ('Peter', 'John'),
    ('Emma', 'Julia');
  `);

  // Create Room table
  await client.query(`
    CREATE TABLE Room (
      room_no SERIAL PRIMARY KEY,
      room_name VARCHAR(50),
      floor_number INT
    );
  `);

  // Insert rows
  await client.query(`
    INSERT INTO Room (room_name, floor_number)
    VALUES
    ('Blue Room', 1),
    ('Green Room', 1),
    ('Conference A', 2),
    ('Conference B', 2),
    ('Main Hall', 0);
  `);

  // Create Meeting table
  await client.query(`
    CREATE TABLE Meeting (
      meeting_no SERIAL PRIMARY KEY,
      meeting_title VARCHAR(50),
      starting_time TIME,
      ending_time TIME,
      room_no INT REFERENCES Room(room_no)
    );
  `);

  // Insert rows
  await client.query(`
    INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
    VALUES
    ('Daily Standup', '09:00', '09:15', 1),
    ('Tech Sync', '11:00', '12:00', 2),
    ('Planning', '14:00', '15:30', 3),
    ('Design Review', '16:00', '17:00', 4),
    ('Team Event', '18:00', '20:00', 5);
  `);

  await client.end();
}

// Run everything
(async function () {
  await recreateDatabase();
  await createTablesAndInsert();
  console.log("Database created and filled!");
})();