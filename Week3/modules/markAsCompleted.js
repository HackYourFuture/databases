const { execQuery } = require('./execQuery');
async function markAsCompleted(req, res) {
  await execQuery('use tododatabase');
  const selectedQuery = `UPDATE todolist SET IsCompleted = 'true' WHERE ID = ? `;
  await execQuery(selectedQuery, req.params.id, async (err, rows) => {
    if (err) throw err;
    const result = await execQuery(`select * from todolist`);
    res.status(201).send(result);
    res.end();
  });
}

module.exports.markAsCompleted = markAsCompleted;
