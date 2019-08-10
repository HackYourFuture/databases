const IPublicOperations = require('./operations/IPublicOperations');
const Queries = require('../database/Queries');
const execQuery = require('../database');
const faker = require('faker/locale/en');

// Queries for TODOS table
const { crudQueries } = new Queries('CATEGORIES');

class CategoriesController extends IPublicOperations {
  constructor(table) {
    super(table);
  }

  // Custom query functions for categories table
  seedFake = async (req, res, next) => {
    try {
      const title = faker.hacker.noun();

      await execQuery(crudQueries.insert(['title']), [[title]]);
      res.status(201);
      res.json(await this.getAll(req, res, next));
    } catch (error) {
      next(error);
    }
  };
}

const categoriesController = new CategoriesController('CATEGORIES');

module.exports = categoriesController;
