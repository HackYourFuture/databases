const executeSqlQuery = require('./db');

async function addTodo(req, res, list) {
  try {
    const list = [req.params.list_id, req.body.name, req.body.description];
    const sql = `INSERT INTO todos(list_id,name,description) VALUES (?, ?, ?)`;
    await executeSqlQuery(sql, list);

    const sqlSelect = `SELECT * FROM todos WHERE list_id=? AND name= ? AND description=?`;
    const newTodo = await executeSqlQuery(sqlSelect, list);
    res.status(200).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTodo(req, res) {
  try {
    const id = req.params.id;
    const sql = `DELETE FROM todos WHERE id= ?`;
    await executeSqlQuery(sql, id);
    res.status(202).json({ deleted: 'true' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTodos(req, res) {
  try {
    const list = [req.params.list_id];
    const sqlSelect = `SELECT * FROM todos WHERE list_id=?`;
    const lists = await executeSqlQuery(sqlSelect, list);
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function markAs(req, res) {
  try {
    const inputs = [req.body.status, req.body.id];
    const sql = `UPDATE todos SET status = ? WHERE id=?`;
    const lists = await executeSqlQuery(sql, inputs);
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { addTodo, deleteTodo, getTodos, markAs };
