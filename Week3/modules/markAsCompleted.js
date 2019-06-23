const { execQuery, checkId } = require('./functions');
async function markAsCompleted(req, res) {
  try {
    const exsistId = await checkId(req.params.tableName, req.params.id);
    if (exsistId.length !== 0) {
      const selectedQuery = `UPDATE todolist SET IsCompleted = 'true' WHERE ID = ? `;
      await execQuery(selectedQuery, req.params.id);
      await execQuery(`select * from todolist`);
      res.status(201).send({ Succeeded: 'has been marked as completed' });
    } else {
      res.status(404).send({ Error: 'invalide id' });
    }
  } catch (error) {
    res.status(404).send(error);
  }
  res.end();
}

module.exports.markAsCompleted = markAsCompleted;
