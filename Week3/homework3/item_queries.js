const { execQuery } = require('./connection');

const getAllTodoItems = async (req, res) => {
  try {
    const todo_item = await execQuery(`SELECT * FROM todo_app.todo_item`);
    if (!todo_item.length) return res.status(404).send(`No Todo item!`);
    res.send(todo_item);
  } catch (err) {
    console.log(err.message);
  }
};

const getATodoItembyID = async (req, res) => {
  const { id } = req.params;
  try {
    const todoitem = await execQuery(`SELECT * FROM todo_app.todo_item WHERE todo_item.ID= ?`, [
      id,
    ]);
    if (!todoitem.length) return res.status(404).send('No match ID in todo_item!');
    res.send(todoitem);
  } catch (err) {
    console.log(err);
  }
};

const createANewTodoItem = async (req, res) => {
  try {
    const { Name } = req.body;
    await execQuery(`INSERT INTO todo_app.todo_item (Name) VALUES (?)`, [Name]);
    res.end('A new todo item added!');
  } catch (err) {
    console.error(err.message);
    res.end(err.message);
  }
};

const deleteATodoItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todoitems = await execQuery(`SELECT * FROM todo_app.todo_item`);
    const todo = todoitems.find(todo => todo.ID === id);
    console.log(todoitems);
    if (!todo) return res.status(404).send('ID not Found!');
    await execQuery('DELETE FROM todo_item WHERE todo_item.ID = ?', [id]);
    res.send('Todo item deleted successfully');
  } catch (err) {
    console.log(err);
  }
};
const markAsFinished = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todocompletions = await execQuery(`SELECT * FROM todo_app.list_item_completion`);
    const completion = todocompletions.find(completion => completion.ID === id);
    if (!completion) return res.status(404).send('ID not Found!');

    await execQuery(
      "UPDATE todo_app.list_item_completion SET Situation = 'Finished' WHERE todo_app.list_item_completion.ID = ?",
      [id],
    );
    res.send('Todo item changed as finished');
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllTodoItems,
  getATodoItembyID,
  createANewTodoItem,
  deleteATodoItem,
  markAsFinished,
};
