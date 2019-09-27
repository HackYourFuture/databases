const express = require('express');
const app = express();
const port = 3000;
const {
  getAllTodoLists,
  getATodoListbyID,
  createANewTodolist,
  deleteATodolist,
  updateReminder,
  getTodosbyTag,
} = require('./list_queries');
const {
  getAllTodoItems,
  getATodoItembyID,
  createANewTodoItem,
  deleteATodoItem,
  markAsFinished,
} = require('./item_queries');
const { getAllUsers, getUserbyID, createANewUser, deleteAUser } = require('./user_queries');

app.use(express.json());

app.get('/user', getAllUsers);
app.get('/user/:userid', getUserbyID);
app.post('/user', createANewUser);
app.delete('/user/:id', deleteAUser);

app.get('/todolist', getAllTodoLists);
app.get('/todolist/:id', getATodoListbyID);
app.get('/todolisttag/:tag', getTodosbyTag);
app.post('/todolist', createANewTodolist);
app.delete('/todolist/:id', deleteATodolist);
app.put('/reminder/:id', updateReminder);

app.get('/todoitem', getAllTodoItems);
app.get('/todoitem/:id', getATodoItembyID);
app.post('/todoitem', createANewTodoItem);
app.delete('/todoitem/:id', deleteATodoItem);
app.put('/todoitem/:id/Finished', markAsFinished);

app.listen(port, () => console.log(`Server is listening up on ${port}`));
