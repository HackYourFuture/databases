const dbConnect = require('../DB-connection/db-connect.js'),
      queries = require('./queries.js')

module.exports = function done(request, response) {
    dbConnect.connection()
        .query(queries.done, (err, results, fields) => {
            if (err) throw err
            
            response.send(results)
            response.end()
        })

    dbConnect.connection().end()
}