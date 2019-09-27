const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const taskController = require('../task/taskController');

router.post('/', taskController.createTasks);

router.delete('/', taskController.deleteTasks);

router.patch('/:taskId', taskController.markCompleted);

module.exports = router;