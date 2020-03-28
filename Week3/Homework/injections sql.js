
function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = ${code}`,
    function(err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}
/* 
Give an example of a value that can be passed as name 
and code that would take advantage of SQL-injection and (fetch all the records in the database)

If you use '' OR 1=1 OR '' as a name you'd get all the info.
*/ 


//Rewrite the function so that it is no longer vulnerable to SQL injection
function getPopulation(Country, name, code, cb) {
    let passedName = name; 
    const query = `SELECT Population FROM ${Country} WHERE Name = ? `; 
    // assuming that connection to the database is established and stored as conn
    conn.query(query, passedName,
      function(err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  }