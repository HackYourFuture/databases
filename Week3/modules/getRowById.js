const { execQuery, checkId } = require('./functions');

async function getRowById(req, res) {
  try {
    const exsistId = await checkId(req.params.table, req.params.id);
    if (exsistId.length !== 0) {
      const selectedQuery = `select * from ${req.params.tableName} where ID = ?`;
      const result = await execQuery(selectedQuery, req.params.id);
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(404).send({ Error: err });
  }
  res.end();
}

module.exports.getRowById = getRowById;
