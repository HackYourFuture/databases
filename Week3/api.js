const mysql = require('mysql');
const util = require('util');
const { handelError } = require('./dbUtils');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todos_app',
});

const execQuery = util.promisify(connection.query.bind(connection));
connection.connect(handelError('connecting...'));

class Api {
  async getUsersHandler(req, res) {
    try {
      const users = await execQuery(`SELECT * FROM todos_app.users`);
      if (!users.length) return res.status(404).send(`You need to insert some users!`);
      res.send(users);
    } catch (err) {
      console.log(err.message);
    }
  }

  async getUserHandler(req, res) {
    const userId = req.params.id;
    try {
      const user = await execQuery(`SELECT * FROM todos_app.users WHERE User_id = ?`, [userId]);
      if (!user.length) return res.status(404).send('The user with the given Id was not Found!');
      res.send(user);
    } catch (err) {
      console.log(err);
    }
  }

  async createUserHandler(req, res) {
    try {
      const { Name, User_id, Email } = req.body;
      const create = `INSERT INTO todos_app.users (User_id, Name, Email) VALUES (?, ?, ?)`;
      await execQuery(create, [User_id, Name, Email]);
      res.end('User was successful created!');
    } catch (err) {
      console.error(err.message);
      res.end(err.message);
    }
  }

  async deleteUserHandler(req, res) {
    try {
      const users = await execQuery(`SELECT * FROM todos_app.users`);
      const id = parseInt(req.params.id);
      const user = users.find(user => user.user_id === id);
      if (!user) return res.status(404).send('The user with the given Id was not Found!');
      if (users.length === 1) await execQuery(`Delete FROM todos_app.users where user_id = ?`, id);
      await execQuery(
        `DELETE users, todolist FROM users INNER JOIN todolist
      WHERE users.user_id = todolist.user_id and users.user_id = ?`,
        id,
      );
      res.send('User deleted successfully');
    } catch (err) {
      console.log(err);
    }
  }

  async updateUser(req, res) {
    try {
      const users = await execQuery(`SELECT * FROM todos_app.users`);
      const id = parseInt(req.params.id);
      const user = users.find(user => user.user_id === id);
      if (!user) return res.status(404).send('The user with the given Id was not Found!');
      const { Name, Email } = req.body;
      await execQuery(`UPDATE users SET Name = ?, Email = ? WHERE user_id = ${id}`, [Name, Email]);
      res.end('The update was successful!');
    } catch (err) {
      res.end(err);
    }
  }

  async getTodolistHandler(req, res) {
    try {
      const todolist = await execQuery(`SELECT * FROM todos_app.todolist`);
      if (!todolist.length) return res.status(404).send(`Create a Todo List!`);
      res.send(todolist);
    } catch (err) {
      console.log(err.message);
    }
  }

  async getSpecificTodolistHandler(req, res) {
    const todolistId = req.params.id;
    try {
      const result = await execQuery(`SELECT * FROM todos_app.todolist WHERE todolist_id = ?`, [
        todolistId,
      ]);
      if (!result.length)
        return res.status(404).send('The Todo List with the given Id was not Found!');
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  }

  async createTodolistHandler(req, res) {
    try {
      const { todolist_id, Name, tag, reminder, user_id } = req.body;
      const sql = `INSERT INTO todos_app.todolist (todolist_id, Name, tag, reminder, user_id) VALUES (?, ?, ?, ?, ?)`;
      await execQuery(sql, [todolist_id, Name, tag, reminder, user_id]);
      res.end('Todolist was successful created!');
    } catch (err) {
      console.error(err.message);
      res.end(err.message);
    }
  }

  async deleteTodolistHandler(req, res) {
    try {
      const todolists = await execQuery(`SELECT * FROM todos_app.todolist`);
      const id = parseInt(req.params.id);
      const todo = todolists.find(todo => todo.todolist_id === id);
      if (!todo) return res.status(404).send('The todo with the given Id was not Found!');
      await execQuery(
        `DELETE todolist, todo_item FROM todolist INNER JOIN todo_item
      WHERE todolist.todolist_id = todo_item.todolist_id and todolist.todolist_id = ?`,
        id,
      );

      res.send('Todo List deleted successfully');
    } catch (err) {
      console.log(err);
    }
  }

  async updateTodolistHandler(req, res) {
    try {
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
    } catch (err) {
      res.end(err);
    }
  }

  async getTodoItemsHandler(req, res) {
    try {
      const todoItem = await execQuery(`SELECT * FROM todos_app.todo_item`);
      if (!todoItem.length) return res.status(404).send(`Create a Todo List!`);
      res.send(todoItem);
    } catch (err) {
      console.log(err.message);
    }
  }

  async getTodoItemHandler(req, res) {
    const id = parseInt(req.params.id);
    try {
      const result = await execQuery(`SELECT * FROM todos_app.todo_item WHERE item_id = ?`, [id]);
      if (!result.length)
        return res.status(404).send('The Todo List with the given Id was not Found!');
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  }

  async createTodoItemHandler(req, res) {
    try {
      const { item_id, description, todo_completed, todolist_id } = req.body;
      const sql = `INSERT INTO todos_app.todo_item (item_id, description, todo_completed, todolist_id) VALUES ( ?, ?, ?, ?)`;
      await execQuery(sql, [item_id, description, todo_completed, todolist_id]);
      res.end('Todo Item was successful created!');
    } catch (err) {
      console.error(err.message);
      res.end(err.message);
    }
  }

  async deleteTodoItemHandler(req, res) {
    try {
      const todoItems = await execQuery(`SELECT * FROM todos_app.todo_item`);
      const id = parseInt(req.params.id);
      const item = todoItems.find(item => item.item_id === id);
      if (!item) return res.status(404).send('The item with the given Id was not Found!');
      await execQuery(`DELETE FROM todos_app.todo_item where item_id = ?`, id);

      res.send('Todo Item deleted successfully');
    } catch (err) {
      console.log(err);
    }
  }

  async updateTodoItemHandler(req, res) {
    try {
      const todoItems = await execQuery(`SELECT * FROM todos_app.todo_item`);
      const id = parseInt(req.params.id);
      const item = todoItems.find(item => item.item_id === id);
      if (!item) return res.status(404).send('The item with the given Id was not Found!');
      const { description, todo_completed } = req.body;
      await execQuery(
        `UPDATE todos_app.todo_item SET description = ?, todo_completed = ? WHERE todolist_id = ${id}`,
        [description, todo_completed],
      );
      res.end('The update was successful!');
    } catch (err) {
      res.end(err);
    }
  }
}

module.exports = Api;
