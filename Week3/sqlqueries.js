const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

connection.connect();
const database =
  'CREATE DATABASE IF NOT EXISTS todoapp DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci';
const useDatabase = 'use todoapp';

const users =
  'create table IF NOT EXISTS users (id int PRIMARY KEY, username varchar(50), password varchar(50), email varchar(50), created_at timestamp)';
const todolists =
  'create table IF NOT EXISTS todolists (id int PRIMARY KEY, list_name varchar(255), created_at datetime DEFAULT now(), user_id int)';
const tasks =
  "create table IF NOT EXISTS tasks (id int PRIMARY KEY, name varchar(255), task_id int NOT NULL, status ENUM('completed', 'not_completed'), created_at datetime DEFAULT now())";

const key1 = 'ALTER TABLE `todolists` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)';

const key2 = 'ALTER TABLE `tasks` ADD FOREIGN KEY (`task_id`) REFERENCES `todolists` (`id`)';

const create_database = [database, useDatabase, users, todolists, tasks, key1, key2];

for (let i in create_database) {
  console.log('Going to run ', create_database[i]);
  connection.query(create_database[i], function(error, fields) {
    if (error) {
      throw error;
    }
  });
}

console.log('***Successfully created tables and submitted queries***');

connection.end();
