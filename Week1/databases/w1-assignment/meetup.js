import mysql from 'mysql2/promise';

async function setupDatabase() {
    // Create a MySQL connection without selecting a database initially
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'Samira2280067511@',
        database: 'meetup',
        multipleStatements: true // Allow multiple SQL statements
    });

    try {
        // Create the database if it does not exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS meetup`);

        // Change the active database to 'meetup'
        await connection.changeUser({ database: 'meetup' });

        //Create Tables
        const createInviteeTable = `
            CREATE TABLE IF NOT EXISTS Invitee (
                invitee_no INT AUTO_INCREMENT PRIMARY KEY,
                invitee_name VARCHAR(255) NOT NULL,
                invited_by VARCHAR(255) NOT NULL
            );
        `;

        const createRoomTable = `
            CREATE TABLE IF NOT EXISTS Room (
                room_no INT PRIMARY KEY,
                room_name VARCHAR(255),
                floor_number INT NOT NULL
            );
        `;

        const createMeetingTable = `
            CREATE TABLE IF NOT EXISTS Meeting (
                meeting_no INT AUTO_INCREMENT PRIMARY KEY,
                meeting_title VARCHAR(100) NOT NULL,
                starting_time DATETIME NOT NULL,
                ending_time DATETIME NOT NULL,
                room_no INT NOT NULL,
                FOREIGN KEY (room_no) REFERENCES Room(room_no)
            );
        `;

        // Execute table creation queries
        await connection.query(createInviteeTable);
        await connection.query(createRoomTable);
        await connection.query(createMeetingTable);

        // Step 4: Insert Data into Tables
        const insertInvitees = `
            INSERT INTO Invitee (invitee_name, invited_by) VALUES 
            ('David', 'Alice'),
            ('Eve', 'Bob'),
            ('Fred', 'Alice'),
            ('Gina', 'Charlie'),
            ('Harry', 'Eve');
        `;

        const insertRooms = `
            INSERT IGNORE INTO Room (room_no, room_name, floor_number) VALUES 
            (1, 'Conference Room A', 1),
            (2, 'Conference Room B', 1),
            (3, 'Conference Room C', 3),
            (4, 'Main Hall', 1),
            (5, 'Board Room', 1);

        `;

        const insertMeetings = `
            INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES 
            ('Client Meeting', '2025-01-15 11:00:00', '2025-01-15 12:00:00', 1),
            ('Lunch Break', '2025-01-15 12:00:00', '2025-01-15 13:00:00', 2),
            ('Networking Event', '2025-01-15 13:00:00', '2025-01-15 14:00:00', 3),
            ('Project Presentation', '2025-01-15 14:00:00', '2025-01-15 15:00:00', 4),
            ('Board Game Night', '2025-01-15 15:00:00', '2025-01-15 16:00:00', 5);
        `;

        // Execute insert queries
        await connection.query(insertInvitees);
        await connection.query(insertRooms);
        await connection.query(insertMeetings);

        console.log("Database setup and data insertion complete!");

    } catch (err) {
        console.error("An error occurred during database setup:", err);
    } finally {
        // Close the database connection
        await connection.end();
    }
}

// Run the database setup function
setupDatabase();