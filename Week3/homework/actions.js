const fs = require('fs');
const { executeQuery, errorHandler, getQueryResult } = require('./connection');

const todolists = async (request, response) => {
  try {
    const query = `SELECT users.Name AS 'User Name', 
      description AS 'List Name', 
      category.cat_name 
      FROM todolists JOIN users 
      ON todolists.userID = users.userID JOIN category 
      ON category.catID = todolists.catID;`;
    const result = await executeQuery(query);
    response.json(result);
  } catch (error) {
    errorHandler(error);
  }
};

const todoitem = async (request, response) => {
  try {
    const query = `SELECT todolists.description AS 'List Name',
       todoitem.name AS 'Todo Item', 
       todolists_items.todolists_items 
       FROM todolists JOIN todolists_items 
       ON todolists_items.listID = todolists.listID JOIN todoitem 
       ON todoitem.todoID = todolists_items.todoID 
       WHERE todolists.description = ?;`;
    const list_exists = await executeQuery(
      'SELECT EXISTS (SELECT description FROM todolists WHERE description = ?);',
      request.params.listdescription,
    );
    if (getQueryResult(list_exists)) {
      const result = await executeQuery(query, request.params.listdescription);
      await response.json(result);
    } else {
      response.status(400).send('Check the name of the list please!');
    }
  } catch (error) {
    errorHandler(error);
  }
};

const addTodoList = async (request, response) => {
  try {
    const query = `INSERT IGNORE INTO todolists VALUES (?, ?, ?, ?, ?);`;
    values = [
      request.body.listID,
      request.body.description,
      request.body.username,
      request.body.catname,
      request.body.reminder,
    ];
    const user_exists = 'SELECT EXISTS (SELECT userID from users WHERE name = ?);';
    const category_exists = 'SELECT EXISTS (SELECT catID from category WHERE cat_name = ?);';
    const check_user = await executeQuery(user_exists, values[2]);
    const check_category = await executeQuery(category_exists, values[3]);
    if (getQueryResult(check_user) && getQueryResult(check_category)) {
      await executeQuery(query, values);
      await response.send('New todo list is added successfully!');
    } else {
      response.status(400).send('Check the category and user name please!');
    }
  } catch (error) {
    errorHandler(error);
  }
};

const addTodoItem = async (request, response) => {
  try {
    const query = `INSERT IGNORE INTO todoitem VALUES (?, ?);`;
    values = [request.body.todoname, request.body.listdescription];
    const list_exists = await executeQuery(
      'SELECT EXISTS (SELECT description FROM todolists WHERE description = ?);',
      request.body.listdescription,
    );
    if (getQueryResult(list_exists)) {
      await executeQuery(query, values);
      await response.send('Todo Item is added successfully!');
    } else {
      response.status(400).send('Check the list description please!');
    }
  } catch (error) {
    errorHandler(error);
  }
};

const param_name = 'SELECT EXISTS (SELECT name FROM todoitem WHERE name = ?);';
const deleteTodo = async (request, response) => {
  try {
    const query = `DELETE FROM todoitem WHERE name = ?;`;
    const item_exists = await executeQuery(param_name, request.params.name);
    if (getQueryResult(item_exists)) {
      await executeQuery(query, request.params.name);
      await response.send('Todo Item is deleted!');
    } else {
      response.status(400).send('Check the item name please!');
    }
  } catch (error) {
    errorHandler(error);
  }
};

const deleteTodoList = async (request, response) => {
  try {
    const query = `DELETE todolist, todoitem 
      FROM todolists INNER JOIN  todolists_items 
      ON todolists.listID = todolists_items.listID INNER JOIN todoitem 
      ON todoitem.todoID = todolists_items.todoID WHERE todolists.description = ?;`;
    const list_exists = await executeQuery(
      'SELECT EXISTS (SELECT description FROM todolists WHERE description = ?);',

      request.params.description,
    );
    if (getQueryResult(list_exists)) {
      await executeQuery(query, request.params.description);
      await response.send('Todo List is deleted!');
    } else {
      response.status(400).send('Check the list description please!');
    }
  } catch (error) {
    errorHandler(error);
  }
};

const done = async (request, response) => {
  try {
    const query = `UPDATE todolists_items SET todolists_items = True WHERE todolists_items.todoID = (SELECT todoId FROM todoitem WHERE name = ?);`;
    const list_exists = await executeQuery(param_name, request.params.name);
    if (getQueryResult(list_exists)) {
      await executeQuery(query, request.params.name);
      await response.send('Todo Item is marked as done!');
    } else {
      response.status(400).send('Check the item name please!');
    }
  } catch (error) {
    errorHandler(error);
  }
};

const reminder = async (request, response) => {
  try {
    const query = `SELECT description, reminder FROM todolists WHERE CURDATE() > reminder;`;
    const result = await executeQuery(query);
    await response.json(result);
  } catch (error) {
    errorHandler(error);
  }
};

module.exports = {
  todolists,
  todoitem,
  addTodoList,
  addTodoItem,
  deleteTodo,
  deleteTodoList,
  done,
  reminder,
};
