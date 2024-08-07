var mysql = require('mysql2');


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'meetup'
});

connection.connect(error => {
  if (error) {
    console.error('Error connecting to the database:', error.stack);
    return;
  }
  console.log('Connected to the database as ID', connection.threadId);


  const createEmployeesTable = `
    CREATE TABLE IF NOT EXISTS employees (
      id INT AUTO_INCREMENT PRIMARY KEY,
      invitee_no VARCHAR(100),
      invitee_name VARCHAR(50),
      invited_by DECIMAL(10, 2)
    );
  `;

  const createRoomTable = `
    CREATE TABLE IF NOT EXISTS Room (
      id INT AUTO_INCREMENT PRIMARY KEY,
      room_no VARCHAR(100),
      room_name VARCHAR(50),
      floor_number DECIMAL(10, 2)
    );
  `;

  const createMeetingTable = `
    CREATE TABLE IF NOT EXISTS Meeting (
      id INT AUTO_INCREMENT PRIMARY KEY,
      meeting_no VARCHAR(100),
      meeting_title VARCHAR(50),
      starting_time DATETIME,
      ending_time DATETIME,
      room_no VARCHAR(100)
    );
  `;

  
  connection.query(createEmployeesTable, (err, results) => {
    if (err) {
      console.error('Error creating employees table:', err.stack);
      return;
    }
    console.log('Employees table created successfully.');

    connection.query(createRoomTable, (err, results) => {
      if (err) {
        console.error('Error creating Room table:', err.stack);
        return;
      }
      console.log('Room table created successfully.');

      connection.query(createMeetingTable, (err, results) => {
        if (err) {
          console.error('Error creating Meeting table:', err.stack);
          return;
        }
        console.log('Meeting table created successfully.');

        
        connection.end();
      });
    });
  });
});
   
   const insertEmployees = `
   INSERT INTO employees (invitee_no, invitee_name, invited_by) VALUES
   ('INV001', 'Alice Johnson', 500.00),
   ('INV002', 'Bob Smith', 300.00),
   ('INV003', 'Charlie Brown', 450.00),
   ('INV004', 'Diana Prince', 600.00),
   ('INV005', 'Eve Adams', 550.00);
 `;

 const insertRoom = `
   INSERT INTO Room (room_no, room_name, floor_number) VALUES
   ('R001', 'Conference Room A', 1),
   ('R002', 'Conference Room B', 1),
   ('R003', 'Meeting Room C', 2),
   ('R004', 'Meeting Room D', 2),
   ('R005', 'Executive Room', 3);
 `;

 const insertMeeting = `
   INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) VALUES
   ('M001', 'Team Sync', '2024-08-07 09:00:00', '2024-08-07 10:00:00', 'R001'),
   ('M002', 'Project Kickoff', '2024-08-07 10:30:00', '2024-08-07 11:30:00', 'R002'),
   ('M003', 'Weekly Review', '2024-08-07 13:00:00', '2024-08-07 14:00:00', 'R003'),
   ('M004', 'Client Presentation', '2024-08-07 15:00:00', '2024-08-07 16:30:00', 'R004'),
   ('M005', 'Strategic Planning', '2024-08-07 17:00:00', '2024-08-07 18:00:00', 'R005');
 `;

 connection.query(insertEmployees, (err, results) => {
   if (err) {
     console.error('Error inserting data into employees:', err.stack);
     return;
   }
   console.log('Data inserted into employees table.');

   connection.query(insertRoom, (err, results) => {
     if (err) {
       console.error('Error inserting data into Room:', err.stack);
       return;
     }
     console.log('Data inserted into Room table.');

     connection.query(insertMeeting, (err, results) => {
       if (err) {
         console.error('Error inserting data into Meeting:', err.stack);
         return;
       }
       console.log('Data inserted into Meeting table.');
     })})})