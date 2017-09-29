const Todo = require('../models/todo')

module.exports = function clear(request, response) {

  const id = null
  
  const action = 'TRUNCATE TABLE `task`'
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
