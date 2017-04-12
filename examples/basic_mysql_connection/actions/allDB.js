const dbConnect = require('../DB-connection/db-connect.js'),
    queries = require('./queries.js')

module.exports = function allDB(request, response) {
    dbConnect.connection()
        .query(queries.allDB, (err, results, fields) => {
            if (err) throw err

            response.render("../public/pages/database", { results })
            response.end()
        })

    dbConnect.connection().end()
}
