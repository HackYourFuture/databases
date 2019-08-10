var createError = require('http-errors');
const ICrudOperations = require('./ICrudOperations');
const execQuery = require('../../database');

/**
 * @constructor
 */
class IPublicOperations extends ICrudOperations {
  constructor(query) {
    super(query);
  }

  createMultiple = async (req, res, next) => {
    try {
      const body = req.body;

      const insertPromises = body.map(async todo => {
        const columns = Object.keys(todo);
        const values = Object.values(todo);

        if (columns.length === 0) throw createError(400, `Please provide an object`);

        return await execQuery(this.query.crudQueries.insert(columns), [values]);
      });

      await Promise.all(insertPromises);
      res.status(201);

      await this.getAll(req, res);
    } catch (error) {
      next(error);
    }
  };

  removeMultiple = async (req, res, next) => {
    try {
      const ids = req.params.id.split('|');

      const deletePromises = ids.map(async id => {
        const [deletedItem] = await execQuery(this.query.crudQueries.selectOne(), id);

        if (deletedItem == undefined) throw createError(404, `No entry found with id '${id}'`);

        return await execQuery(this.query.crudQueries.deleteOne(), id);
      });

      await Promise.all(deletePromises);
      res.status(200).json(`Entry with ids ${ids} has been deleted succesfully`);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = IPublicOperations;
