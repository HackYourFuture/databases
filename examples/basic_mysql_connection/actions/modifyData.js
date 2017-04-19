const dbConnect = require('../DB-connection/db-connect.js'),
    queries = require('./queries.js')


module.exports = function (request, response) {
	const data = {
		name: request.body.todoName,
		done: request.body.todoDone,
		due: request.body.todoDue
	}

	dbConnect.connection
        .query( queries.qInsert, [data.name, data.done, data.due] ,(err, results, fields) => {
            try {
            	response.render("../public/pages/modifyData", { results })
            	response.end()
            }
            catch(err){ throw err }   
    })
}