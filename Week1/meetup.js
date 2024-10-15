const mysql = require('mysql');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',       // Replace with your MySQL username
    password: 'nima',   // Replace with your MySQL password
});

// Connect to the MySQL server
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');

  // Step 1: Drop and create the `meetup` database
    connection.query('DROP DATABASE IF EXISTS meetup', (err, result) => {
    if (err) throw err;
    console.log('Database dropped');

    connection.query('CREATE DATABASE meetup', (err, result) => {
    if (err) throw err;
    console.log('Database created');

      // Use the `meetup` database
    connection.query('USE meetup', (err, result) => {
        if (err) throw err;
        console.log('Using meetup database');

        // Step 2: Create the `Invitee` table
        const createInviteeTable = `
            CREATE TABLE IF NOT EXISTS Invitee (
            invitee_no INT AUTO_INCREMENT PRIMARY KEY,
            invitee_name VARCHAR(255) NOT NULL,
            invited_by VARCHAR(255)
            )
        `;
        connection.query(createInviteeTable, (err, result) => {
            if (err) throw err;
            console.log('Invitee table created');

          // Step 3: Create the `Room` table
            const createRoomTable = `
            CREATE TABLE IF NOT EXISTS Room (
                room_no INT AUTO_INCREMENT PRIMARY KEY,
                room_name VARCHAR(255) NOT NULL,
                floor_number INT
            )
            `;
            connection.query(createRoomTable, (err, result) => {
            if (err) throw err;
            console.log('Room table created');

            // Step 4: Create the `Meeting` table
            const createMeetingTable = `
                CREATE TABLE IF NOT EXISTS Meeting (
                meeting_no INT AUTO_INCREMENT PRIMARY KEY,
                meeting_title VARCHAR(255) NOT NULL,
                starting_time DATETIME,
                ending_time DATETIME,
                room_no INT,
                FOREIGN KEY (room_no) REFERENCES Room(room_no)
                )
            `;
            connection.query(createMeetingTable, (err, result) => {
                if (err) throw err;
                console.log('Meeting table created');

              // Step 5: Insert rows into `Invitee` table
                const inviteeData = `
                INSERT INTO Invitee (invitee_name, invited_by)
                VALUES 
                    ('Alice', 'Bob'),
                    ('Charlie', 'Dave'),
                    ('Eve', 'Frank'),
                    ('Grace', 'Heidi'),
                    ('Ivan', 'Judy')
                `;
                connection.query(inviteeData, (err, result) => {
                if (err) throw err;
                console.log('Inserted data into Invitee table');

                // Step 6: Insert rows into `Room` table
                const roomData = `
                    INSERT INTO Room (room_name, floor_number)
                    VALUES 
                    ('Conference Room A', 1),
                    ('Conference Room B', 2),
                    ('Main Hall', 1),
                    ('Meeting Room C', 3),
                    ('Workshop Room', 4)
                `;
                connection.query(roomData, (err, result) => {
                    if (err) throw err;
                    console.log('Inserted data into Room table');

                  // Step 7: Insert rows into `Meeting` table
                    const meetingData = `
                    INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
                    VALUES 
                        ('Project Kickoff', '2024-10-10 09:00:00', '2024-10-10 10:00:00', 1),
                        ('Team Standup', '2024-10-11 10:00:00', '2024-10-11 10:30:00', 2),
                        ('Client Presentation', '2024-10-12 14:00:00', '2024-10-12 15:30:00', 3),
                        ('Workshop', '2024-10-13 11:00:00', '2024-10-13 13:00:00', 4),
                        ('Quarterly Review', '2024-10-14 15:00:00', '2024-10-14 17:00:00', 5)
                    `;
                    connection.query(meetingData, (err, result) => {
                    if (err) throw err;
                    console.log('Inserted data into Meeting table');

                    // Close the connection
                    connection.end();
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