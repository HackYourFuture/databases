const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to task',
    });
});

router.patch('/:taskId', (req, res, next) => {
    const taskId = req.params.taskId;
    res.status(200).json({
        message: `Update task with id ${taskId}`,
    });
});

router.delete('/:taskId', (req, res, next) => {
    const taskId = req.params.taskId;
    res.status(200).json({
        message: `Deleted task with id ${taskId}`,
    });
});

module.exports = router;