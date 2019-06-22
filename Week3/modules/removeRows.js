const { execQuery } = require('./execQuery');
const { checkId } = require('./checkId');

async function removeRows(req, res) {
  try {
    const exsistId = await checkId(req.params.table, req.params.id);
    if (exsistId.length !== 0) {
      const selectedQuery = `delete from ${req.params.table} where ID = ?`;
      await execQuery(selectedQuery, req.params.id, (error, rows) => {
        if (error) throw error;
        res.status(200).send({ Succeeded: 'has been removed' });
        res.end();
      });
    } else {
      res.status(404).send({ Error: 'invalide id' });
      res.end();
    }
  } catch (error) {
    res.status(404).send({ Error: error });
    res.end();
  }
}

module.exports.removeRows = removeRows;
