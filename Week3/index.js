const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '192.168.153.132',
    user: 'todo',
    password: 'todo',
    database: 'todo',
  },
});
const express = require('express');
const morgan = require('morgan');
const app = express();
const validate = require('./validate');
const port = process.env.PORT || 3000;

app.use(
  morgan(
    '[:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms',
  ),
);

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

app.use(express.json());

//* Get all users
app.get('/user', async (req, res) => {
  res.send(await findAll({ table: 'user', columns: '*' }));
});

//* Create new user
app.post('/user', async (req, res) => {
  const { error } = validate(req.body, 'user');
  if (error) return res.status(400).send(error.details.map(d => d.message).join('\n'));
  const id = await create({ table: 'user', data: req.body });
  res.status(201).send(await find({ table: 'user', columns: '*', filters: { id } }));
});

//* Delete a user by userid
app.delete('/user/:userid', async (req, res) => {
  const { userid: id } = req.params;
  await drop({ table: 'user', filters: { id } });
  res.sendStatus(204);
});

//* Get lists of a user by userid
app.get('/user/:userid/list', async (req, res) => {
  const { userid } = req.params;
  res.send(
    await knex('list')
      .join('user', { 'user.id': 'list.userid' })
      .leftJoin('reminder', { 'list.reminderid': 'reminder.id' })
      .select(['list.id', 'listname', 'alert'])
      .where({ userid }),
  );
});

//* Create new list for a user
app.post('/user/:userid/list', async (req, res) => {
  try {
    const { error } = validate(req.body, 'list');
    if (error) return res.status(400).send(error.details.map(d => d.message).join('\n'));
    const { userid } = req.params;
    const { listname, alert } = req.body;
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
    console.log(error);
  }
});

//* Get a list by listid
app.get('/list/:listid', async (req, res) => {
  const { listid: id } = req.params;
  res.send(await find({ table: 'list', columns: '*', filters: { id } }));
});

//* Delete a list by listid
app.delete('/list/:listid', async (req, res) => {
  const { listid: id } = req.params;
  await drop({ table: 'list', filters: { id } });
  res.sendStatus(204);
});

//* Get all Todos of a list by listid
app.get('/list/:listid/todo', async (req, res) => {
  const { listid } = req.params;
  res.send(
    await knex('TodoItem')
      .join('List', { 'List.ID': 'TodoItem.ListID' })
      .select('TodoItem.*')
      .where({ listid }),
  );
});

//* Get Todo by todoid
app.get('/list/:listid/todo/:todoid', async (req, res) => {
  const { todoid: id } = req.params;
  res.send(await findAll({ table: 'todoitem', filter: { id } }));
});

//* Add new Todo to a list by listid, [optional] add multiple tags
app.post('/list/:listid/todo', async (req, res) => {
  const { error } = validate(req.body, 'todo');
  if (error) return res.status(400).send(error.details.map(d => d.message).join('\n'));
  const { note, tag } = req.body;
  const { listid } = req.params;
  const todoid = await create({ table: 'todoitem', data: { note, listid } }); //knex('todoitem').insert({ note, listid });
  if (tag) {
    const tags = req.body.tag.split(',');
    console.log(tags);
    tags.forEach(async tagname => {
      const tagid = await create({ table: 'tag', data: { tag_name: tagname.trim() } }); //knex('Tag').insert({ tag_name: tagname.trim() });
      create({ table: 'todotag', data: { todoitem_id: todoid, tag_id: tagid } }); //await knex('TodoTag').insert({ todoitem_id: todoid, tag_id: tagid });
    });
  }
  res.status(201).send(await await findAll({ table: 'todoitem', filter: { id: todoid } }));
});

//* Delete a Todo by todoid
app.delete('/list/:listid/todo/:todoid', async (req, res) => {
  const { todoid: id } = req.params;
  drop({ table: 'todoitem', filter: { id } });
  res.sendStatus(204);
});

//* Mark Todo as done
app.post('/list/:listid/todo/:todoid/done', async (req, res) => {
  const { todoid: id } = req.params;
  await update({ table: 'todoitem', filter: { id }, data: { done: 'T' } });
  res.sendStatus(200);
});

//* Mark Todo as not done
app.delete('/list/:listid/todo/:todoid/done', async (req, res) => {
  const { todoid: id } = req.params;
  await update({ table: 'todoitem', filter: { id }, data: { done: 'F' } });
  res.sendStatus(200);
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
