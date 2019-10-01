'use strict';

const Express = require('express');
const router = Express.Router();
const validator = require('./validator');
const { validationResult } = require('express-validator/check');
const {
  userList,
  complete,
  deleteItem,
  getItems,
  createItem,
  deleteList,
  validateListID,
  createList,
  userID,
  insertUser,
} = require('./query');

router
  .get('/', async (request, response) => {
    try {
      if (request.session.username) {
        const uid = await userID(request.session.username);
        request.session.items = await getItems(uid);
        const { message, items } = request.session;
        return response.status(200).json({ message, items });
      }
      if (request.session.message) {
        const { message } = request.session;
        return response.status(400).json({ message });
      }
      response.status(200).json('Please sign in');
    } catch (error) {
      console.log(error.message);
    }
  })

  .post('/register', validator.registration, async (request, response) => {
    try {
      const { name, username, password } = await request.body;
      const isExists = await userList(username, password);
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ error: errors.array() });
      }
      if (isExists.userCheck !== username && errors.isEmpty()) {
        await insertUser(name, username, password);
        request.session.message = 'user registered';
        request.session.username = username;
        return response.redirect('/');
      }
      request.session.message = 'username already registered';
      return response.redirect('/');
    } catch (error) {
      console.log(error.message);
    }
  })

  .post('/signin', validator.login, async (request, response) => {
    try {
      const { username, password } = await request.body;
      const users = await userList(username, password);

      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ error: errors.array() });
      }
      if (users.userCheck === username && users.passCheck === password && errors.isEmpty()) {
        request.session.username = users.userCheck;
        request.session.message = `Welcome ${users.name}`;
        return response.redirect('/');
      }
      response.json('Please sign in / sign up');
    } catch (error) {
      console.log(error.message);
    }
  })

  .get('/signout', async (request, response) => {
    try {
      if (request.session.username) {
        request.session.destroy();
        return response.redirect('/');
      }
      return response.redirect('/');
    } catch (error) {
      console.log(error.message);
    }
  })

  .post('/createList', async (request, response) => {
    try {
      if (!request.session.username) {
        return response.status(400).json('Please sign in firstly');
      }
      const username = request.session.username;
      const uid = await userID(username);
      const { description, reminder_date } = request.body;
      if (description && reminder_date) {
        await createList(uid, description, reminder_date);
        request.session.message = 'List created successfully';
        return response.redirect('/');
      }
      response.status(400).json("List couldn't created");
    } catch (error) {
      console.log(error.message);
    }
  })

  .post('/deleteList', async (request, response) => {
    try {
      if (!request.session.username) {
        return response.status(400).json('Please sign in');
      }
      const username = request.session.username;
      const uid = await userID(username);
      const { description, lid } = request.body;
      if (description && lid) {
        request.session.message = 'List deleted successfully';
        await deleteList(lid, uid, description);
        return response.redirect('/');
      }
      response.status(400).json("List couldn't deleted");
    } catch (error) {
      console.log(error.message);
    }
  })

  .post('/createItem', async (request, response) => {
    try {
      if (!request.session.username) {
        return response.status(400).json('Please sign in firstly');
      }
      const username = request.session.username;
      const uid = await userID(username);
      const { lid, description } = request.body;
      const isExists = await validateListID(uid, lid);
      if (isExists.length) {
        await createItem(uid, lid, description);
        request.session.message = 'Item created successfully';
        return response.redirect('/');
      }
      return response.status(400).json('Request not success.');
    } catch (error) {
      console.log(error.message);
    }
  })

  .post('/deleteItem', async (request, response) => {
    try {
      const username = request.session.username;
      const uid = await userID(username);
      const { lid, id } = request.body;
      const isExists = await validateListID(uid, lid);
      if (isExists.length) {
        await deleteItem(id, lid, uid);
        request.session.message = 'Item deleted successfully';
        return response.redirect('/');
      }
      return response.status(400).json('bad request');
    } catch (error) {
      console.log(error.message);
    }
  })

  .post('/itemCompleted', async (request, response) => {
    try {
      const username = request.session.username;
      const uid = await userID(username);
      const { lid, id } = request.body;
      const isExists = await validateListID(uid, lid);

      if (isExists.length) {
        await complete(id, lid, uid);
        request.session.message = 'item completed';
        return response.redirect('/');
      }
      return response.status(400).json('Request not success.');
    } catch (error) {
      console.log(error.message);
    }
  });

module.exports = router;
