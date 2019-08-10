var createError = require('http-errors');
const Queries = require('../../database/Queries');
const execQuery = require('../../database');

/**
 * @constructor Base constructor class
 */
class ICrudOperations {
  /**
   * @param {string} table Crud operations for specific table
   */
  constructor(table) {
    this.query = new Queries(table);
  }

  getAll = async (req, res, next) => {
    try {
      const result = await execQuery(this.query.crudQueries.selectAll());
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req, res, next) => {
    try {
      const { id } = req.params;
      const [item] = await execQuery(this.query.crudQueries.selectOne(), id);

      if (item == undefined) throw createError(404, `No entry found with id '${id}'`);

      res.json(item);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const columns = Object.keys(req.body);
      const values = Object.values(req.body);

      const [updatedItem] = await execQuery(this.query.crudQueries.selectOne(), id);

      if (updatedItem == undefined) throw createError(404, `No entry found with id '${id}'`);

      await execQuery(this.query.crudQueries.update(columns), [...values, ...id]);
      // If updated succeed send all list with updated item
      res.status(201);
      await this.getAll(req, res);
    } catch (error) {
      next(error);
    }
  };

  remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const [deletedItem] = await execQuery(this.query.crudQueries.selectOne(), id[0]);

      if (deletedItem == undefined) throw createError(404, `No entry found with id '${id[0]}'`);

      await execQuery(this.query.crudQueries.deleteOne(), id[0]);
      res.status(200).json(`Entry with id ${id[0]} has been deleted succesfully`);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const columns = Object.keys(req.body);
      const values = Object.values(req.body);

      if (columns.length === 0) throw createError(400, `Please provide an object`);

      await execQuery(this.query.crudQueries.insert(columns), [values]);
      res.status(201);

      await this.getAll(req, res);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ICrudOperations;
