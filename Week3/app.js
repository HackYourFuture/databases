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

async function createUser(request, response) {
  const { user_name, email, gender } = request.body;

  try {
    const insertQuery = `insert ignore into users (user_name,email,gender) values (?,?,?)`;
    const insert = await execQuery(insertQuery, [user_name, email, gender]);
    response.send(insert);
  } catch (error) {
    console.log(error);
  }
}

async function getUserList(request, response) {
  try {
    const listQuery = `select * from users`;
    const getList = await execQuery(listQuery);
    response.send(getList);
  } catch (error) {
    console.log(error);
  }
}

async function getOneUser(request, response) {
  const userId = request.params.id;
  try {
    const getOneUserQuery = `select * from users where user_id = ?`;
    const getOneUser = await execQuery(getOneUserQuery, [userId]);
    response.send(getOneUser);
    response.end();
  } catch (error) {
    console.log(error);
  }
}

async function updateUser(request, response) {
  const selectedUserQuery = `select * from users where user_id = ?`;
  const [selectedUser] = await execQuery(selectedUserQuery, [
    request.params.id,
  ]);

  const userId = request.params.id;
  const userName = request.body.user_name || selectedUser.user_name;
  const email = request.body.email || selectedUser.email;
  const gender = request.body.gender || selectedUser.gender;

  try {
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
    console.log(error);
  }
}

async function deleteUser(request, response) {
  const userId = request.params.id;
  try {
    const deleteQuery = `delete from users where user_id= ?`;
    const deleted = await execQuery(deleteQuery, [userId]);
    response.send(deleted);
    response.end();
  } catch (error) {
    console.log(error);
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
  const todoId = request.params.id;
  try {
    const getOneTodoQuery = `select * from todoList where todo_id = ?`;
    const getOneTodo = await execQuery(getOneTodoQuery, [todoId]);
    response.send(getOneTodo);
    response.end();
  } catch (error) {
    console.log(error);
  }
}

async function getOneTodoListItems(request, response) {
  const todoId = request.params.id;
  try {
    const getOneTodoItemsQuery = `select todo_name,todoItems.description as TodoDetails,todoItems.is_done as isDone 
    from todoList join todoItems on todoList.user_id = todoItems.user_id where todoList.todo_id=?;`;
    const getOneTodoItems = await execQuery(getOneTodoItemsQuery, [todoId]);
    response.send(getOneTodoItems);
    response.end();
  } catch (error) {
    console.log(error);
  }
}

async function updateTodo(request, response) {
  const selectedTodoQuery = `select * from todoList where todo_id = ?`;
  const [selectedTodo] = await execQuery(selectedTodoQuery, [
    request.params.id,
  ]);

  const todoId = request.params.id;
  const todoName = request.body.todo_name || selectedTodo.todo_name;
  const startDate = request.body.start_date || selectedTodo.start_date;
  const expireDate = request.body.expire_date || selectedTodo.expire_date;
  const userId = request.body.user_id || selectedTodo.user_id;

  try {
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
    console.log(error);
  }
}

async function deleteTodo(request, response) {
  const todoId = request.params.id;
  try {
    const deleteQuery = `delete from todoList where todo_id= ?`;
    const deleted = await execQuery(deleteQuery, [todoId]);
    response.send(deleted);
    response.end();
  } catch (error) {
    console.log(error);
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
  const ItemId = request.params.id;
  try {
    const getOneItemQuery = `select * from todoItems where id = ?`;
    const getOneItem = await execQuery(getOneItemQuery, [ItemId]);
    response.send(getOneItem);
    response.end();
  } catch (error) {
    console.log(error);
  }
}

async function updateTodoItem(request, response) {
  const selectedItemQuery = `select * from todoItems where id = ?`;
  const [selectedItem] = await execQuery(selectedItemQuery, [
    request.params.id,
  ]);

  const itemId = request.params.id;
  const description = request.body.description || selectedItem.description;
  const isDone = request.body.is_done || selectedItem.is_done;
  const todoId = request.body.todo_id || selectedItem.todo_id;
  const userId = request.body.user_id || selectedItem.user_id;

  try {
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
    console.log(error);
  }
}

async function deleteTodoItem(request, response) {
  const itemId = request.params.id;
  try {
    const deleteQuery = `delete from todoItems where id= ?`;
    const deleted = await execQuery(deleteQuery, [itemId]);
    response.send(deleted);
    response.end();
  } catch (error) {
    console.log(error);
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
