export const createDatabase = ["CREATE DATABASE meetup;"];

export const dropDatabase = ["drop database meetup;"];

export const useDatabase = ["USE meetup;"];

export const createTables = [
  `CREATE TABLE IF NOT EXISTS Invitee(
        invitee_no  INT AUTO_INCREMENT NOT NULL,
        invitee_name VARCHAR (255) NOT NULL,
        invited_by VARCHAR (255) NOT NULL,
        PRIMARY KEY(invitee_no)
        );`,

  `CREATE TABLE IF NOT EXISTS room (
        room_no INT NOT NULL,
        room_name VARCHAR (255) NOT NULL,
        floor_number INT NOT NULL,
        PRIMARY KEY(room_no)
        );`,

  `CREATE TABLE IF NOT EXISTS meeting(
        meeting_no INT AUTO_INCREMENT NOT NULL,
        meeting_title VARCHAR (255) NOT NULL,
        starting_time TIME NOT NULL,
        ending_time TIME NOT NULL,
        room_no INT NOT NULL,
        PRIMARY KEY (meeting_no),
        FOREIGN KEY (room_no) REFERENCES room(room_no)
        );`,
];

export const insertDataIntoTables = [
  `INSERT INTO Invitee (invitee_name, invited_by)
	VALUES 
		('employee_1', 'manager'),
        ('employee_2', 'manager'),
        ('employee_3', 'manager'),
        ('employee_4', 'manager'),
        ('employee_5', 'manager');`,

  `INSERT INTO room (room_no, room_name, floor_number)
        VALUES 
            (5, 'Creativity room', 1),
            (4, 'Space room', 2),
            (3, 'Sciences room', 3),
            (2, 'Literature room', 4),
            (1, 'Humanity room', 5);`,

  `INSERT INTO meeting (meeting_title, starting_time, ending_time, room_no)
            VALUES 
                ('Create a monthly work plan.', '08:00:00', '09:00:00', 1),
                ('Develop team skills.', '09:00:00', '10:00:00', 2),
                ('The financial study of the company.', '10:15:00', '11:15:00', 3),
                ('Solve administrative problems.', '11:30:00', '12:30:00', 4),
                ('Discuss monthly bonuses.', '13:00:00', '14:30:00', 5);`,
];
