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
                .max(42)
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
        res.status(201).json({
            message: 'Handling POST requests to list',
            info: ` the list name is: ${listName} for the user with ID: ${userIdReference}`,
        });
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