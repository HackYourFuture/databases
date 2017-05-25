const dbConnect = require('../DB-connection/db-connect.js'),
    queries = require('./queries.js')

module.exports = function recent(request, response) {
    dbConnect.connection
        .query(queries.recent, (err, results, fields) => {
            try {
            	response.render("../public/pages/recent", { results })
            	response.end()
            }
            catch (err) { throw err }
    })
}