const fs = require('fs');
const { executeQuery, errorHandle, getQueryResult } = require('./dbconnection');

const retrieveTodoLists = async (request, response) => {
  try {
    const query = `SELECT user.name AS 'User Name', todolist.Name AS 'List Name', category.categoryname FROM todolist JOIN user ON todolist.userID = user.userID JOIN category ON category.catID = todolist.catID;`;
    const result = await executeQuery(query);
    response.json(result);
  } catch (error) {
    errorHandle(error);
  }
};

const retrieveTodoItems = async (request, response) => {
  try {
    const query = `SELECT todolist.Name AS 'List Name', todoitem.name AS 'Todo Item', iscomplete.iscomplete FROM todolist JOIN iscomplete ON iscomplete.listID = todolist.listID JOIN todoitem ON todoitem.todoID = iscomplete.todoID WHERE todolist.name = ?;`;
    const checkIfExistList = await executeQuery(
      'select exists(select name from todolist where name = ?);',
      request.params.listname,
    );
    if (getQueryResult(checkIfExistList)) {
      const result = await executeQuery(query, request.params.listname);
      await response.json(result);
    } else {
      response.status(400).send('Please enter a valid list name');
    }
  } catch (error) {
    errorHandle(error);
  }
};

const addTodoList = async (request, response) => {
  try {
    const query = `CALL addlist (?, ?, ?, ?);`;
    insertedValues = [
      request.body['List Name'],
      request.body['User Name'],
      request.body['Category Name'],
      request.body['Deadline'],
    ];
    const ifExistUserQuery = 'select exists(select name from user where user.name = ?);';
    const ifExistCatQuery =
      'select exists(select categoryname from category where categoryname = ?);';
    const checkIfExistUser = await executeQuery(ifExistUserQuery, insertedValues[1]);
    const checkIfExistCategory = await executeQuery(ifExistCatQuery, insertedValues[2]);
    if (getQueryResult(checkIfExistUser) && getQueryResult(checkIfExistCategory)) {
      await executeQuery(query, insertedValues);
      await response.send('Todo List is added !');
    } else {
      response.status(400).send('Please enter a valid category and user name');
    }
  } catch (error) {
    errorHandle(error);
  }
};

const addTodoItem = async (request, response) => {
  try {
    const query = `CALL additem (?, ?);`;
    insertedValues = [request.body['Item Name'], request.body['List Name']];
    const checkIfExistList = await executeQuery(
      'select exists(select name from todolist where name = ?);',
      request.body['List Name'],
    );
    if (getQueryResult(checkIfExistList)) {
      await executeQuery(query, insertedValues);
      await response.send('Todo Item is added !');
    } else {
      response.status(400).send('Please enter a valid list name');
    }
  } catch (error) {
    errorHandle(error);
  }
};

const deleteTodoItem = async (request, response) => {
  try {
    const query = `DELETE FROM todoitem WHERE name = ?;`;
    const checkIfExistItem = await executeQuery(
      'select exists(select name from todoitem where name = ?);',
      request.params.name,
    );
    if (getQueryResult(checkIfExistItem)) {
      await executeQuery(query, request.params.name);
      await response.send('Todo Item is deleted !');
    } else {
      response.status(400).send('Please enter a valid item name');
    }
  } catch (error) {
    errorHandle(error);
  }
};

const deleteTodoList = async (request, response) => {
  try {
    const query = `DELETE todolist, todoitem FROM todolist INNER JOIN  iscomplete on todolist.listid = iscomplete.listid
    INNER JOIN todoitem on todoitem.todoid = iscomplete.todoid WHERE todolist.name = ?;`;
    const checkIfExistList = await executeQuery(
      'select exists(select name from todolist where name = ?);',
      request.params.name,
    );
    if (getQueryResult(checkIfExistList)) {
      await executeQuery(query, request.params.name);
      await response.send('Todo List is deleted !');
    } else {
      response.status(400).send('Please enter a valid list name');
    }
  } catch (error) {
    errorHandle(error);
  }
};

const markAsDone = async (request, response) => {
  try {
    const query = `UPDATE iscomplete SET iscomplete = True WHERE iscomplete.todoID = (SELECT todoId FROM todoitem WHERE name = ?);`;
    const checkIfExistList = await executeQuery(
      'select exists(select name from todoitem where name = ?);',
      request.params.name,
    );
    if (getQueryResult(checkIfExistList)) {
      await executeQuery(query, request.params.name);
      await response.send('Todo Item is updated as "completed" !');
    } else {
      response.status(400).send('Please enter a valid item name');
    }
  } catch (error) {
    errorHandle(error);
  }
};

const reminder = async (request, response) => {
  try {
    const query = `SELECT name, deadline from todolist WHERE CURDATE() > deadline;`;
    const result = await executeQuery(query);
    await response.json(result);
  } catch (error) {
    errorHandle(error);
  }
};

module.exports = {
  retrieveTodoLists,
  retrieveTodoItems,
  addTodoList,
  addTodoItem,
  deleteTodoItem,
  deleteTodoList,
  markAsDone,
  reminder,
};
