'use-strict';

const express = require('express');
const router = express.Router();
const create = require('./create');
const get = require('./get');
const remove = require('./remove');
const update = require('./update');

// users
router.post('/new/user', create.newUser);
router.put('/user/:userId', update.user);
router.get('/all/users', get.allUsers);
router.delete('/user/:userId', remove.user);

// todolists
router.post('/:userId/new/todo/list', create.newList);
router.put('/:userId/todo/list/:todoListId', update.todoList);
router.get('/:userId/todo/lists', get.todoLists);
router.get('/todo/lists', get.allLists);
router.delete('/todo/list/:todoListId', remove.todoList);

// todos
router.post('/:todoListId/new/todo', create.newTodo);
router.put('/:todoListId/todo/:todoId', update.todo);
router.get('/:todoListId/todos', get.todos);
router.delete('/:todoListId/todo/:todoId', remove.todo);
router.put('/:todoListId/:todoId/Completed', update.markTodoAsCompleted);

module.exports = router;
