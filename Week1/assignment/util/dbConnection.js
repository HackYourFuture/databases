import env from 'dotenv';
env.config({ path: '../.env' });
import mysql from 'mysql2';

console.log;
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'meetup',
});

export default db;
