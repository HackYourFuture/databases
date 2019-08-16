const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo_list_app',
});


const execQuery = util.promisify(connection.query.bind(connection));
connection.connect();

async function showTable(req, res) {
  const tableName = req.params.table;
  try {
    const showTableData = await execQuery(`SELECT * FROM ` + (tableName));
    res.status(200).send(showTableData);

  } catch (error) {
    return res.status(404).send('error')
  }
  res.end();
};

async function addTodoItem(req, res) {
  try {
    await execQuery(`INSERT INTO todo_item (todo_item_name, isTagged, description) VALUES (?, ?, ?)`, [
      req.body.todo_item_name,
      req.body.isTagged,
      req.body.description,
    ]);
    res.status(201).send('item was add successfully')
  } catch (error) {
    return res.status(404).send('there is an error')
  }
  res.end();
};

async function deleteTodoItem(req, res) {
  try {
    await execQuery(`DELETE FROM todo_item WHERE itemID = ?`, [req.params.id]);
    res.status(201).send('item was deleted successfully')
  } catch (error) {
    return res.status(404).send('there is an error')
  }
  res.end();
};

async function addTodoList(req, res) {
  try {
    await execQuery(`INSERT INTO todo_list (list_name,categoryID) VALUES (?, ?)`, [
      req.body.list_name,
      req.body.categoryID,
    ]);
    res.status(201).send('TODO LIST ADDED SCUCCESSFULLY')
  } catch (error) {
    res.status(404).send('there is an error')
  }
  res.end()
};

async function deleteTodoList(req, res) {
  try {
    await execQuery(`DELETE FROM todo_list WHERE listID =?`, [req.params.id]);
    res.status(201).send('List was deleted successfully')
  } catch (error) {
    return res.status(404).send('there is an error')
  }
  res.end()
};

async function markCompleted(req, res) {
  try {
    const completeness = await execQuery(`SELECT isCompleted FROM todo_list_item WHERE itemID =?`, [req.params.id]);
    if (completeness[0].isCompleted === 1) {
      return res.status(404).send('this item is already completed')
    }
    await execQuery(`UPDATE todo_list_item SET isComleted =1 WHERE itemID =?`, [req.params.id]);
    res.status(201).send('item is completed now')
  } catch (error) {
    return res.status(400).send('there is an error')
  }
  res.end()
};

async function addReminder(req, res) {
  try {
    await execQuery(`UPDATE user_todo_list SET reminder =? WHERE todo_listID = ?`, [
      req.body.reminder,
      req.params.id,
    ]);
    res.status(201).send('there is now a reminder for your todo list')
  } catch (error) {
    return res.status(404).send('there is an error')
  }
  res.end()
}

module.exports = { connection, showTable, addTodoItem, deleteTodoItem, addTodoList, deleteTodoList, markCompleted, addReminder }



