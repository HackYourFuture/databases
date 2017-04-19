const dbConnect = require('../DB-connection/db-connect.js'),
    queries = require('./queries.js')


module.exports = function (request, response) {
	const data = {
        name: request.body.todoName,
		done: request.body.todoDone,
        due: request.body.todoDue,
        id: request.body.todoId
	}

	dbConnect.connection
        .query( queries.update, [data.name, data.done, data.due ,data.id] ,(err, results, fields) => {
            try {
            	response.render("../public/pages/update-data", { results })
                response.end()
            }
            catch(err){ throw err }   
    })
}