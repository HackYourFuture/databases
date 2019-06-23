'use-strict';

const express = require('express');
const router = express.Router();
const { createNewUser, createTask, createTaskList } = require('./queries/create');
const { updateUser, updateTaskList, updateTask } = require('./queries/update');
const { getUsers, getTaskLists, getTasks, markTodoAsDone } = require('./queries/get');
const { removeUser, removeTaskList, removeTask } = require('./queries/remove');

//Api routes.
router.post('/newUser', createNewUser);
router.put('/user/:userId', updateUser);
router.get('/allUsers', getUsers);
router.delete('/user/:userId', removeUser);

router.post('/:userId/newTaskList', createTaskList);
router.put('/:userId/taskList/:todoListId', updateTaskList);
router.get('/:userId/taskLists', getTaskLists);
router.delete('/taskList/:todoListId', removeTaskList);

router.post('/:todoListId/newTask', createTask);
router.put('/:todoListId/tasks/:todoId', updateTask);
router.get('/:todoListId/tasks', getTasks);
router.delete('/:todoListId/task/:todoId', removeTask);
router.put('/:todoListId/:todoId/done', markTodoAsDone);

module.exports = router;
