const Joi = require('@hapi/joi');
const util = require('util');
const mysql = require('mysql');
const connection = require('../db/database').connection;
const queryPromise = util.promisify(connection.query.bind(connection));

module.exports = {
    createTasks: async function(req, res, next) {
        const tasks = req.body;
        if (Array.isArray(tasks) !== true || tasks.length === 0) {
            res.status(400).json({ message: 'the req.body must be arry with at least one item' });
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

        let alertMessage = '';
        tasks.forEach(task => {
            const validationResult = schema.validate({
                taskDescription: task.taskDescription,
                listIdReference: task.listIdReference,
            });
            if (validationResult.error) {
                alertMessage = validationResult.error.details[0].message;
                return;
            }
        });
        if (alertMessage === '') {
            res.status(201).json({
                message: 'Handling POST requests to task',
                info: ` the task description is: ${JSON.stringify(tasks)}`,
            });
        } else {
            res.status(400).send(alertMessage);
        }
    },

    deleteTasks: async function(req, res, next) {
        const tasksIds = req.body;
        if (Array.isArray(tasksIds) !== true || tasksIds.length === 0) {
            res.status(400).json({ message: 'the req.body must be arry with at least one item' });
            return;
        }
        const schema = Joi.object({
            taskId: Joi.number()
                .min(1)
                .required(),
        });
        let alertMessage = '';
        tasksIds.forEach(id => {
            const validationResult = schema.validate({
                taskId: id,
            });
            if (validationResult.error) {
                alertMessage = validationResult.error.details[0].message;
                return;
            }
        });

        if (alertMessage === '') {
            res.status(200).json({
                message: `Deleted task with id ${tasksIds}`,
            });
        } else {
            res.status(400).send(alertMessage);
        }
    },

    markCompleted: async function(req, res, next) {
        const listId = req.params.listId;
        const schema = Joi.object({
            listReminder: Joi.number()
                .min(1)
                .max(31)
                .required(),
        });
        const validationResult = schema.validate({
            listReminder: req.body.listReminder,
        });
        if (validationResult.error) {
            const message = validationResult.error.details[0].message;
            res.status(400).send(`${message}`);
            return;
        }
        const listReminder = req.body.listReminder;
        res.status(200).json({
            message: `Updated list with ID ${listId}`,
            info: ` the list has a reminder and it is: ${listReminder}`,
        });
    },
};