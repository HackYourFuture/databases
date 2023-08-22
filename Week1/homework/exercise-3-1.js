const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

// Connect to MySQL server
con.connect(function (err) {
  if (err) throw err;

  console.log("Connected!");

  // Drop 'meetup' database if it exists already
  con.query("DROP DATABASE IF EXISTS meetup", function (error) {
    if (error) throw error;

    // Create 'meetup' database
    con.query("CREATE DATABASE meetup", function (err, result) {
      if (err) throw err;
      console.log("Database created");

      // Switch to 'meetup' database
      con.query("USE meetup", function (err) {
        if (err) throw err;

        // Create table called 'Invitee'
        const inviteeTable = `
          CREATE TABLE IF NOT EXISTS Invitee (
            invitee_no INT AUTO_INCREMENT PRIMARY KEY,
            invitee_name VARCHAR(255) NOT NULL,
            invited_by VARCHAR(255) NOT NULL
          )
         `;

        con.query(inviteeTable, function (err, result) {
          if (err) throw err;
          console.log("Table 'inviteeTable' created");

          // Create a table called `Room`
          const roomTable = `
          CREATE TABLE IF NOT EXISTS Room (
            room_no INT AUTO_INCREMENT PRIMARY KEY,
            room_name VARCHAR(255) NOT NULL,
            floor_number VARCHAR(255) NOT NULL
          );
          `;

          con.query(roomTable, function (err, result) {
            if (err) throw err;
            console.log("Table 'roomTable' created");

            // Create a table called `Meeting`
            const meetingTable = `
          CREATE TABLE IF NOT EXISTS Meeting (
            meeting_no INT AUTO_INCREMENT PRIMARY KEY,
            meeting_title VARCHAR(255) NOT NULL,
            starting_time DATETIME NOT NULL,
            ending_time DATETIME NOT NULL,
            room_no INT NOT NULL
          );
          `;

            con.query(meetingTable, function (err, result) {
              if (err) throw err;
              console.log("Table 'meetingTable' created");

              // Insert data of 'invitee' to table
              const insertInvitee = `
              INSERT INTO Invitee (invitee_name, invited_by)
              VALUES ('Frank', 'John'),
                ('Mehran', 'Anne'),
                ('Rob', 'Eva'),
                ('Wouter', 'Fedi'),
                ('Ali', 'M0hamad');
              `;

              con.query(insertInvitee, (err, result) => {
                if (err) throw err;
                console.log("Data inserted into 'Invitee' table");
              });

              // Insert data of 'Room' to table
              const InsertRoom = `
              INSERT INTO Room (room_name, floor_number)
              VALUES ('Room Abc', 1),
                ('Room Bcd', 2),
                ('Room Cer', 1),
                ('Room Dfg', 2),
                ('Room Ert', 2);
              `;

              con.query(InsertRoom, (err, result) => {
                if (err) throw err;
                console.log("Data inserted into 'insertRoom' table");
              });

              // Insert data of 'Meeting' to table
              const insertMeeting = `
              INSERT INTO Meeting (
                meeting_title,
                starting_time,
                ending_time,
                room_no
              )
              VALUES (
                'JavaScript Workshop',
                '2023-10-10 11:00:00',
                '2023-10-10 15:00:00',
                1
              ),
              (
                'React Workshop',
                '2023-10-10 09:00:00',
                '2023-10-10 17:00:00',
                3
              ),
              (
                'Node.js Workshop',
                '2023-10-10 13:00:00',
                '2023-10-10 18:00:00',
                5
              ),
              (
                'MySQL Workshop',
                '2023-10-10 10:00:00',
                '2023-10-10 14:30:00',
                4
              ),
              (
                'CSS Workshop',
                '2023-10-10 09:30:00',
                '2023-10-10 16:00:00',
                2
              );
              `;

              con.query(insertMeeting, (err, result) => {
                if (err) throw err;
                console.log("Data inserted into insertRoom table");
              });

              // Run the result or test
              // Test SELECT * FROM Invitee
              con.query("SELECT * FROM Invitee", (err, inviteeTest) => {
                if (err) throw err;
                console.log(inviteeTest);
              });

              // Test SELECT * FROM Room
              con.query("SELECT * FROM Room", (err, RoomTest) => {
                if (err) throw err;
                console.log(RoomTest);
              });

              // Test SELECT * FROM Meeting
              con.query("SELECT * FROM Meeting", (err, MeetingTest) => {
                if (err) throw err;
                console.log(MeetingTest);
              });

              // Close the connection
              con.end();
            });
          });
        });
      });
    });
  });
});
