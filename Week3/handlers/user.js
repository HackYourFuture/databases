const validate = require('../validate');
const knex = require('../db');
const { create, find, findAll, drop, handleError } = require('../helpers');

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

module.exports = { getUsers, getUserById, createUser, deleteUser, getUserLists, createList };
