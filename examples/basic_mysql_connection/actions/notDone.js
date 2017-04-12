const dbConnect = require('../DB-connection/db-connect.js'),
    queries = require('./queries.js')

module.exports = function notDone(request, response) {
    dbConnect.connection()
        .query(queries.notDone, (err, results, fields) => {
            if (err) throw err

            response.render("../public/pages/notDone", {
                results
            })
            response.end()
        })

    dbConnect.connection().end()
}
