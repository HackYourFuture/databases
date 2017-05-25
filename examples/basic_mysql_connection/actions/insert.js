const dbConnect = require('../DB-connection/db-connect.js')

module.exports = function insert(request, response) {
	try {
		response.render("../public/pages/insert")
    	response.end()
	}
    catch(err){ throw err }
}