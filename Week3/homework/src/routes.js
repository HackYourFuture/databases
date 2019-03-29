'use-strict';

const express = require('express');
const router = express.Router();

// users
const createNewUser = require('./actions/createNewUser');
const updateUser = require('./actions/updateUser');
const getAllUsers = require('./actions/getAllUsers');
const removeUser = require('./actions/removeUser');
router.post('/createNewUser', createNewUser);
router.put('/updateUser/:userId', updateUser);
router.get('/getAllUsers', getAllUsers);
router.delete('/removeUser/:userId', removeUser);

// todolists
const createNewTodoList = require('./actions/createNewTodoList');
const updateTodoList = require('./actions/updateTodoList');
const getTodoLists = require('./actions/getTodoLists');
const removeTodoList = require('./actions/removeTodoList');
router.post('/:userId/createNewTodoList', createNewTodoList);
router.put('/:userId/updateTodoList/:todoListId', updateTodoList);
router.get('/:userId/getTodoLists', getTodoLists);
router.delete('/removeTodoList/:todoListId', removeTodoList);

// todos
const createNewTodo = require('./actions/createNewTodo');
const updateTodo = require('./actions/updateTodo');
const getTodos = require('./actions/getTodos');
const removeTodo = require('./actions/removeTodo');
const markTodoAsDone = require('./actions/markTodoAsDone');
router.post('/:todoListId/createNewTodo', createNewTodo);
router.put('/:todoListId/updateTodo/:todoId', updateTodo);
router.get('/:todoListId/getTodos', getTodos);
router.delete('/:todoListId/removeTodo/:todoId', removeTodo);
router.put('/:todoListId/:todoId/done', markTodoAsDone);

module.exports = router;
