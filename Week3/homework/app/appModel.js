'user strict';
const sql = require('./db.js');

//ToDo object constructor
class Todo {
  constructor(toDo) {
    this.Name = toDo.Name;
    this.ListID = toDo.ListID;
  }

  // todo functions

  static createToDo(newToDo, result) {
    sql.query('INSERT INTO toDos SET ?', newToDo, (err, res) => {
      if (err) {
        // console.log('error: ', err);
        result(err, null);
      } else {
        // console.log(res.insertId);
        result(null, res.insertId);
      }
    });
  }

  static getToDoById(toDoId, result) {
    sql.query('SELECT * FROM toDos WHERE id = ? ', toDoId, (err, res) => {
      if (err) {
        // console.log('error: ', err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  static getAllToDo(result) {
    sql.query('SELECT * FROM toDos ', (err, res) => {
      if (err) {
        // console.log('error: ', err);
        result(null, err);
      } else {
        console.log('todos: ', res);
        result(null, res);
      }
    });
  }

  static updateToDoById(id, toDo, result) {
    sql.query('UPDATE toDos SET Name = ? WHERE id = ?', [toDo.Name, id], (err, res) => {
      if (err) {
        // console.log('error: ', err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
  }

  static removeToDo(id, result) {
    sql.query('DELETE FROM toDos WHERE id = ?', id, (err, res) => {
      if (err) {
        // console.log('error: ', err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
  }

  static completeToDo(id, result) {
    sql.query('UPDATE toDos SET IsDone = true WHERE id = ?', id, (err, res) => {
      if (err) {
        // console.log('error: ', err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
  }
}

class List {
  constructor(toDoList) {
    this.UserID = toDoList.UserID;
    this.Name = toDoList.Name;
    this.Reminder = toDoList.Reminder;
  }

  // todo list functions

  static createToDoList(newToDoList, result) {
    sql.query('INSERT INTO toDoList SET ?', newToDoList, (err, res) => {
      if (err) {
        // console.log('error: ', err);
        result(err, null);
      } else {
        // console.log(res.insertId);
        result(null, res.insertId);
      }
    });
  }

  static getAllToDoList(result) {
    sql.query('SELECT * FROM toDoList', (err, res) => {
      if (err) {
        // console.log('error: ', err);
        result(null, err);
      } else {
        // console.log('todos: ', res);
        result(null, res);
      }
    });
  }

  static removeToDoList(id, result) {
    sql.query('DELETE FROM toDoList WHERE id = ?', id, (err, res) => {
      if (err) {
        // console.log('error: ', err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
  }
}

class Users {
  constructor(user) {
    this.Name = user.Name;
  }

  // user functions

  static createUser(newUser, result) {
    sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
      if (err) {
        // console.log('error: ', err);
        result(err, null);
      } else {
        // console.log(res.insertId);
        result(null, res.insertId);
      }
    });
  }

  static getAllUsers(result) {
    sql.query('SELECT * from users', (err, res) => {
      if (err) {
        // console.log('error: ', err);
        result(null, err);
      } else {
        // console.log('users : ', res);
        result(null, res);
      }
    });
  }
}

module.exports = { Todo, List, Users };
