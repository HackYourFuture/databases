const { execQuery } = require('./execQuery');
const { checkId } = require('./checkId');

async function markAsCompleted(req, res) {
  await execQuery('use tododatabase');
  const exsistId = checkId(req.params.table, req.params.id);
  if (exsistId.length !== 0) {
    const selectedQuery = `UPDATE todolist SET IsCompleted = 'true' WHERE ID = ? `;
    await execQuery(selectedQuery, req.params.id, async (err, rows) => {
      if (err) throw err;
      const result = await execQuery(`select * from todolist`);
      res.status(201).send(result);
      res.end();
    });
  } else {
    console.log('invalide id');
  }
}

module.exports.markAsCompleted = markAsCompleted;
