const IPublicOperations = require('./operations/IPublicOperations');
const Queries = require('../database/Queries');
const execQuery = require('../database');

// Queries for todo_list table
const { todoListQueries, crudQueries } = new Queries('TODO_LISTS');

class TodoListsController extends IPublicOperations {
  constructor(table) {
    super(table);
  }

  // Custom query functions for todo_lists table
  setDone = async (req, res, next) => {
    try {
      const { id, status } = req.params;

      if (status === 'done') await execQuery(todoListQueries.updateDone(1), id);
      if (status === 'undone') await execQuery(todoListQueries.updateDone(0), id);

      res.status(201);
      res.json('Updated!');
    } catch (error) {
      next(error);
    }
  };
}

const todoListsController = new TodoListsController('TODO_LISTS');

module.exports = todoListsController;
