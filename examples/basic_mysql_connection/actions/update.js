const dbConnect = require('../DB-connection/db-connect.js'),
    queries = require('./queries.js')

module.exports = function count(request, response) {
    dbConnect.connection
    .query("SELECT * FROM todos", (err, results, fields) => {
            try {
                response.render("../public/pages/update", { results })
                response.end()
            }
            catch(err){ throw err }
    })
}
