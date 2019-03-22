const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'wecan',
});

// Promisify the bind function of query function of connection object
// Pass connection object (because bind expects "this")
// Afterwards execQuery will work as a function that returns a promise but
// we don't have to call "then" over that promise
const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const CREATE_Employees_TABLE = `
    CREATE TABLE IF NOT EXISTS employees (
      emp_no INT,
      emp_name VARCHAR(50),
      date_of_birth DATE,
      salary FLOAT,
      gender ENUM('m', 'f'),
      reports INT,
      dept_no INT,
      primary key(emp_no),
      foreign key(dept_no)references departments(dept_no)
    );`;
  const CREATE_Department_TABLE = `
    CREATE TABLE IF NOT EXISTS departments (
     dept_no INT not null auto_increment,
      dept_name VARCHAR(50),
      manager_no INT,
      primary key(dept_no)
      
    );`;
  const departments = [
    {
      dept_no: 101,
      dept_name: 'sales',
      manager_no: 3,
    },
    {
      dept_no: 102,
      dept_name: 'Development',
      manager_no: 3,
    },
    {
      dept_no: 103,
      dept_name: 'HR',
      manager_no: 3,
    },
  ];

  connection.connect();

  try {
    // call the function that returns promise
    await execQuery(CREATE_Department_TABLE);
    await execQuery(CREATE_Employees_TABLE);
    departments.forEach(async dept => {
      await execQuery('INSERT INTO departments SET ?', dept);
    });
  } catch (error) {
    console.error(error);
  }

  connection.end();
}

seedDatabase();
