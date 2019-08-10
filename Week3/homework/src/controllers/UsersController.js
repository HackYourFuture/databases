const IPublicOperations = require('./operations/IPublicOperations');
const Queries = require('../database/Queries');
const execQuery = require('../database');
const faker = require('faker/locale/en');

// Queries for USERS table
const { userQueries, crudQueries } = new Queries('USERS');

class UsersController extends IPublicOperations {
  constructor(table) {
    super(table);
  }

  // Custom query functions for USERS table
  getUserTodos = async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await execQuery(userQueries.selectUserTodos(), id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getDetailedUsers = async (req, res, next) => {
    try {
      const { id } = req.params;
      const details = await execQuery(userQueries.selectDetailedUsers());

      let userId = [];

      const result = details.reduce((arr, detail) => {
        const { id: _id, name, surname, email, title, description, tags, is_done, deadline, remind_date } = detail;
        const todoObj = { title, description, tags, is_done, deadline, remind_date };
        const userObj = { id: _id, name, surname, email, todos: [] };

        if (!userId.includes(_id)) {
          userId.push(_id);
          userObj.todos.push(todoObj);
          arr.push(userObj);
          return arr;
        }

        arr.forEach(user => {
          if (user.id === _id) {
            user.todos.push(todoObj);
          }
        });

        return arr;
      }, []);

      if (id === 'all') return res.json(result);
      if (id) return res.json(result.filter(user => user.id === Number(id)));
    } catch (error) {
      next(error);
    }
  };

  seedFake = async (req, res, next) => {
    try {
      const name = faker.name.firstName();
      const surname = faker.name.lastName();
      const email = faker.internet.email();

      await execQuery(crudQueries.insert(['name, surname, email']), [[name, surname, email]]);
      res.status(201);
      res.json(await this.getAll(req, res, next));
    } catch (error) {
      next(error);
    }
  };
}

const usersController = new UsersController('USERS');

module.exports = usersController;
