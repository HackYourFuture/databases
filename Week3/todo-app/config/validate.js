"use strict";

const Joi = require('joi');

function validateEntries(something) {
    const objectArray = Object.keys(something);
    const result = objectArray.includes('task');
    if(!result) {
        const schema = Joi.object().keys({
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        });
        return Joi.validate(something, schema);
    }else {
        const schema = Joi.object().keys({
            task: Joi.string().min(4).required(),
            done: Joi.boolean()
        });
        return Joi.validate(something, schema);
    }
}

module.exports = validateEntries;