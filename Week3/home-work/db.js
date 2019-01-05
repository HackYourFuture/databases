const mysql = require('mysql');
const util = require('util');
const connection = mysql.createConnection({
   host: 'localhost',
   user: 'hyfuser',
   password: 'hyfpassword',
   database: 'todoapp'
});

const execQuery = util.promisify(connection.query.bind(connection));

async function createData() {
   let sql = "CREATE DATABASE IF NOT EXISTS todo_data"
   let use_sql = "USE todo_data"
   let users = `CREATE TABLE IF NOT EXISTS
       Users(Id varchar(100) NOT NULL PRIMARY KEY UNIQUE,
       FirstName varchar(50) NOT NULL ,
       LastName varchar(50))`
   let toDosList = ` CREATE TABLE IF NOT EXISTS ToDosList(
       listId int NOT NULL AUTO_INCREMENT PRIMARY KEY,UserId varchar(100)
       NOT NULL,Category varchar(30) NOT NULL UNIQUE,Prioritize ENUM('T','F')
       NOT NULL DEFAULT 'F',FOREIGN KEY(userId) REFERENCES users(Id),TimeToDo DATETIME NULL)`
   let todoItems = `CREATE TABLE IF NOT EXISTS TodoItems(
      itemID int NOT NULL AUTO_INCREMENT PRIMARY KEY,listId int NOT NULL,todo varchar(25) NOT NULL UNIQUE,
       Description text NULL,Prioritize ENUM('T','F') NOT NULL DEFAULT 'F',
       FOREIGN KEY(listId) REFERENCES toDosList(listId), Completed enum('T','F') NOT NULL DEFAULT 'F')`
   connection.connect();
   try {
      await execQuery(sql);
      await execQuery(use_sql);
      await execQuery(users);
      await execQuery(toDosList);
      await execQuery(todoItems);
   } catch (error) {
      throw error
   }
   connection.end();
}

createData();