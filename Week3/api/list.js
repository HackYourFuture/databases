const { execQuery } = require('../db/db_connection');
class List {
  async getTodolistHandler(req, res) {
    const todolist = await execQuery(`SELECT * FROM todos_app.todolist`);
    if (!todolist.length) return res.status(404).send(`Create a Todo List!`);
    res.send(todolist);
  }

  async getSpecificTodolistHandler(req, res) {
    const todolistId = req.params.id;
    const result = await execQuery(`SELECT * FROM todos_app.todolist WHERE todolist_id = ?`, [
      todolistId,
    ]);
    if (!result.length)
      return res.status(404).send('The Todo List with the given Id was not Found!');
    res.send(result);
  }

  async createTodolistHandler(req, res) {
    const { Name, tag, reminder, user_id } = req.body;
    const sql = `INSERT INTO todos_app.todolist (Name, tag, reminder, user_id) VALUES (?, ?, ?, ?)`;
    await execQuery(sql, [Name, tag, reminder, user_id]);
    res.end('Todolist was successful created!');
  }

  async deleteTodolistHandler(req, res) {
    const todolists = await execQuery(`SELECT * FROM todos_app.todolist`);
    const id = parseInt(req.params.id);
    const todo = todolists.find(todo => todo.todolist_id === id);
    if (!todo) return res.status(404).send('The todo with the given Id was not Found!');
    await execQuery(`DELETE FROM todos_app.users WHERE todolist_id = ?`, id);
    res.send('Todo List deleted successfully');
  }

  async updateTodolistHandler(req, res) {
    const todolists = await execQuery(`SELECT * FROM todos_app.todolist`);
    const id = parseInt(req.params.id);
    const todo = todolists.find(todo => todo.todolist_id === id);
    if (!todo) return res.status(404).send('The todo with the given Id was not Found!');
    const { Name, tag, reminder } = req.body;
    await execQuery(
      `UPDATE todos_app.todolist SET Name = ?, tag = ?, reminder = ? WHERE todolist_id = ${id}`,
      [Name, tag, reminder],
    );
    res.end('The update was successful!');
  }
}

module.exports = List;
