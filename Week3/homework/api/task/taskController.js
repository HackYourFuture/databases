const Joi = require('@hapi/joi');
const util = require('util');
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
                .integer()
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
        if (alertMessage !== '') {
            return res.status(400).send(alertMessage);
        }

        const tasksForSql = tasks.map(item => [item.listIdReference, item.taskDescription]);

        try {
            const sql = `INSERT INTO adham_database_hw3.tasks (list_id_reference, task_description) VALUES ?`;
            await queryPromise(sql, [tasksForSql]);
            res.status(201).json({
                message: 'Handling POST requests to task',
                info: ` the task description is: ${JSON.stringify(tasks)}`,
            });
        } catch (error) {
            next(error);
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
                .integer()
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

        if (alertMessage !== '') {
            return res.status(400).send(alertMessage);
        }

        try {
            const sql = `DELETE FROM adham_database_hw3.tasks WHERE task_id IN (?)`;
            let sqlResult = await queryPromise(sql, [tasksIds]);
            res.status(200).json({
                message: `Trying to delete the task or tasks`,
                askedToBeDeleted: tasksIds.length,
                Deleted: sqlResult.affectedRows,
                alreadyNotExist: tasksIds.length - sqlResult.affectedRows,
            });
        } catch (error) {
            next(error);
        }
    },

    markCompleted: async function(req, res, next) {
        const taskId = req.params.taskId;
        const sql = `UPDATE adham_database_hw3.tasks SET task_completed = 1 WHERE task_id = ?`;
        try {
            let sqlResult = await queryPromise(sql, [taskId]);
            res.status(200).json({
                message: `Trying to mark the task with id ${taskId} as completed.`,
                info: sqlResult.affectedRows === 0 ?
                    'Task is NOt marked: that task is not existed.' :
                    'The Task is marked successfully as completed.',
            });
        } catch (error) {
            next(error);
        }
    },
};