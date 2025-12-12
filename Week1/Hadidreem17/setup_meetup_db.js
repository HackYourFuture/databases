const { Client } = require("pg");

async function main() {
const client = new Client({
  user: "hyfuser",
  host: "localhost",
  database: "postgres",
  password: "hyfpassword",
  port: 5432,
});

  await client.connect();

  console.log("Dropping database if exists...");
  await client.query("DROP DATABASE IF EXISTS meetup");

  console.log("Creating database meetup...");
  await client.query("CREATE DATABASE meetup");

  await client.end();

  
  const meetupClient = new Client({
  user: "hyfuser",
  host: "localhost",
  database: "meetup",
  password: "hyfpassword",
  port: 5432,
});

  await meetupClient.connect();

  console.log("Creating tables...");

  await meetupClient.query(`
    CREATE TABLE Invitee (
      invitee_no SERIAL PRIMARY KEY,
      invitee_name VARCHAR(100),
      invited_by VARCHAR(100)
    );
  `);

  await meetupClient.query(`
    CREATE TABLE Room (
      room_no SERIAL PRIMARY KEY,
      room_name VARCHAR(100),
      floor_number INT
    );
  `);

  await meetupClient.query(`
    CREATE TABLE Meeting (
      meeting_no SERIAL PRIMARY KEY,
      meeting_title VARCHAR(200),
      starting_time TIMESTAMP,
      ending_time TIMESTAMP,
      room_no INT REFERENCES Room(room_no)
    );
  `);

  console.log("Inserting sample data...");

  await meetupClient.query(`
    INSERT INTO Invitee (invitee_name, invited_by) VALUES
    ('Sara', 'Ali'),
    ('John', 'Lina'),
    ('Maya', 'Omar'),
    ('Noor', 'Samir'),
    ('Adam', 'Lara');ssss
  `);

  await meetupClient.query(`
    INSERT INTO Room (room_name, floor_number) VALUES
    ('Blue Room', 1),
    ('Red Room', 2),
    ('Green Room', 1),
    ('Orange Room', 3),
    ('VIP Room', 5);
  `);

  await meetupClient.query(`
    INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
    ('Tech Meetup', NOW(), NOW() + INTERVAL '2 hours', 1),
    ('Startup Pitch', NOW(), NOW() + INTERVAL '1 hour', 2),
    ('Workshop JS', NOW(), NOW() + INTERVAL '3 hours', 3),
    ('Design Basics', NOW(), NOW() + INTERVAL '4 hours', 4),
    ('AI Conference', NOW(), NOW() + INTERVAL '5 hours', 5);
  `);

  console.log("All done");
  await meetupClient.end();
}

main();
