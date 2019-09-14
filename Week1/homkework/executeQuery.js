function fnExecuteQuery(con, sqlQuery) {
  con.query(sqlQuery, function(err, results, fields) {
    if (err) throw err;
    console.log('Going to run ', sqlQuery);
    if (sqlQuery.includes('select')) {
      for (i in results) {
        console.log(results[i]);
      }
    }
  });
}
module.exports = {
  fnExecuteQuery,
};
