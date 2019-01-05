"use strict"

const mysql = require("mysql");
const util = require("util");
const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword"
});

const execQuery = util.promisify(con.query.bind(con));

async function createDB() {
  try {
    let a = await execQuery(`CREATE DATABASE IF NOT EXISTS todoList;`);
    await execQuery(`USE todoList;`);

    await execQuery(`CREATE TABLE IF NOT EXISTS user( email VARCHAR(50) PRIMARY KEY, name VARCHAR(20) NOT NULL, psw VARBINARY(50) NOT NULL UNIQUE);`);

    await execQuery(`CREATE TABLE IF NOT EXISTS list( id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(30) NOT NULL, category ENUM('holiday', 'work', 'meeting', 'family', 'friends', 'personal') NOT NULL, userId VARCHAR(50), FOREIGN KEY(userId) REFERENCES user(email));`);

    await execQuery(`CREATE TABLE IF NOT EXISTS todo( name VARCHAR(30), listId INT, description VARCHAR(200) NOT NULL, isCompleted ENUM('true', 'false') NOT NULL, tag ENUM('important', 'normal', 'regular') NOT NULL, PRIMARY KEY(name, listId), FOREIGN KEY(listId) REFERENCES list(id));`);

    await execQuery(`CREATE TABLE IF NOT EXISTS reminder( reminderId INT, date DATE NOT NULL, startTime TIME NOT NULL, endTime TIME NOT NULL, FOREIGN KEY(reminderId) REFERENCES list(id));`);

    await execQuery(`ALTER TABLE list AUTO_INCREMENT = 100;`);
  } catch (err) {
    con.end();
  }
}

createDB();

