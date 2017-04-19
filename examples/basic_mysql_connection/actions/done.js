const dbConnect = require('../DB-connection/db-connect.js'),
    queries = require('./queries.js')

module.exports = function done(request, response) {
    dbConnect.connection
        .query(queries.done, (err, results, fields) => {
           
           try {
           	response.render("../public/pages/done", { results })
            response.end()
           }
           catch(err){ throw err }
    })
}