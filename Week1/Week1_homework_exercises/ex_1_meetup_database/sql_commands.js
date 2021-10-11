export const inviteeTable = `CREATE TABLE invitee (invitee_no int , invitee_name varchar(50), invited_by text)`;
export const roomTable = `CREATE TABLE room (room_no int , room_name varchar(50), floor_number int)`;
export const meetingTable = `CREATE TABLE meeting (meeting_no int , meeting_title varchar(50), starting_time time, ending_time time, room_no int )`;
export const insertInvitee = `INSERT INTO invitee VALUES ?`;
export const inviteeValues = [
  [1, "Obada", "Steve Jobs"],
  [2, "Reshad", "Mark Zuckerberg"],
  [3, "Reema", "Jeff Bezos"],
  [4, "Claudia", "Elon Musk"],
  [5, "Esranur", "Larry Page"],
];
export const insertRoom = `INSERT INTO room VALUES ?`;
export const roomValues = [
  [101, "Amsterdam", 1],
  [303, "Rotterdam", 3],
  [306, "Gouda", 3],
  [410, "Leiden", 4],
  [420, "Maastricht", 4],
];
export const insertMeeting = `INSERT INTO meeting VALUES ?`;
export const meetingValues = [
  [1, "node.js", "08:00:00", "09:50:00", 1],
  [2, "AJAX", "10:00:00", "11:50:00", 3],
  [3, "API", "13:00:00", "14:50:00", 5],
  [4, "REACT", "15:00:00", "16:50:00", 4],
  [5, "Databases", "17:00:00", "18:50:00", 2],
];
