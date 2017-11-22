const Todo = require('../models/todo')
const deserializeTodo = require('../util/deserializeTodo')

module.exports = function markAsDone(request, response) {

	let id = request.params.id
	
	const action = 'UPDATE `task` SET done=? WHERE id=?'
	const state = 1
	
	Todo.update(id, null, state, action, (error, todo) => {
		if (error == null) {
			response.json({ todo })
		} else if (error.name === 'NotFound') {
			console.log(error)
			response.status(404)
			response.json({ error: error.message })
		} else {
			console.error(error)
			response.status(500)
			response.json({ error: 'Internal error' })
		}
	})
}
