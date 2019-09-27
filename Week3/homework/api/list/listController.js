'use strict';
const Joi = require('@hapi/joi');
const util = require('util');
const connection = require('../db/database').connection;
const queryPromise = util.promisify(connection.query.bind(connection));

module.exports = {
    createList: async function(req, res, next) {
        const schema = Joi.object({
            listName: Joi.string()
                .min(3)
                .max(45)
                .required(),
            userIdReference: Joi.number()
                .integer()
                .min(1)
                .required(),
        });
        const validationResult = schema.validate({
            listName: req.body.listName,
            userIdReference: req.body.userIdReference,
        });
        if (validationResult.error) {
            const message = validationResult.error.details[0].message;
            res.status(400).send(message);
            return;
        }
        const listName = req.body.listName;
        const userIdReference = req.body.userIdReference;
        try {
            const sql = `SELECT * FROM lists WHERE user_id_reference=?`;
            let sqlResult = await queryPromise(sql, [userIdReference]);
            if (sqlResult.length === 0) {
                return res.status(404).json({
                    message: 'User not found.',
                    info: `User with ID ${userIdReference} does not exist in the database.`,
                });
            }
        } catch (error) {
            next(error);
        }
        try {
            const sql = `INSERT INTO lists (user_id_reference, list_name) VALUES (?, ?)`;
            await queryPromise(sql, [userIdReference, listName]);
            res.status(201).json({
                message: 'Trying to add new list to the database.',
                info: `Added successfully, The list name is: ${listName}, for the user with ID: ${userIdReference}`,
            });
        } catch (error) {
            next(error);
        }
    },

    deleteList: async function(req, res, next) {
        const listId = req.params.listId;
        const sql = `DELETE FROM adham_database_hw3.lists WHERE list_id = ?`;
        try {
            let sqlResult = await queryPromise(sql, [listId]);
            res.status(200).json({
                message: `Trying to delete list with ID: ${listId}.`,
                info: sqlResult.affectedRows === 0 ?
                    'That list is already not exists' :
                    "The list is deleted successfully, with all it's related tasks ",
            });
        } catch (error) {
            next(error);
        }
    },

    addReminder: async function(req, res, next) {
        const schema = Joi.object({
            listReminder: Joi.number()
                .integer()
                .min(1)
                .max(31)
                .required(),
        });
        const validationResult = schema.validate({
            listReminder: req.body.listReminder,
        });
        if (validationResult.error) {
            const message = validationResult.error.details[0].message;
            res.status(400).send(message);
            return;
        }
        const listId = req.params.listId;
        const listReminder = req.body.listReminder;
        const today = new Date();
        const reminderDate = new Date();
        reminderDate.setDate(today.getDate() + listReminder);
        const sql = `UPDATE adham_database_hw3.lists SET list_reminder = ? WHERE list_id = ?`;
        try {
            let sqlResult = await queryPromise(sql, [reminderDate, listId]);
            res.status(200).json({
                message: `Trying to add reminder to the list with ID ${listId}`,
                reminderSetting: `Remind after ${listReminder} days, then it will be ${reminderDate}`,
                info: sqlResult.affectedRows === 0 ?
                    'Reminder is NOt added: that list is not existed ' :
                    'The reminder is added successfully',
            });
        } catch (error) {
            next(error);
        }
    },
};