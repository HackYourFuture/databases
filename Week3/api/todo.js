const { execQuery } = require('../db/db_connection');
class Todo {
  async getTodoItemsHandler(req, res) {
    const todoItem = await execQuery(`SELECT * FROM todos_app.todo_item`);
    if (!todoItem.length) return res.status(404).send(`Create a Todo item!`);
    res.send(todoItem);
  }

  async getTodoItemHandler(req, res) {
    const id = parseInt(req.params.id);
    const result = await execQuery(`SELECT * FROM todos_app.todo_item WHERE item_id = ?`, [id]);
    if (!result.length)
      return res.status(404).send('The Todo List with the given Id was not Found!');
    res.send(result);
  }

  async createTodoItemHandler(req, res) {
    const { description, todo_completed, todolist_id } = req.body;
    const sql = `INSERT INTO todos_app.todo_item (description, todo_completed, todolist_id) VALUES ( ?, ?, ?)`;
    await execQuery(sql, [description, todo_completed, todolist_id]);
    res.end('Todo Item was successful created!');
  }

  async deleteTodoItemHandler(req, res) {
    const todoItems = await execQuery(`SELECT * FROM todos_app.todo_item`);
    const id = parseInt(req.params.id);
    const item = todoItems.find(item => item.item_id === id);
    if (!item) return res.status(404).send('The item with the given Id was not Found!');
    await execQuery(`DELETE FROM todos_app.todo_item where item_id = ?`, id);
    res.send('Todo Item deleted successfully');
  }

  async updateTodoItemHandler(req, res) {
    const todoItems = await execQuery(`SELECT * FROM todos_app.todo_item`);
    const id = parseInt(req.params.id);
    const item = todoItems.find(item => item.item_id === id);
    if (!item) return res.status(404).send('The item with the given Id was not Found!');
    const { description, todo_completed } = req.body;
    await execQuery(
      `UPDATE todos_app.todo_item SET description = ?, todo_completed = ? WHERE item_id = ${id}`,
      [description, todo_completed],
    );
    res.end('The update was successful!');
  }
}
module.exports = Todo;
