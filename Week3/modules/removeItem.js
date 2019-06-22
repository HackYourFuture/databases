const { execQuery } = require('./execQuery');
async function removeItem(req, res) {
  try {
    await execQuery('use tododatabase');
    const ID = req.params.id;
    const related_table = `delete from toDoList_items where Item_ID = ?`;
    const selectedQuery = `delete from items where ID = ?`;
    await execQuery(related_table, ID);
    await execQuery(selectedQuery, ID);
    const result = await execQuery(`select * from items`);
    res.status(201).send(result);
    res.end();
  } catch (err) {
    res.status(404).send(err);
    res.end();
  }
}

module.exports.removeItem = removeItem;
