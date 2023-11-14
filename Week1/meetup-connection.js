const mysql = require("mysql");
// MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  multipleStatements: true,
});
// Create database query 
// The AUTO_INCREMENT attribute in SQL is used to automatically generate a unique numeric value


const setupQuery = `
  DROP DATABASE IF EXISTS \`meetup_mysql\`;
  CREATE DATABASE \`meetup_mysql\`;
  USE \`meetup_mysql\`;

  CREATE TABLE Invitee (
    invitee_no INT AUTO_INCREMENT PRIMARY KEY,
    invitee_name VARCHAR(255),
    invited_by VARCHAR(255)
  );

  CREATE TABLE Room (
    room_no INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(255),
    floor_number INT
  );

  CREATE TABLE Meeting (
    meeting_no INT AUTO_INCREMENT PRIMARY KEY,
    meeting_title VARCHAR(255),
    starting_time DATETIME,
    ending_time DATETIME,
    room_no INT,
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
  );

  INSERT INTO Invitee (invitee_name, invited_by) VALUES
    ('Amir Hossein', 'Sara Rahimi'),
    ('Narges Mohammadi', 'Ali Rezaei'),
    ('Maryam Esfahani', 'Mohammad Jafari'),
    ('Behzad Mahmoudi', 'Sara Ghasemi'),
    ('Fatemeh Kazemi', 'Reza Karimi');

  INSERT INTO Room (room_name, floor_number) VALUES
    ('Conference Hall 1', 1),
    ('Conference Hall 2', 2),
    ('Boardroom A', 3),
    ('Meeting Room X', 1),
    ('Meeting Room Y', 2);

  INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
    ('Team Discussion', '2023-11-15 09:00:00', '2023-11-15 10:00:00', 1),
    ('Project Review', '2023-11-16 14:00:00', '2023-11-16 16:00:00', 2),
    ('Board Meeting', '2023-11-17 11:00:00', '2023-11-17 12:00:00', 3),
    ('Training Session', '2023-11-18 13:00:00', '2023-11-18 15:00:00', 4),
    ('Planning Discussion', '2023-11-19 10:30:00', '2023-11-19 11:30:00', 5);
`;


connection.connect((err) => {
  if (err) {
    return console.error("Error : " + err.stack);
    
  }
  console.log("Connected to MySQL");

  connection.query(setupQuery, (error, results, fields) => {
    if (error) throw error;
    console.log("Database setup completed successfully.");

    connection.end((err) => {
      if (err) {
        console.error("Error: " + err.stack);
        return;
      }
      console.log("MySQL connection closed.");
    });
  });
});
