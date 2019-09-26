const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const taskController = require('../task/taskController');

router.post('/', taskController.createTasks);

router.delete('/', taskController.deleteTasks);

router.patch('/:taskId', (req, res, next) => {
    const taskId = req.params.taskId;
    res.status(200).json({
        message: `Update task with id ${taskId}`,
        info: ` the task is marked as completed`,
    });
});

module.exports = router;