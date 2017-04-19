const dbConnect = require('../DB-connection/db-connect.js'),
    queries = require('./queries.js')

module.exports = function allDB(request, response) {
    dbConnect.connection
        .query(queries.allDB, (err, results, fields) => {

            try {
	            response.render("../public/pages/database", { results })
	            response.end()
            }
            catch(err){  throw 'err' }            
    })
}