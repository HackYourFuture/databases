'use strict';

const validate = require('./validate');

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '192.168.153.132',
    user: 'todo',
    password: 'todo',
    database: 'todo',
  },
});

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

const getUsers = async (req, res) => {
  try {
    res.send(await findAll({ table: 'user', columns: '*' }));
  } catch (error) {
    handleError(res, error);
  }
};

const getUserById = async (req, res) => {
  const { userid } = req.params;
  try {
    const row = await find({ table: 'user', columns: 'username', filter: { id: userid } });
    if (!row.length) return res.status(404).send('User Id not found');
    res.send(await find({ table: 'user', columns: '*', filter: { id: userid } }));
  } catch (error) {
    handleError(res, error);
  }
};

const createUser = async (req, res) => {
  const { error } = validate(req.body, 'user');
  if (error) return res.status(400).send(error.details.map(d => d.message).join('\n'));
  try {
    const id = await create({ table: 'user', data: req.body });
    res.status(201).send(await find({ table: 'user', columns: '*', filter: { id } }));
  } catch (error) {
    handleError(res, error);
  }
};

const deleteUser = async (req, res) => {
  const { userid } = req.params;
  try {
    const row = await find({ table: 'user', columns: 'username', filter: { id: userid } });
    if (!row.length) return res.status(404).send('User Id not found');
    await drop({ table: 'user', filter: { id: userid } });
    res.sendStatus(204);
  } catch (error) {
    handleError(res, error);
  }
};

const getUserLists = async (req, res) => {
  const { userid } = req.params;
  try {
    const row = await find({ table: 'user', columns: 'username', filter: { id: userid } });
    if (!row.length) return res.status(404).send('User Id not found');
    res.send(
      await knex('list')
        .join('user', { 'user.id': 'list.userid' })
        .leftJoin('reminder', { 'list.reminderid': 'reminder.id' })
        .select(['list.id', 'list.listname', 'reminder.alert'])
        .where({ userid }),
    );
  } catch (error) {
    handleError(res, error);
  }
};

const createList = async (req, res) => {
  const { error } = validate(req.body, 'list');
  if (error) return res.status(400).send(error.details.map(d => d.message).join('\n'));
  const { userid } = req.params;
  const { listname, alert } = req.body;
  try {
    const row = await find({ table: 'user', columns: 'username', filter: { id: userid } });
    if (!row.length) return res.status(404).send('User Id not found');
    if (alert) {
      const reminderid = await create({ table: 'reminder', data: { alert } });
      const id = await create({ table: 'list', data: { listname, userid, reminderid } });
      res.status(201).send(
        await knex('list')
          .select(['list.id', 'listname', 'alert'])
          .join('reminder', { 'list.reminderid': 'reminder.id' })
          .where({ 'list.id': id }),
      );
    } else {
      const id = await create({ table: 'list', data: { listname, userid } });
      res
        .status(201)
        .send(await find({ table: 'list', columns: ['id', 'listname'], filter: { id } }));
    }
  } catch (error) {
    handleError(res, error);
  }
};

const getListById = async (req, res) => {
  const { listid } = req.params;
  try {
    const row = await find({ table: 'list', columns: 'listname', filter: { id: listid } });
    if (!row.length) return res.status(404).send('List Id not found');
    res.send(await find({ table: 'list', columns: '*', filter: { id: listid } }));
  } catch (error) {
    handleError(res, error);
  }
};

const deleteList = async (req, res) => {
  const { listid } = req.params;
  try {
    const row = await find({ table: 'list', columns: 'listname', filter: { id: listid } });
    if (!row.length) return res.status(404).send('List Id not found');
    await drop({ table: 'list', filter: { id: listid } });
    res.sendStatus(204);
  } catch (error) {
    handleError(res, error);
  }
};

const getTodos = async (req, res) => {
  const { listid } = req.params;
  const row = await find({ table: 'list', columns: 'listname', filter: { id: listid } });
  if (!row.length) return res.status(404).send('List Id not found');
  res.send(
    await knex('todoitem')
      .join('list', { 'list.id': 'todoitem.listid' })
      .select(['todoitem.id', 'todoitem.note', 'todoitem.done'])
      .where({ listid }),
  );
};

const getTodoById = async (req, res) => {
  const { todoid } = req.params;
  try {
    const row = await find({ table: 'todoitem', columns: 'note', filter: { id: todoid } });
    if (!row.length) return res.status(404).send('Todo Id not found');
    res.send(
      await knex('todoitem')
        .leftJoin('todotag', { 'todoitem.id': 'todotag.todoitemid' })
        .leftJoin('tag', { 'tag.id': 'todotag.tagid' })
        .select([
          'todoitem.id',
          'todoitem.note',
          'todoitem.done',
          knex.raw('group_concat(tag.tagname) as tags'),
        ])
        .where({ 'todoitem.id': todoid })
        .groupBy(['todoitem.id', 'todoitem.note', 'todoitem.done']),
    );
  } catch (error) {
    handleError(res, error);
  }
};

const addTodoWithTags = async (req, res) => {
  const { error } = validate(req.body, 'todo');
  if (error) return res.status(400).send(error.details.map(d => d.message).join('\n'));
  const { note, tag } = req.body;
  const { listid } = req.params;
  try {
    const row = await find({ table: 'list', columns: 'listname', filter: { id: listid } });
    if (!row.length) return res.status(404).send('List Id not found');
    const todoitemid = await create({ table: 'todoitem', data: { note, listid } });
    if (tag) {
      const tags = req.body.tag.replace(/\s/g, '').split(','); // Throw whitespace and return an array of tags from comma delimited text
      tags.forEach(async tagname => {
        const tagRow = await find({ table: 'tag', columns: 'id', filter: { tagname } }); // Check if tag is created before
        const tagid = tagRow.length
          ? tagRow[0].id
          : await create({ table: 'tag', data: { tagname } });
        await create({ table: 'todotag', data: { todoitemid, tagid } });
      });
    }
    res
      .status(201)
      .send(await find({ table: 'todoitem', columns: '*', filter: { id: todoitemid } }));
  } catch (error) {
    handleError(res, error);
  }
};

const deleteTodo = async (req, res) => {
  const { todoid } = req.params;
  try {
    await drop({ table: 'todoitem', filter: { id: todoid } });
    res.sendStatus(204);
  } catch (error) {
    handleError(res, error);
  }
};

const toggleTodoDone = done => async (req, res) => {
  const { todoid } = req.params;
  try {
    await update({ table: 'todoitem', filter: { id: todoid }, data: { done } });
    res.sendStatus(200);
  } catch (error) {
    handleError(res, error);
  }
};

const markTodoDone = toggleTodoDone('T');

const markTodoNotDone = toggleTodoDone('F');

const getTodobyTag = async (req, res) => {
  const { tagname } = req.params;
  try {
    const row = await find({ table: 'tag', columns: 'id', filter: { tagname } });
    if (!row.length) return res.status(404).send('Tag not found');
    res.send(
      await knex('tag')
        .join('todotag', { 'tag.id': 'todotag.tagid' })
        .join('todoitem', { 'todoitem.id': 'todotag.todoitemid' })
        .select(['todoitem.note', 'todoitem.done'])
        .where({ tagname }),
    );
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  getUserLists,
  createList,
  getListById,
  deleteList,
  getTodos,
  getTodoById,
  addTodoWithTags,
  deleteTodo,
  markTodoDone,
  markTodoNotDone,
  getTodobyTag,
};
