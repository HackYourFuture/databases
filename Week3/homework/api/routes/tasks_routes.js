const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    const tasks = req.body.tasks;
    res.status(201).json({
        message: 'Handling POST requests to task',
        info: ` the task description is: ${JSON.stringify(tasks)}`,
    });
});

router.delete('/', (req, res, next) => {
    const tasksIds = req.body.tasksIds;
    res.status(200).json({
        message: `Deleted task with id ${tasksIds}`,
    });
});

router.patch('/:taskId', (req, res, next) => {
    const taskId = req.params.taskId;
    res.status(200).json({
        message: `Update task with id ${taskId}`,
        info: ` the task is marked as completed`,
    });
});

module.exports = router;