import { createConnection } from "mysql";

export const tables = [
      `CREATE TABLE if not exists Invitee (
          invitee_no INT PRIMARY KEY  AUTO_INCREMENT, 
          invitee_name VARCHAR(200),
          invited_by VARCHAR(200));`,

      `CREATE TABLE if not exists Room (
          room_no INT PRIMARY KEY  AUTO_INCREMENT, 
          room_name TEXT, 
          floor_number INT );`,

      `CREATE TABLE if not exists Meeting (
          meeting_no INT PRIMARY KEY  AUTO_INCREMENT,
          meeting_title TEXT,
          starting_time TIMESTAMP ,
          ending_time TIMESTAMP,
          room_no int,
          FOREIGN KEY(room_no) REFERENCES ROOM(room_no) 
          );`,
];

export const values = [
      ` INSERT INTO  Invitee (invitee_name, invited_by)
         VALUES ('Person1', 'Person2'),
         ('Person3','Person3'),
         ('Person 4','Person2'),
         ('Person5','Person3'),
         ('Person6','Person1')`,

      ` INSERT INTO  Room (room_name, floor_number)
           VALUES ('Room1', 1),
           ('Room2',2),
           ('Room3',3),
           ('Room4',4),
           ('Room5',5)`,

      `INSERT INTO Meeting(meeting_title, starting_time, ending_time,room_no )
       VALUES('Meeting Room 1', '2022-10-29 17:00:00', '2022-10-29 19:00:00',2),
       ('Meeting Room 2', '2022-10-29 12:00:00', '2022-10-29 13:00:00',3),
       ('Meeting Room 3', '2022-10-29 09:00:00', '2022-10-29 10:00:00',1),
       ('Meeting Room 4', '2022-10-29 11:00:00', '2022-10-29 12:00:00',4),
       ('Meeting Room 5', '2022-10-29 15:00:00', '2022-10-29 14:00:00',5)`,
];