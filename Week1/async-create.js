const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'class19',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_STUDENTS_TABLE = `
    CREATE TABLE IF NOT EXISTS students (
      student_number INT,
      student_name VARCHAR(50),
      date_of_birth DATE,
      grade FLOAT,
      gender ENUM('m', 'f')
    );`;
  const CREATE_TEACHERS_TABLE = `
    CREATE TABLE IF NOT EXISTS teachers (
      teacher_number INT,
      teacher_name VARCHAR(50),
      date_of_birth DATE,
      subject TEXT,
      gender ENUM('m', 'f')
    );`;
  const students = [
    {
      student_number: 1001,
      student_name: 'Ben',
      date_of_birth: '1995-04-26',
      grade: 8.3,
      gender: 'm',
    },
    {
      student_number: 1002,
      student_name: 'Henri',
      date_of_birth: '1998-05-12',
      grade: 8.5,
      gender: 'm',
    },
  ];

  connection.connect();

  try {
    await Promise.all[execQuery(CREATE_STUDENTS_TABLE), execQuery(CREATE_TEACHERS_TABLE)];
    
    await Promise.all(students.map(student =>
      execQuery('INSERT INTO students SET ?', student)
    );
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
