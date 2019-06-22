'use-strict';

const query = {
  toDo: `INSERT INTO todos VALUES(?,?,?,?,STR_TO_DATE( ?, '%d/%m/%Y %H:%i:%s'),?)`,
  list: `INSERT INTO todolists VALUES(?,?,?,STR_TO_DATE( ?, '%d/%m/%Y %H:%i:%s'))`,
  user: `INSERT INTO users VALUES(?, ?, ?)`,
  todos: `SELECT * FROM todos WHERE ToDoList_Id = ?`,
  todoList: `SELECT * FROM todolists WHERE User_Id = ?`,
  allUsers: 'SELECT * FROM users',
  Completed: `UPDATE todos SET Done = 'true' WHERE Todo_Id = ?;`,
  removeUser: `DELETE FROM users WHERE User_Id = ? LIMIT 1`,
  removeList: `DELETE FROM todolists WHERE ToDoList_Id = ? LIMIT 1`,
  renderAfterList: `SELECT * FROM todolists`,
  removeTodo: `DELETE FROM todos WHERE Todo_Id = ? LIMIT 1`,
  updateTodo: `UPDATE todos SET Todo_Name = ?,
                    Due_date = STR_TO_DATE( ?, '%d/%m/%Y %H:%i:%s'),Tag = ? WHERE Todo_Id = ?;`,
  updateList: `UPDATE todolists 
                    SET ToDoList_Name = ?,
                    Reminder = STR_TO_DATE( ?, '%d/%m/%Y %H:%i:%s')
                    WHERE ToDoList_Id = ?;`,
  updateUser: `UPDATE users SET Name = ?,Email = ? WHERE User_Id = ?;`,
};

const {
  toDo,
  Completed,
  removeUser,
  removeList,
  renderAfterList,
  removeTodo,
  updateTodo,
  updateList,
  updateUser,
  list,
  user,
  todos,
  todoList,
  allUsers,
} = query;
module.exports = {
  toDo,
  Completed,
  removeUser,
  removeList,
  renderAfterList,
  removeTodo,
  updateTodo,
  updateList,
  updateUser,
  list,
  user,
  todos,
  todoList,
  allUsers,
};
