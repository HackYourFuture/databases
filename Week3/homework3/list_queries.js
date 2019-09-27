const { execQuery } = require('./connection');

const getAllTodoLists = async (req, res) => {
  try {
    const todo_list = await execQuery(`SELECT * FROM todo_app.todo_list`);
    if (!todo_list.length) return res.status(404).send(`No Todo List!`);
    res.send(todo_list);
  } catch (err) {
    console.log(err.message);
  }
};
const getATodoListbyID = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const todolist = await execQuery(`SELECT * FROM todo_app.todo_list WHERE todo_list.ID= ?`, [
      id,
    ]);
    if (!todolist.length) return res.status(404).send('No match ID in todo_list!');
    res.send(todolist);
  } catch (err) {
    console.log(err);
  }
};
const createANewTodolist = async (req, res) => {
  try {
    const { Name, USER_ID, REMINDER_ID, Tag } = req.body;
    await execQuery(
      `INSERT INTO todo_app.todo_list (Name, USER_ID, REMINDER_ID, Tag) VALUES (?, ?, ?, ?)`,
      [Name, USER_ID, REMINDER_ID, Tag],
    );
    res.end('A new todo added!');
  } catch (err) {
    console.error(err.message);
    res.end(err.message);
  }
};
const deleteATodolist = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todolists = await execQuery(`SELECT * FROM todo_app.todo_list`);
    const todo = todolists.find(todo => todo.ID === id);
    console.log(todo);
    if (!todo) return res.status(404).send('ID not Found!');
    await execQuery('DELETE FROM todo_list WHERE todo_list.ID = ?', [id]);
    res.send('Todo List deleted successfully');
  } catch (err) {
    console.log(err);
  }
};

const updateReminder = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todolists = await execQuery(`SELECT * FROM todo_app.todo_list`);
    const todo = todolists.find(todo => todo.ID === id);
    const { REMINDER_ID } = req.body;
    console.log(REMINDER_ID);
    if (!todo) return res.status(404).send('The todo with the given Id is not Found!');
    await execQuery(`UPDATE todo_app.todo_list SET REMINDER_ID = ? WHERE todo_list.ID = ${id}`, [
      REMINDER_ID,
    ]);
    res.end('The update is successful!');
  } catch (err) {
    res.end(err);
  }
};
const getTodosbyTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const taglist = await execQuery(`SELECT * FROM todo_app.todo_list WHERE todo_list.Tag= ?`, [
      tag,
    ]);
    console.log(taglist);
    if (!taglist.length) return res.status(404).send('No match tag in todo_list!');
    res.send(taglist);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getAllTodoLists,
  getATodoListbyID,
  createANewTodolist,
  deleteATodolist,
  updateReminder,
  getTodosbyTag,
};
