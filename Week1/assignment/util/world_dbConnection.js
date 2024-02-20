import env from 'dotenv';
env.config({ path: '../.env' });
import mysql from 'mysql2';
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'world',
});

export default db;
