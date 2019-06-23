const { execQuery, checkId } = require('./functions');

async function removeRows(req, res) {
  try {
    const exsistId = await checkId(req.params.tableName, req.params.id);
    if (exsistId.length !== 0) {
      const selectedQuery = `delete from ${req.params.tableName} where ID = ?`;
      await execQuery(selectedQuery, req.params.id);
      res.status(200).send({ Succeeded: 'has been removed' });
    } else {
      res.status(404).send({ Error: 'invalide id' });
    }
  } catch (error) {
    res.status(404).send({ Error: error });
  }
  res.end();
}

module.exports.removeRows = removeRows;
