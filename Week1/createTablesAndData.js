// createTablesAndData.js
const createDatabaseAndTables = `
    DROP DATABASE IF EXISTS meetup;
    CREATE DATABASE meetup;
    USE meetup;

    CREATE TABLE Invitee (
        invitee_no INT AUTO_INCREMENT PRIMARY KEY,
        invitee_name VARCHAR(255) NOT NULL,
        invited_by VARCHAR(255)
    );

    CREATE TABLE Room (
        room_no INT AUTO_INCREMENT PRIMARY KEY,
        room_name VARCHAR(255) NOT NULL,
        floor_number INT
    );

    CREATE TABLE Meeting (
        meeting_no INT AUTO_INCREMENT PRIMARY KEY,
        meeting_title VARCHAR(255) NOT NULL,
        starting_time DATETIME,
        ending_time DATETIME,
        room_no INT,
        FOREIGN KEY (room_no) REFERENCES Room(room_no)
    );

    INSERT INTO Invitee (invitee_name, invited_by) VALUES 
    ('Alice', 'Bob'), 
    ('Charlie', 'Dave'), 
    ('Eve', 'Frank'), 
    ('Grace', 'Heidi'), 
    ('Ivy', 'Judy');

    INSERT INTO Room (room_name, floor_number) VALUES 
    ('Room A', 1), 
    ('Room B', 2), 
    ('Room C', 3), 
    ('Room D', 4), 
    ('Room E', 5);

    INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES 
    ('Meeting 1', '2024-08-01 09:00:00', '2024-08-01 10:00:00', 1),
    ('Meeting 2', '2024-08-01 10:30:00', '2024-08-01 11:30:00', 2),
    ('Meeting 3', '2024-08-01 12:00:00', '2024-08-01 13:00:00', 3),
    ('Meeting 4', '2024-08-01 14:00:00', '2024-08-01 15:00:00', 4),
    ('Meeting 5', '2024-08-01 16:00:00', '2024-08-01 17:00:00', 5);
`;

module.exports = createDatabaseAndTables;
