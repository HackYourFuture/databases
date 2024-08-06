const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    multipleStatements: true // Enable multiple statements
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }

    console.log('Connected to the database as id', connection.threadId);

    // Drop and recreate the database
    const createDatabaseQuery = `
        DROP DATABASE IF EXISTS meetup;
        CREATE DATABASE meetup;
        USE meetup;

        -- Create the Invitee table
        CREATE TABLE Invitee (
            invitee_no INT AUTO_INCREMENT PRIMARY KEY,
            invitee_name VARCHAR(255) NOT NULL,
            invited_by VARCHAR(255)
        );

        -- Create the Room table
        CREATE TABLE Room (
            room_no INT AUTO_INCREMENT PRIMARY KEY,
            room_name VARCHAR(255) NOT NULL,
            floor_number INT
        );

        -- Create the Meeting table
        CREATE TABLE Meeting (
            meeting_no INT AUTO_INCREMENT PRIMARY KEY,
            meeting_title VARCHAR(255) NOT NULL,
            starting_time DATETIME NOT NULL,
            ending_time DATETIME NOT NULL,
            room_no INT,
            FOREIGN KEY (room_no) REFERENCES Room(room_no)
        );

        -- Insert data into Invitee table
        INSERT INTO Invitee (invitee_name, invited_by) VALUES
        ('John Doe', 'Jane Smith'),
        ('Alice Johnson', 'Bob Brown'),
        ('Charlie Black', 'Dana White'),
        ('Eve Davis', 'Frank Moore'),
        ('Grace Hill', 'Henry King');

        -- Insert data into Room table
        INSERT INTO Room (room_name, floor_number) VALUES
        ('Conference Room A', 1),
        ('Conference Room B', 2),
        ('Conference Room C', 3),
        ('Meeting Room 1', 1),
        ('Meeting Room 2', 2);

        -- Insert data into Meeting table
        INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
        ('Project Kickoff', '2024-08-01 09:00:00', '2024-08-01 10:00:00', 1),
        ('Team Standup', '2024-08-01 10:30:00', '2024-08-01 11:00:00', 2),
        ('Client Presentation', '2024-08-01 11:30:00', '2024-08-01 12:30:00', 3),
        ('Budget Review', '2024-08-01 13:00:00', '2024-08-01 14:00:00', 4),
        ('Strategy Meeting', '2024-08-01 14:30:00', '2024-08-01 15:30:00', 5);
    `;

    connection.query(createDatabaseQuery, (error, results, fields) => {
        if (error) throw error;

        console.log('Database and tables created successfully, data inserted');
        connection.end();
    });
});
