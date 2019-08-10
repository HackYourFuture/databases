const IPublicOperations = require('./operations/IPublicOperations');
const Queries = require('../database/Queries');
const execQuery = require('../database');
const faker = require('faker/locale/en');

// Basic CRUD queries for TODOS table
const { crudQueries } = new Queries('TODOS');

class TodosController extends IPublicOperations {
  constructor(table) {
    super(table);
  }

  // Custom query functions for TODOS table
  seedFake = async (req, res, next) => {
    try {
      const title = faker.hacker.noun();
      const description = faker.lorem.sentence(7);
      const tags = faker.lorem.word();

      await execQuery(crudQueries.insert(['title, description, tags']), [[title, description, tags]]);
      res.status(201);
      res.json(await this.getAll(req, res, next));
    } catch (error) {
      next(error);
    }
  };
}

const todosController = new TodosController('TODOS');

module.exports = todosController;
