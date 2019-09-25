const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

router.post('/', (req, res, next) => {
    const tasks = req.body;
    if (Array.isArray(tasks) !== true) {
        res.status(400).json({ message: 'the req.body must be arry' });
        return;
    }
    const schema = Joi.object({
        taskDescription: Joi.string()
            .min(3)
            .max(42)
            .required(),
        listIdReference: Joi.number()
            .min(1)
            .required(),
    });
    let valid = '';
    tasks.forEach(task => {
        const validationResult = schema.validate({
            taskDescription: task.taskDescription,
            listIdReference: task.listIdReference,
        });
        if (validationResult.error) {
            const message = validationResult.error.details[0].message;
            res.status(400).send(`${message}`);
            valid = false;
            return;
        }
    });
    if (valid !== false) {
        res.status(201).json({
            message: 'Handling POST requests to task',
            info: ` the task description is: ${JSON.stringify(tasks)}`,
        });
    }
});

router.delete('/', (req, res, next) => {
    const tasksIds = req.body;
    if (Array.isArray(tasksIds) !== true) {
        res.status(400).json({ message: 'the req.body must be arry' });
        return;
    }
    const schema = Joi.object({
        taskId: Joi.number()
            .min(1)
            .required(),
    });
    let valid = '';
    tasksIds.forEach(id => {
        const validationResult = schema.validate({
            taskId: id,
        });
        if (validationResult.error) {
            const message = validationResult.error.details[0].message;
            res.status(400).send(`${message}`);
            valid = false;
            return;
        }
    });

    if (valid !== false) {
        res.status(200).json({
            message: `Deleted task with id ${tasksIds}`,
        });
    }
});

router.patch('/:taskId', (req, res, next) => {
    const taskId = req.params.taskId;
    res.status(200).json({
        message: `Update task with id ${taskId}`,
        info: ` the task is marked as completed`,
    });
});

module.exports = router;