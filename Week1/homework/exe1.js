const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'meetup', // Assuming your database is 'meetup'
});

const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS meetup';
const useDatabaseQuery = 'USE meetup';

const createInviteeTableQuery = `
  CREATE TABLE IF NOT EXISTS Invitee (
    invitee_no INT AUTO_INCREMENT PRIMARY KEY,
    invitee_name VARCHAR(255) NOT NULL,
    invited_by VARCHAR(255)
  )
`;

const createRoomTableQuery = `
  CREATE TABLE IF NOT EXISTS Room (
    room_no INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(255) NOT NULL,
    floor_number INT NOT NULL
  )
`;

const createMeetingTableQuery = `
  CREATE TABLE IF NOT EXISTS Meeting (
    meeting_no INT AUTO_INCREMENT PRIMARY KEY,
    meeting_title VARCHAR(255) NOT NULL,
    starting_time DATETIME NOT NULL,
    ending_time DATETIME NOT NULL,
    room_no INT,
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
  )
`;

const insertDataQuery = `
  INSERT INTO Invitee (invitee_name, invited_by) VALUES
    ('John Doe', 'Jane Doe'),
    ('Alice Smith', 'Bob Smith'),
    ('Charlie Brown', 'David Brown'),
    ('Eva White', 'Frank White'),
    ('Grace Miller', 'Henry Miller')
`;

const insertRoomDataQuery = `
  INSERT INTO Room (room_name, floor_number) VALUES
    ('Conference Room A', 1),
    ('Conference Room B', 2),
    ('Meeting Room 101', 1),
    ('Meeting Room 201', 2),
    ('Board Room', 3)
`;

const insertMeetingDataQuery = `
  INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
    ('Team Meeting', '2023-11-16 09:00:00', '2023-11-16 10:30:00', 1),
    ('Project Presentation', '2023-11-17 14:00:00', '2023-11-17 16:00:00', 2),
    ('Training Session', '2023-11-18 11:30:00', '2023-11-18 13:00:00', 3),
    ('Board Meeting', '2023-11-19 16:30:00', '2023-11-19 18:00:00', 4),
    ('Planning Workshop', '2023-11-20 10:00:00', '2023-11-20 12:00:00', 5)
`;


// Connect to the database and execute queries
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the server:', err);
    return;
  }

  console.log('Connected to the server!');

  // Create database
  connection.query(createDatabaseQuery, (createDbErr) => {
    if (createDbErr) {
      console.error('Error creating database:', createDbErr);
      connection.end();
      return;
    }

    // Use the database
    connection.query(useDatabaseQuery, (useDbErr) => {
      if (useDbErr) {
        console.error('Error using database:', useDbErr);
        connection.end();
        return;
      }

      // Create tables
      connection.query(createInviteeTableQuery, (createInviteeErr) => {
        if (createInviteeErr) {
          console.error('Error creating Invitee table:', createInviteeErr);
          connection.end();
          return;
        }

        console.log('Table "Invitee" created successfully!');

        connection.query(createRoomTableQuery, (createRoomErr) => {
          if (createRoomErr) {
            console.error('Error creating Room table:', createRoomErr);
            connection.end();
            return;
          }

          console.log('Table "Room" created successfully!');

          connection.query(createMeetingTableQuery, (createMeetingErr) => {
            if (createMeetingErr) {
              console.error('Error creating Meeting table:', createMeetingErr);
              connection.end();
              return;
            }

            console.log('Table "Meeting" created successfully!');

            // Insert data
            connection.query(insertDataQuery, (insertDataErr) => {
              if (insertDataErr) {
                console.error('Error inserting data into Invitee table:', insertDataErr);
                connection.end();
                return;
              }

              console.log('Data inserted into "Invitee" table!');

              connection.query(insertRoomDataQuery, (insertRoomDataErr) => {
                if (insertRoomDataErr) {
                  console.error('Error inserting data into Room table:', insertRoomDataErr);
                  connection.end();
                  return;
                }

                console.log('Data inserted into "Room" table!');

                connection.query(insertMeetingDataQuery, (insertMeetingDataErr) => {
                  if (insertMeetingDataErr) {
                    console.error('Error inserting data into Meeting table:', insertMeetingDataErr);
                    connection.end();
                    return;
                  }

                  console.log('Data inserted into "Meeting" table!');

                  // Set up Express routes
                  app.get('/invitees', (req, res) => {
                    connection.query('SELECT * FROM Invitee', (err, results) => {
                      if (err) {
                        console.error('Error retrieving invitees:', err);
                        res.status(500).send('Internal Server Error');
                        return;
                      }

                      res.json(results);
                    });
                  });

                  app.get('/rooms', (req, res) => {
                    connection.query('SELECT * FROM Room', (err, results) => {
                      if (err) {
                        console.error('Error retrieving rooms:', err);
                        res.status(500).send('Internal Server Error');
                        return;
                      }

                      res.json(results);
                    });
                  });

                  app.get('/meetings', (req, res) => {
                    connection.query('SELECT * FROM Meeting', (err, results) => {
                      if (err) {
                        console.error('Error retrieving meetings:', err);
                        res.status(500).send('Internal Server Error');
                        return;
                      }

                      res.json(results);
                    });
                  });

                  // Start the Express server
                  app.listen(port, () => {
                    console.log(`Server is running at http://localhost:${port}`);
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
