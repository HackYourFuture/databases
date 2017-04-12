const dbConnect = require('../DB-connection/db-connect.js'),
    queries = require('./queries.js')

module.exports = function count(request, response) {
    dbConnect.connection()
        .query(queries.count, (err, results, fields) => {
            if (err) throw err
            var results = JSON.stringify(results[0].total)
            response.render("../public/pages/count", { results })
            response.end()
        })

    dbConnect.connection().end()
}