module.exports = {

  createAccount: async function (newUser) {
    try {
      await execQuery("INSERT INTO user SET ?", newUser);
    } catch (err) {
      return err;
    }
  },
  checkUser: async function (user) {
    try {
      const userInfo = await execQuery(`SELECT name, email FROM user WHERE user.email = '${user.email}' AND user.psw = '${user.psw}'`);
      return userInfo[0];
    } catch (err) {
      return err;
    }
  },
  insertTodosList: async function (list) {
    try {
      await execQuery("INSERT INTO list SET ?", list.list);
      let result = await execQuery("SELECT LAST_INSERT_ID() AS Id;");

      list.todo.listId = result[0].Id;
      await execQuery("INSERT INTO todo SET ?", list.todo);
      if (list.reminder) {
        list.reminder.reminderId = result[0].Id;
        await execQuery("INSERT INTO reminder SET ? ", list.reminder);
      }
    } catch (err) {
      return err;
    }
  },
  insertTodo: async function (todo) {
    try {
      return await execQuery("INSERT INTO todo SET ?", todo);
    } catch (err) {
      return err;
    }
  },
  getLists: async function (id, req) {
    let lists, todosQuery;
    try {
      switch (req) {
        case "allLists":
          lists = await execQuery(`SELECT id, name, category FROM list WHERE userId = '${id}';`);
          todosQuery = "SELECT name, listId, description, isCompleted, tag FROM todo WHERE listId =";
          break;
        case "withReminder":
          lists = await execQuery(`SELECT id, name, category FROM list WHERE userId = '${id}' AND id IN (SELECT reminderId FROM reminder);`);
          let remQuery = "SELECT date, startTime, endTime FROM reminder WHERE reminderId =";
          lists.forEach(async el => el.reminder = await execQuery(remQuery + el.id));
          todosQuery = "SELECT name, listId, description, isCompleted, tag FROM todo WHERE listId =";
          break;
        case "withoutReminder":
          lists = await execQuery(`SELECT id, name, category FROM list WHERE userId = '${id}' AND id NOT IN (SELECT reminderId FROM reminder);`);
          todosQuery = "SELECT name, listId, description, isCompleted, tag FROM todo WHERE listId =";
          break;
        case "not-completed":
          lists = await execQuery(`SELECT id, list.name, category FROM list, todo WHERE userId = '${id}' AND id = listId AND isCompleted = 'false';`);
          todosQuery = "SELECT name, listId, description, isCompleted, tag FROM todo WHERE isCompleted = 'false' AND listId =";
          break;
        case "completed":
          lists = await execQuery(`SELECT id, list.name, category FROM list, todo WHERE userId = '${id}' AND id = listId AND isCompleted = 'true';`);
          todosQuery = "SELECT name, listId, description, isCompleted, tag FROM todo WHERE isCompleted = 'true' AND listId =";
          break;
        default:
          throw new Error("Switch Error");
      }
      for (let i = 0; i < lists.length; i++) {
        lists[i].todos = await execQuery(todosQuery + lists[i].id);
      }
      return lists;
    } catch (err) {
      return err;
    }
  },
  checkID: async function (info) {
    let column;
    switch (info.table) {
      case "user":
        column = "email";
        break;
      case "list":
        column = "id";
        break;
      case "todo":
        column = "listId";
        break;
      case "reminder":
        column = "reminderId";
    }
    try {
      const result = await execQuery(`SELECT * FROM ${info.table} WHERE ${info.table}.${column} = '${info.ID}'`);
      if (result[0]) return true;
    } catch (err) {
      return false;
    }
  },
  getListByID: async function (id) {
    try {
      const list = await execQuery(`SELECT id, name, category FROM list WHERE id = '${id}'`);
      let reminder = await execQuery(`SELECT * FROM reminder WHERE reminderId = '${id}'`);
      list[0].reminder = reminder[0],
        list[0].todos = await execQuery(`SELECT * FROM todo WHERE listId = '${id}'`);
      return list[0];
    } catch (err) {
      return err;
    }
  },
  editItem: async function (item) {
    try {
      if (item.id) {
        return await execQuery(`UPDATE list SET name = '${item.name}', category = '${item.category}' WHERE id = '${item.id}';`);
      } else if (item.listId) {
        return await execQuery(`UPDATE todo SET name = '${item.name}', description = '${item.description}', isCompleted = '${item.isCompleted}', tag = '${item.tag}' WHERE listId = ${item.listId} AND name = '${item.oldName}';`);
      } else {
        return await execQuery(`UPDATE reminder SET date = '${item.date}', startTime = '${item.startTime}', endTime = '${item.endTime}' WHERE reminderId = ${item.reminderId};`);
      }
    } catch (err) {
      return err;
    }
  },
  deleteItem: async function (item) {
    try {
      if (item.type === "list") {
        await execQuery(`DELETE FROM reminder WHERE reminderId = '${item.id}';`);
        await execQuery(`DELETE FROM todo WHERE listId = '${item.id}';`);
        return await execQuery(`DELETE FROM list WHERE id = '${item.id}'`);
      } else if (item.type === "todo") {
        return await execQuery(`DELETE FROM todo WHERE listId = '${item.id}' AND name = '${item.name}';`);
      } else {
        return await execQuery(`DELETE FROM reminder WHERE reminderId = '${item.id}';`);
      }
    } catch (err) {
      return err;
    }
  }

}



/*

drop table user;
drop table list;
drop table todo;
drop table reminder;


CREATE TABLE user(
  email VARCHAR(50) PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  psw VARBINARY(50) NOT NULL UNIQUE);

CREATE TABLE list(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  category ENUM('holiday', 'work', 'meeting', 'family', 'friends', 'personal') NOT NULL,
  userId VARCHAR(50),
  FOREIGN KEY(userId) REFERENCES user(email));

CREATE TABLE todo(
  name VARCHAR(30),
  listId INT,
  description VARCHAR(200) NOT NULL,
  isCompleted ENUM('true', 'false') NOT NULL,
  tag ENUM('important', 'normal', 'regular') NOT NULL,
  PRIMARY KEY(name, listId),
  FOREIGN KEY(listId) REFERENCES list(id));


CREATE TABLE reminder(
  reminderId INT,
  date DATE NOT NULL,
  startTime TIME NOT NULL,
  endTime TIME NOT NULL,
  FOREIGN KEY(reminderId) REFERENCES list(id));

  ALTER TABLE list AUTO_INCREMENT = 100;

  DESCRIBE list;
  */
