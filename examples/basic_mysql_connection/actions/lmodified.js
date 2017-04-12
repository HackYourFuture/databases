const dbConnect = require('../DB-connection/db-connect.js'),
    queries = require('./queries.js')

module.exports = function lModified(request, response) {

    dbConnect.connection()
        .query(queries.lastAdded, (err, results, fields) => {
            if (err) throw err

            response.render("../public/pages/lmodified", {
                results
            })
            response.end()
        })

    dbConnect.connection().end()
}