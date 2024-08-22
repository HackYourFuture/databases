
// given function:
// function getPopulation(Country, name, code, cb) {
//     // assuming that connection to the database is established and stored as conn
//     conn.query(
//         `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
//         function (err, result) {
//             if (err) cb(err);
//             if (result.length == 0) cb(new Error("Not found"));
//             cb(null, result[0].name);
//         }
//     );
// }
// code that would take advantage of SQL-injection:
// getPopulation("Netherlands", "'; --", "' OR '1'='1")
//SQL query:
// SELECT Population FROM Country WHERE Name = ''; -- ' and code = ' OR '1'='1'

//Rewritten function
function getPopulation(Country, name, code, cb) {
    // assuming that connection to the database is established and stored as conn
    const query = `SELECT Population FROM ${Country} WHERE Name = ? and code = ?`;
    conn.query(query, [name, code], function (err, result) {
        if (err) return cb(err);
        if (result.length == 0) return cb(new Error("Not found"));
        cb(null, result[0].Population);
    });
}
