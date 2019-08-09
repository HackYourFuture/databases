const createdDb = require('./createDatabase');
console.log(createdDb);

function addUser(userId, userName) {
  return createdDb.execQuery(`INSERT INTO users(userId, userName) VALUES (?, ?)`, userId, userName);
}

function addToDoList(userId, ToDoListId, listName) {
  return createdDb.execQuery(
    `INSERT INTO ToDoList(userId, TodoListId, listName) VALUES (?, ?, ?)`,
    userId,
    ToDoListId,
    listName,
  );
}

function addItem(ToDoListId, description) {
  return createdDb.execQuery(`INSERT INTO Item(ToDoListId, description) VALUES (?, ?)`, [
    ToDoListId,
    description,
  ]);
}

function addReminder(ToDoListId, reminder) {
  return createdDb.execQuery(`INSERT INTO reminder(ToDoListId, reminder) VALUES (?, ?)`, [
    ToDoListId,
    reminder,
  ]);
}

function updateItem(itemId) {
  return createdDb.execQuery(`Update item SET isCompleted = ? WHERE itemId = ?`, itemId);
}

function deleteItem(itemId) {
  return createdDb.execQuery(`Delete item From ToDoList WHERE itemId = ?`, itemId);
}

function deleteList(ToDoListId) {
  return createdDb.execQuery(`Delete ToDoList From ToDoList WHERE ToDoListId = ?`, ToDoListId);
}
module.exports = {
  addUser,
  addToDoList,
  addItem,
  addReminder,
  updateItem,
  deleteItem,
  deleteList,
};
