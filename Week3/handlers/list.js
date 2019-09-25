const validate = require('../validate');
const knex = require('../db');
const { create, update, find, drop, handleError } = require('../helpers');

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
          knex.raw('group_concat(tag.tagname) as tags'), // Return multiple tags in a single string field delimited with comma
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

module.exports = {
  getListById,
  deleteList,
  getTodos,
  getTodoById,
  addTodoWithTags,
  deleteTodo,
  markTodoDone,
  markTodoNotDone,
};
