const mysql = require('mysql');
const { promisify } = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todos_app',
});

const execQuery = promisify(connection.query.bind(connection));

connection.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connection succeed!');
  }
});

async function checkUser(id) {
  const selectedUserQuery = `select * from users where user_id = ?`;
  const [selectedUser] = await execQuery(selectedUserQuery, [id]);

  if (!selectedUser) {
    const error = new Error();
    error.code = 404;
    error.message = `The user with id ${id} is not exists!`;
    throw error;
  }
}

function catchUserError(error, response) {
  console.log(error);
  if (error.code === 404) {
    return response.status(error.code).send(error.message);
  }

  response.status(500).send('Unexpected server error!');
}

async function checkTodo(id) {
  const selectedTodoQuery = `select * from todoList where todo_id = ?`;
  const [selectedTodo] = await execQuery(selectedTodoQuery, [id]);

  if (!selectedTodo) {
    const error = new Error();
    error.code = 404;
    error.message = `The todo with id ${id} is not exists!`;
    throw error;
  }
}

function catchTodoError(error, response) {
  console.log(error);
  if (error.code === 404) {
    return response.status(error.code).send(error.message);
  }

  response.status(500).send('Unexpected server error!');
}

async function checkItem(id) {
  const selectedItemQuery = `select * from todoItems where id = ?`;
  const [selectedItem] = await execQuery(selectedItemQuery, [id]);

  if (!selectedItem) {
    const error = new Error();
    error.code = 404;
    error.message = `The item with id ${id} is not exists!`;
    throw error;
  }
}

function catchItemError(error, response) {
  console.log(error);
  if (error.code === 404) {
    return response.status(error.code).send(error.message);
  }

  response.status(500).send('Unexpected server error!');
}

async function createUser(request, response) {
  const { user_name, email, gender } = request.body;

  try {
    const insertQuery = `insert ignore into users (user_name,email,gender) values (?,?,?)`;
    const insert = await execQuery(insertQuery, [user_name, email, gender]);
    response.send(insert);
  } catch (error) {
    console.log(error);
    response.status(500).send('Unexpected server error!');
  }
}

async function getUserList(request, response) {
  try {
    const listQuery = `select * from users`;
    const getList = await execQuery(listQuery);
    response.send(getList);
  } catch (error) {
    console.log(error);
    response.status(500).send('Unexpected server error!');
  }
}

async function getOneUser(request, response) {
  try {
    const userId = request.params.id;

    await checkUser(userId);

    const getOneUserQuery = `select * from users where user_id = ?`;
    const getOneUser = await execQuery(getOneUserQuery, [userId]);
    response.send(getOneUser);
    response.end();
  } catch (error) {
    catchUserError(error, response);
  }
}

async function updateUser(request, response) {
  try {
    const selectedUserQuery = `select * from users where user_id = ?`;
    const [selectedUser] = await execQuery(selectedUserQuery, [
      request.params.id,
    ]);

    const userId = request.params.id;

    await checkUser(userId);

    const userName = request.body.user_name || selectedUser.user_name;
    const email = request.body.email || selectedUser.email;
    const gender = request.body.gender || selectedUser.gender;

    const updateQuery = `update users set user_name=? , email = ?, gender= ? where user_id= ?`;
    const updated = await execQuery(updateQuery, [
      userName,
      email,
      gender,
      userId,
    ]);
    response.send(updated);
    response.end();
  } catch (error) {
    catchUserError(error, response);
  }
}

async function deleteUser(request, response) {
  try {
    const userId = request.params.id;

    await checkUser(userId);

    const deleteQuery = `delete from users where user_id= ?`;
    await execQuery(deleteQuery, [userId]);
    response.status(200).send('This user has been deleted!');
    response.end();
  } catch (error) {
    catchUserError(error, response);
  }
}

async function createTodoList(request, response) {
  const { todo_name, start_date, expire_date, user_id } = request.body;

  try {
    const insertQuery = `insert ignore into todoList (todo_name, start_date, expire_date, user_id ) values (?,?,?,?)`;
    const insert = await execQuery(insertQuery, [
      todo_name,
      start_date,
      expire_date,
      user_id,
    ]);
    response.send(insert);
  } catch (error) {
    console.log(error);
  }
}

async function getTodoList(request, response) {
  try {
    const listQuery = `select * from todoList`;
    const getList = await execQuery(listQuery);
    response.send(getList);
  } catch (error) {
    console.log(error);
  }
}

async function getOneTodo(request, response) {
  try {
    const todoId = request.params.id;

    await checkTodo(todoId);

    const getOneTodoQuery = `select * from todoList where todo_id = ?`;
    const getOneTodo = await execQuery(getOneTodoQuery, [todoId]);
    response.send(getOneTodo);
    response.end();
  } catch (error) {
    catchTodoError(error, response);
  }
}

