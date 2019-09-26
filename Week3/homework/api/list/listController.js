const Joi = require('@hapi/joi');
const util = require('util');
const mysql = require('mysql');
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
                .min(1)
                .required(),
        });
        const validationResult = schema.validate({
            listName: req.body.listName,
            userIdReference: req.body.userIdReference,
        });
        if (validationResult.error) {
            const message = validationResult.error.details[0].message;
            res.status(400).send(`${message}`);
            return;
        }

        const listName = req.body.listName;
        const userIdReference = req.body.userIdReference;
        try {
            const sql = `SELECT * FROM lists WHERE user_id_reference=?`;
            let sqlResult = await queryPromise(sql, [userIdReference]);
            if (sqlResult.length === 0) {
                return res.status(404).json({
                    code: 'user not found',
                    message: 'user with this ID is not existed in the database',
                });
            }
        } catch (error) {
            next(error);
        }
        try {
            const sql = `INSERT INTO lists (user_id_reference, list_name) VALUES (${userIdReference}, "${listName}")`;
            await queryPromise(sql);
            res.status(201).json({
                message: 'Handling POST requests to list',
                info: ` the list name is: ${listName} for the user with ID: ${userIdReference}`,
            });
        } catch (error) {
            next(error);
        }
    },

    deleteList: async function(req, res, next) {
        const listId = req.params.listId;
        res.status(200).json({
            message: `Deleted list with ID ${listId}`,
        });
    },

    addReminder: async function(req, res, next) {
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