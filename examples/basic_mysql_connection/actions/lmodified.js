const dbConnect = require('../DB-connection/db-connect.js'),
    queries = require('./queries.js')

module.exports = function lModified(request, response) {

    dbConnect.connection.query(queries.lastAdded, (err, results, fields) => {
        try {
            response.render("../public/pages/lmodified", { results })
            response.end()
        } catch (err) { throw err }
    })
}