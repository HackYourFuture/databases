const { execQuery } = require('./execQuery');
async function removeToDoList(req, res) {
  try {
    await execQuery('use tododatabase');
    const ID = req.params.id;
    const related_table1 = `delete from Users_toDoList where toDoList_ID = ?`;
    const related_table2 = `delete from toDoList_items where toDoList_ID = ?`;
    const selectedQuery = `delete from todolist where ID = ?`;
    await execQuery(related_table1, ID);
    await execQuery(related_table2, ID);
    await execQuery(selectedQuery, ID);
    const result = await execQuery(`select * from todolist`);
    res.status(201).send(result);
    res.end();
  } catch (err) {
    res.status(404).send(err);
    res.end();
  }
}

module.exports.removeToDoList = removeToDoList;
