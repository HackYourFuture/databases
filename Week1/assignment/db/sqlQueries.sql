CREATE DATABASE IF NOT EXISTS meetup;

use meetup;

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

INSERT INTO Invitee (invitee_name, invited_by) VALUES ('John', 'Jane');
INSERT INTO Invitee (invitee_name, invited_by) VALUES ('Jane', 'John');
INSERT INTO Invitee (invitee_name, invited_by) VALUES ('Jack', 'Jill');
INSERT INTO Invitee (invitee_name, invited_by) VALUES ('Jill', 'Jack');
INSERT INTO Invitee (invitee_name, invited_by) VALUES ('Jim', 'Jill');


