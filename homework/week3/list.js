const executeSqlQuery = require('./db');

async function addList(req, res) {
  try {
    const list = [req.body.name, req.params.owner];

    const sql = `INSERT INTO lists(name,owner) VALUES (?, ?)`;
    await executeSqlQuery(sql, list);

    const sqlSelect = `SELECT * FROM lists WHERE name=? AND owner= ?`;
    const newlist = await executeSqlQuery(sqlSelect, list);
    res.status(200).json(newlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteList(req, res) {
  try {
    const id = req.params.id;
    const sql = `DELETE FROM lists WHERE id= ?`;
    await executeSqlQuery(sql, id);
    res.status(202).json({ deleted: 'true' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getLists(req, res) {
  try {
    const owner = req.params.owner;
    const sqlSelect = `SELECT * FROM lists WHERE owner=?`;
    const lists = await executeSqlQuery(sqlSelect, owner);
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function markAs(req, res) {
  try {
    const inputs = [req.body.status, req.body.id];
    const sql = `UPDATE lists SET status = ? WHERE id=?`;
    const lists = await executeSqlQuery(sql, inputs);
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addReminder(req, res) {
  try {
    let inputs = [req.params.list_id];
    let columns = ['list_id'];

    if (req.body.date_time) {
      inputs.push(req.body.date_time);
      columns.push('date_time');
    }
    if (req.body.alert_before) {
      inputs.push(req.body.alert_before);
      columns.push('alert_before');
    }

    const sql = `INSERT INTO reminders(${columns.join(',')}) VALUES (${columns
      .map(() => '?')
      .join(',')})`;

    await executeSqlQuery(sql, inputs);
    res.status(200).json({ reminder: 'successfully added' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { addList, deleteList, getLists, markAs, addReminder };