async function getOneTodoListItems(request, response) {
  try {
    const todoId = request.params.id;

    await checkTodo(todoId);

    const getOneTodoItemsQuery = `select todo_name,todoItems.description as TodoDetails,todoItems.is_done as isDone 
    from todoList join todoItems on todoList.user_id = todoItems.user_id where todoList.todo_id=?;`;
    const getOneTodoItems = await execQuery(getOneTodoItemsQuery, [todoId]);
    response.send(getOneTodoItems);
    response.end();
  } catch (error) {
    catchTodoError(error, response);
  }
}

async function updateTodo(request, response) {
  try {
    const selectedTodoQuery = `select * from todoList where todo_id = ?`;
    const [selectedTodo] = await execQuery(selectedTodoQuery, [
      request.params.id,
    ]);

    const todoId = request.params.id;

    await checkTodo(todoId);

    const todoName = request.body.todo_name || selectedTodo.todo_name;
    const startDate = request.body.start_date || selectedTodo.start_date;
    const expireDate = request.body.expire_date || selectedTodo.expire_date;
    const userId = request.body.user_id || selectedTodo.user_id;

    const updateQuery = `update todoList set todo_name=? , start_date = ?, expire_date = ?, user_id = ? where todo_id= ?`;
    const updated = await execQuery(updateQuery, [
      todoName,
      startDate,
      expireDate,
      userId,
      todoId,
    ]);
    response.send(updated);
    response.end();
  } catch (error) {
    catchTodoError(error, response);
  }
}

async function deleteTodo(request, response) {
  try {
    const todoId = request.params.id;

    await checkTodo(todoId);

    const deleteQuery = `delete from todoList where todo_id= ?`;
    const deleted = await execQuery(deleteQuery, [todoId]);
    response.send(deleted);
    response.end();
  } catch (error) {
    catchTodoError(error, response);
  }
}

async function createTodoItem(request, response) {
  const { description, is_done, todo_id, user_id } = request.body;

  try {
    const insertQuery = `insert ignore into todoItems (description, is_done, todo_id, user_id) values (?,?,?,?)`;
    const insert = await execQuery(insertQuery, [
      description,
      is_done,
      todo_id,
      user_id,
    ]);
    response.send(insert);
  } catch (error) {
    console.log(error);
  }
}

async function getTodoItemList(request, response) {
  try {
    const listQuery = `select * from todoItems`;
    const getList = await execQuery(listQuery);
    response.send(getList);
  } catch (error) {
    console.log(error);
  }
}

async function getOneTodoItem(request, response) {
  try {
    const itemId = request.params.id;

    await checkItem(itemId);

    const getOneItemQuery = `select * from todoItems where id = ?`;
    const getOneItem = await execQuery(getOneItemQuery, [itemId]);
    response.send(getOneItem);
    response.end();
  } catch (error) {
    catchItemError(error, response);
  }
}

async function updateTodoItem(request, response) {
  try {
    const selectedItemQuery = `select * from todoItems where id = ?`;
    const [selectedItem] = await execQuery(selectedItemQuery, [
      request.params.id,
    ]);

    const itemId = request.params.id;

    await checkItem(itemId);

    const description = request.body.description || selectedItem.description;
    const isDone = request.body.is_done || selectedItem.is_done;
    const todoId = request.body.todo_id || selectedItem.todo_id;
    const userId = request.body.user_id || selectedItem.user_id;

    const updateQuery = `update todoItems set description=?, is_done= ?, todo_id= ?, user_id = ? where id= ?`;
    const updated = await execQuery(updateQuery, [
      description,
      isDone,
      todoId,
      userId,
      itemId,
    ]);
    response.send(updated);
    response.end();
  } catch (error) {
    catchItemError(error, response);
  }
}

async function deleteTodoItem(request, response) {
  try {
    const itemId = request.params.id;

    await checkItem(itemId);

    const deleteQuery = `delete from todoItems where id= ?`;
    const deleted = await execQuery(deleteQuery, [itemId]);
    response.send(deleted);
    response.end();
  } catch (error) {
    catchItemError(error, response);
  }

  connection.end(err => {
    if (err) {
      console.error(err);
    } else {
      console.log('Connection successfully ended!');
    }
  });
}

module.exports = {
  createUser,
  getUserList,
  getOneUser,
  deleteUser,
  updateUser,
  createTodoList,
  getTodoList,
  getOneTodo,
  getOneTodoListItems,
  updateTodo,
  deleteTodo,
  createTodoItem,
  getTodoItemList,
  getOneTodoItem,
  updateTodoItem,
  deleteTodoItem,
};
