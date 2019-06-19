'use-strict';

const express = require('express');
const router = express.Router();

//supporting multiple users
const createNewUser = require('./actions/createNewUser');
const updateUser = require('./actions/updateUser');
const getAllUsers = require('./actions/getAllUsers');
const removeUser = require('./actions/removeUser');
router.post('/newUser', createNewUser);
router.put('/user/:userId', updateUser);
router.get('/allUsers', getAllUsers);
router.delete('/user/:userId', removeUser);

// CRUD to do list
const createNewTodoList = require('./actions/createNewTodoList');
const updateTodoList = require('./actions/updateToDoList');
const getTodoLists = require('./actions/getTodoLists');
const removeTodoList = require('./actions/removeTodoList');
router.post('/:userId/newTodoList', createNewTodoList);
router.put('/:userId/todoList/:todoListId', updateTodoList);
router.get('/:userId/todoLists', getTodoLists);
router.delete('/todoList/:todoListId', removeTodoList);

// CRUD to do
const createNewTodo = require('./actions/createNewTodo');
const updateTodo = require('./actions/updateTodo');
const getTodos = require('./actions/getTodos');
const removeTodo = require('./actions/removeTodo');
const markTodoAsDone = require('./actions/markTodoAsDone');
router.post('/:todoListId/newTodo', createNewTodo);
router.put('/:todoListId/todo/:todoId', updateTodo);
router.get('/:todoListId/todos', getTodos);
router.delete('/:todoListId/todo/:todoId', removeTodo);
router.put('/:todoListId/:todoId/done', markTodoAsDone);

module.exports = router;
