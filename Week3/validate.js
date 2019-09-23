'use strict';

const Joi = require('@hapi/joi');

const schemas = {
  user: Joi.object().keys({
    username: Joi.string()
      .max(45)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .max(100)
      .required(),
  }),
  list: Joi.object().keys({
    listname: Joi.string().required(),
    alert: Joi.date().greater('now'),
  }),
  todo: Joi.object().keys({
    note: Joi.string().required(),
    tag: Joi.string(),
  }),
};

const validate = (body, schema) => schemas[schema].validate(body);

module.exports = validate;
