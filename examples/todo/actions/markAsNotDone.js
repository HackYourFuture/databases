const Todo = require('../models/todo')
const deserializeTodo = require('../util/deserializeTodo')

module.exports = function markAsNotDone(request, response) {

  const id = request.params.id

  const action = 'UPDATE `task` SET done=? WHERE id=?'
  const state = 0

  Todo.update(id, null, state, action, (error, todo) => {
    if (error == null) {
      response.json({todo})
    } else if (error.name === 'NotFound') {
      response.status(404)
      response.json({error: error.message})
    } else {
      console.error(error)
      response.status(500)
      response.json({error: 'Internal error'})
    }
  })
}
