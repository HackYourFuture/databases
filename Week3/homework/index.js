'use strict';
{
  const { promisify } = require('util');
  const mysql = require('mysql');
  const Express = require('express');
  const app = new Express();
  app.use(Express.json());
  const PORT = 3000;

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'toDos',
  });

  connection.connect(error => {
    if (!error) {
      console.log(`Successfully connected to the mysql server.`);
    } else {
      console.error(
        `There was an error connecting to the server: ${error.code} - ${error.message}`,
      );
      process.exit();
    }
  });

  const executeQuery = promisify(connection.query.bind(connection));

  function displayError(response, error) {
    response.status(500);
    response.json({ error: error.message });
    console.error(`${error.code} - ${error.message}`);
  }

  async function createUser(request, response) {
    try {
      const { user } = request.body;
      for (let usr of user) {
        await executeQuery(`insert into user set name = ?`, usr.name);
      }
      response.status(201);
      response.json({ user });
    } catch (error) {
      displayError(response, error);
    }
  }

  async function createTodoList(request, response) {
    try {
      const { todoList } = request.body;
      for (let list of todoList) {
        await executeQuery(`insert into toDoList set title = ?, userId = ? `, [
          list.title,
          list.userId,
        ]);
      }
      response.status(201);
      response.json({ todoList });
    } catch (error) {
      displayError(response, error);
    }
  }

  async function createTodoListItem(request, response) {
    try {
      const { todoListItem } = request.body;
      for (let listItem of todoListItem) {
        await executeQuery(
          `insert into toDoListItem set description = ?, isCompleted = ?, dueDate = ?, toDoListId = ?`,
          [listItem.description, listItem.isCompleted, listItem.dueDate, listItem.toDoListId],
        );
      }
      response.status(201);
      response.json({ todoListItem });
    } catch (error) {
      displayError(response, error);
    }
  }

  async function createReminder(request, response) {
    try {
      const { reminder } = request.body;
      for (let rem of reminder) {
        await executeQuery(
          `insert into reminder set title = ?, alarmFrom = ?, alarmTo = ?, alarmTone = ?, toDoListId = ?`,
          [rem.title, rem.alarmFrom, rem.alarmTo, rem.alarmTone, rem.toDoListId],
        );
      }
      response.status(201);
      response.json({ reminder });
    } catch (error) {
      displayError(response, error);
    }
  }

  async function deleteEntry(query, request, response) {
    try {
      const { id } = request.params;
      await executeQuery(query, id);
      response.json({ message: `Id: ${id} deleted.` });
      response.status(204);
      response.end();
    } catch (error) {
      displayError(response, error);
    }
  }

  async function markTodoListItem(request, response) {
    try {
      const { isCompleted, id } = request.params;
      await executeQuery(`update toDoListItem set isCompleted = ? where id = ?`, [isCompleted, id]);
      response.status(200);
      response.json({ message: `Item with id: ${id} updated.` });
    } catch (error) {
      displayError(response, error);
    }
  }

  async function getEntry(query, request, response) {
    try {
      const { id } = request.params;
      let result;

      if (id === 'all') {
        result = await executeQuery(query);
      } else {
        result = await executeQuery(`${query} where id = ? `, id);
      }
      response.status(200);
      response.json({ result });
    } catch (error) {
      displayError(response, error);
    }
  }

  async function main() {
    app.post(`/todos/user`, createUser);
    app.post(`/todos/todoList`, createTodoList);
    app.post(`/todos/todoListItem`, createTodoListItem);
    app.post(`/todos/reminder`, createReminder);

    app.get(`/todos/user/:id`, (req, res) => getEntry(`select * from user`, req, res));
    app.get(`/todos/todoList/:id`, (req, res) => getEntry(`select * from toDoList`, req, res));
    app.get(`/todos/todoListItem/:id`, (req, res) =>
      getEntry(`select * from toDoListItem`, req, res),
    );
    app.get(`/todos/reminder/:id`, (req, res) => getEntry(`select * from reminder`, req, res));

    app.delete(`/todos/user/:id`, (req, res) =>
      deleteEntry(`delete from user where id = ?`, req, res),
    );
    app.delete(`/todos/todoList/:id`, (req, res) =>
      deleteEntry(`delete from toDoList where id = ?`, req, res),
    );
    app.delete(`/todos/todoListItem/:id`, (req, res) =>
      deleteEntry(`delete from toDoListItem where id = ?`, req, res),
    );
    app.delete(`/todos/reminder/:id`, (req, res) =>
      deleteEntry(`delete from reminder where id = ?`, req, res),
    );

    app.post(`/todos/todoListItem/:id/:isCompleted`, markTodoListItem);

    app.listen(PORT, error => {
      if (error) return console.error(error);

      console.log(`Server started on http://localhost:${PORT}`);
    });
  }

  main();
}
