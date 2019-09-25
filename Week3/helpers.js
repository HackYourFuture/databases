'use strict';

const knex = require('./db');
// Helpers for trying to emulate NoSQL syntax
const create = ({ table, data }) => knex(table).insert(data);

const findAll = ({ table, columns }) => knex(table).select(columns);

const find = ({ table, columns, filter }) =>
  knex(table)
    .select(columns)
    .where(filter);

const update = ({ table, filter, data }) =>
  knex(table)
    .where(filter)
    .update(data);

const drop = ({ table, filter }) =>
  knex(table)
    .where(filter)
    .del();

const handleError = (res, error) =>
  res.status(500).send({
    message: {
      type: 'Internal Server Error',
      description: `Oops! Sorry, it's me, not you :(.`,
      code: error.code,
    },
  });

module.exports = {
  handleError,
  create,
  findAll,
  update,
  find,
  drop,
};
