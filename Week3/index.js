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

app.use(express.json());
//* Get all users
app.get('/user', async (req, res) => {
  res.send(await knex('User').select('*'));
});
//* Create new user
app.post('/user', async (req, res) => {
  const { error } = validate(req.body, 'user');
  if (error) return res.status(400).send(error.details.map(d => d.message).join('\n'));
  const id = await knex('User').insert(req.body);
  res.status(201).send(
    await knex('User')
      .select('*')
      .where({ id }),
  );
});
//* Delete a user by userid
app.delete('/user/:userid', async (req, res) => {
  const { userid: id } = req.params;
  await knex('User')
    .where({ id })
    .del();
  res.sendStatus(204);
});
//* Get lists of a user by userid
app.get('/user/:userid/list', async (req, res) => {
  const { userid: user_id } = req.params;
  res.send(
    await knex('List')
      .join('User', { 'User.ID': 'List.User_ID' })
      .select('*')
      .where({ user_id }),
  );
});
//* Create new list for a user
app.post('/user/:userid/list', async (req, res) => {
  const { error } = validate(req.body, 'list');
  if (error) return res.status(400).send(error.details.map(d => d.message).join('\n'));
  const id = await knex('List').insert({ ...req.body, user_id: req.params.userid });
  res.status(201).send(
    await knex('List')
      .select('*')
      .where({ id }),
  );
});
//* Get a list by listid
app.get('/list/:listid', async (req, res) => {
  const { listid } = req.params;
  res.send(
    await knex('List')
      .select('*')
      .where({ id: listid }),
  );
});
//* Delete a list by listid
app.delete('/list/:listid', async (req, res) => {
  const { listid } = req.params;
  await knex('List')
    .where({ id: listid })
    .del();
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
  const { todoid } = req.params;
  res.send(
    await knex('TodoItem')
      .select('*')
      .where({ id: todoid }),
  );
});

//* Add new Todo to a list by listid, [optional] add multiple tags
app.post('/list/:listid/todo', async (req, res) => {
  const { error } = validate(req.body, 'todo');
  if (error) return res.status(400).send(error.details.map(d => d.message).join('\n'));
  const { note, tag } = req.body;
  const todoid = await knex('TodoItem').insert({ note, listid: req.params.listid });
  if (tag) {
    const tags = req.body.tag.split(',');
    console.log(tags);
    tags.forEach(async tagname => {
      const tagid = await knex('Tag').insert({ tag_name: tagname.trim() });
      await knex('TodoTag').insert({ todoitem_id: todoid, tag_id: tagid });
    });
  }
  res.status(201).send(
    await knex('TodoItem')
      .select('*')
      .where({ id: todoid }),
  );
});
//* delete a Todo by todoid
app.delete('/list/:listid/todo/:todoid', async (req, res) => {
  const { todoid } = req.params;
  await knex('TodoItem')
    .where({ id: todoid })
    .del();
  res.sendStatus(204);
});
//* Mark Todo as done
app.post('/list/:listid/todo/:todoid/done', async (req, res) => {
  const { todoid } = req.params;
  await knex('TodoItem')
    .where({ id: todoid })
    .update({ done: 'T' });
  res.sendStatus(200);
});
//* Mark Todo as not done
app.delete('/list/:listid/todo/:todoid/done', async (req, res) => {
  const { todoid } = req.params;
  await knex('TodoItem')
    .where({ id: todoid })
    .update({ done: 'F' });
  res.sendStatus(200);
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
