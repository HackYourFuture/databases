const dbConnect = require('../DB-connection/db-connect.js'),
      queries = require('./queries.js')

module.exports = function all(request, response) {
    dbConnect.connection()
    .query(queries.all, (err, results, fields) => {
        if (err) throw err

        response.send(JSON.stringify(results))
        response.end()
    })

    dbConnect.connection().end()
}