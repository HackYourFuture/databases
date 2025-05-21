import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
})

connection.connect()

connection.query('DROP DATABASE IF EXISTS meetup', function (err) {
  if (err) {
    console.log('Error dropping database:', err.message)
    return
  }

  connection.query('CREATE DATABASE meetup', function (err) {
    if (err) {
      console.log('Error creating database:', err.message)
      return
    }

    console.log('Database meetup created')

    const conn2 = mysql.createConnection({
      host: 'localhost',
      user: 'hyfuser',
      password: 'hyfpassword',
      database: 'meetup',
    })

    conn2.connect()

    const createInvitee = `
      CREATE TABLE Invitee (
        invitee_no INT PRIMARY KEY,
        invitee_name VARCHAR(50),
        invited_by INT
      )
    `

    const createRoom = `
      CREATE TABLE Room (
        room_no INT PRIMARY KEY,
        room_name VARCHAR(50),
        floor_number INT
      )
    `

    const createMeeting = `
      CREATE TABLE Meeting (
        meeting_no INT PRIMARY KEY,
        meeting_title VARCHAR(100),
        starting_time DATETIME,
        ending_time DATETIME,
        room_no INT,
        FOREIGN KEY (room_no) REFERENCES Room(room_no)
      )
    `

    conn2.query(createInvitee, function (err) {
      if (err) console.log('Error creating Invitee table:', err.message)
    })

    conn2.query(createRoom, function (err) {
      if (err) console.log('Error creating Room table:', err.message)
    })

    conn2.query(createMeeting, function (err) {
      if (err) console.log('Error creating Meeting table:', err.message)
    })

    const insertInvitee = `
      INSERT INTO Invitee VALUES
      (1, 'Natalia', NULL),
      (2, 'Ivan', 1),
      (3, 'Roman', 2),
      (4, 'Vera', 1),
      (5, 'Nadia', 3)
    `

    const insertRoom = `
      INSERT INTO Room VALUES
      (1, 'Orion', 1),
      (2, 'Pegasus', 2),
      (3, 'Lyra', 1),
      (4, 'Andromeda', 3),
      (5, 'Phoenix', 2)
    `

    const insertMeeting = `
      INSERT INTO Meeting VALUES
      (1, 'Team sync', '2025-05-18 10:00:00', '2025-05-18 11:00:00', 1),
      (2, 'Design review', '2025-05-19 11:30:00', '2025-05-19 12:30:00', 2),
      (3, 'Lunch talk', '2025-05-20 13:00:00', '2025-05-20 14:00:00', 3),
      (4, 'Workshop', '2025-05-21 14:30:00', '2025-05-21 16:00:00', 4),
      (5, 'Retro', '2025-05-22 16:30:00', '2025-05-22 17:30:00', 5)
    `

    conn2.query(insertInvitee, function (err) {
      if (err) console.log('Error inserting Invitee data:', err.message)
    })

    conn2.query(insertRoom, function (err) {
      if (err) console.log('Error inserting Room data:', err.message)
    })

    conn2.query(insertMeeting, function (err) {
      if (err) {
        console.log('Error inserting Meeting data:', err.message)
      } else {
        console.log('Tables created and data inserted')
      }
      conn2.end()
      connection.end()
    })
  })
})
