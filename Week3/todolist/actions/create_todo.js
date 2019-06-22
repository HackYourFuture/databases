const connection = require('../mysqlconfiguration');
const util = require('util');
const readTodo = require('./read_todo');

const execQuery = util.promisify(connection.query.bind(connection));

async function createTodo(request, response) {
  const todoList = request.body.todoList;
  const name = request.body.name;
  const status = request.body.status;
  const date = request.body.date;
  const newTodo = `INSERT INTO todos (name, isCompleted, reminder) 
                            VALUES (${name}, ${status}, ${date})`;
  const newTodoID = `SELECT todoId FROM todos ORDER BY todoID DESC LIMIT 1`;
  connection.connect();
  try {
    await execQuery(newTodo);
    const newID = await execQuery(newTodoID);
    const insertIntoCommonList = `
      INSERT INTO todolists_todos(todoListID, todoID) 
      VALUES(${todoList}, ${newID})`;
    await execQuery(insertIntoCommonList);
    await readTodo(response, todolist, newID);
  } catch (error) {
    console.error(error);
  }
  connection.end();
}

module.exports = createTodo;
