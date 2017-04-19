const dbConnect = require('../DB-connection/db-connect.js'),
    queries = require('./queries.js')


module.exports = function (request, response) {
	dbConnect.connection
        .query( queries.delete, request.body.todoId ,(err, results, fields) => {
            try {
            	response.render("../public/pages/deleteSend", { results })
                response.end()
            }
            catch(err){ throw err }   
    })
}