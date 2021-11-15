/*
  We can take advantage of SQL-injection in the getPopulation function by defining the following variable:
  const code = 'NL; Drop DATABASE world;'
  the pass it to the funciton  getPopulation(Country, name, code, cb);
  as we see we can exucute any query we want weather it drops the database, insert new data or update existing one and that could damage the hole app;
*/

function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function(err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}


  function getPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    conn.query(
      `SELECT Population FROM ? WHERE Name = ? and code = ?`, [Country, name, code],
      function(err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  }

  