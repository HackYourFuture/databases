'use strict';

const express = require('express');
const router = express.Router();

// User
const createUser = require('./helpers/createUser');
const getUser = require('./helpers/getUser');
const updateUser = require('./helpers/updateUser');
const deleteUser = require('./helpers/deleteUser');

router.get('/user', getUser.getAll);
router.get('/user/:user_id', getUser.getById);
router.post('/user/create', createUser);
router.put('/user/update/:user_id', updateUser);
router.delete('/user/delete/:user_id', deleteUser);

// Todo
const createTodo = require('./helpers/createTodo');
const getTodo = require('./helpers/getTodo');
const updateTodo = require('./helpers/updateTodo');
const deleteTodo = require('./helpers/deleteTodo');

router.get('/:user_id/todo', getTodo.getAll);
router.get('/:user_id/todo/:todo_id', getTodo.getById);
router.post('/:user_id/todo/create', createTodo);
router.put('/:user_id/todo/update/:todo_id', updateTodo);
router.delete('/:user_id/todo/delete/:todo_id', deleteTodo);

// Task
const createTask = require('./helpers/createTask');
const getTask = require('./helpers/getTask');
const updateTask = require('./helpers/updateTask');
const deleteTask = require('./helpers/deleteTask');

router.get('/:user_id/:todo_id/task', getTask.getAll);
router.get('/:user_id/:todo_id/task/task_id', getUser.getById);
router.post('/:user_id/:todo_id/task/create', createTask);
router.put('/:user_id/:todo_id/task/update/:task_id', updateUser);
router.delete('/:user_id/:todo_id/task/delete/:task_id', deleteUser);

// Tag
const createTag = require('./helpers/createTag');
const getTag = require('./helpers/getTag');
const updateTag = require('./helpers/updateTag');
const deleteTag = require('./helpers/deleteTag');

router.get('/tag', getTag.getAll);
router.get('/tag/:tag_id', getTag.getById);
router.post('/tag/create', createTag);
router.put('/tag/update/:tag_id', updateTag);
router.delete('/tag/delete/:tag_id', deleteTag);

module.exports = router;
