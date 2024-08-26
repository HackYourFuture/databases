const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    multipleStatements: true
});


/*Connect to SQL server*/
connection.connect(err => {
    if (err) {
        return console.error('Connection error: ' + err.stack);
    }
    console.log('Connected!');
});


/*SQL queries*/
const createDatabaseAndTables =
    `DROP DATABASE IF EXISTS meetup;
    CREATE DATABASE meetup;
    USE meetup;
    
    CREATE TABLE Invitee (
    invitee_no INT AUTO_INCREMENT PRIMARY KEY,
    invitee_name VARCHAR(100),
    invited_by VARCHAR(100)
    );
    
    CREATE TABLE Room (
    room_no INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(50),
    floor_number INT
    );

    CREATE TABLE Meeting (
      meeting_no INT AUTO_INCREMENT PRIMARY KEY,
      meeting_title VARCHAR(100),
      starting_time DATETIME,
      ending_time DATETIME,
      room_no INT,
      FOREIGN KEY (room_no) REFERENCES Room(room_no)
    );
    
    INSERT INTO Room (room_name, floor_number) VALUES
    ('Paris', 1),
    ('New York', 2),
    ('Tokyo', 3),
    ('London', 4),
    ('Berlin', 5);
    
    INSERT INTO Invitee (invitee_name, invited_by) VALUES
    ('Victor Hugo', 'Alexandre Dumas'),
    ('Mark Twain', 'Henry James'),
    ('Haruki Murakami', 'Kenzaburo Oe'),
    ('Charles Dickens', 'Wilkie Collins'),
    ('Albert Einstein', 'Niels Bohr');

    INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
    ('Literary Classics Discussion', '2024-08-01 09:00:00', '2024-08-01 10:00:00', 1),
    ('American Literature Seminar', '2024-08-02 11:00:00', '2024-08-02 12:00:00', 2),
    ('Japanese Fiction Workshop', '2024-08-03 14:00:00', '2024-08-03 15:00:00', 3),
    ('Victorian Literature Symposium', '2024-08-04 16:00:00', '2024-08-04 17:00:00', 4),
    ('Scientific Innovations Forum', '2024-08-05 13:00:00', '2024-08-05 14:00:00', 5);`;


// Execute the queries
connection.query(createDatabaseAndTables, (error, results, fields) => {
    if (error) throw error;
    console.log('Database and tables created, and data inserted');
});

// Close the connection
connection.end();