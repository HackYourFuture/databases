const Todo = require('../models/todo')

module.exports = function remove(request, response) {

  const id = request.params.id
  
  const action = 'DELETE FROM `task` WHERE id=?'
  Todo.remove(id, action, error => {
    if (error) {
      console.error(error)
      response.status(500)
      response.json({error: 'Internal error'})
    } else {
      response.status(204)
      response.end()
    }
  })

}
