/* eslint-disable require-atomic-updates */
'use-strict';

const db = require('../database/dbHandler');

class Item {
  static async create(req, res) {
    if (!req.session.email) {
      return res.json('You should login again');
    }

    const userEmail = req.session.email;
    const userId = await db.getUserId(userEmail);

    const { listId, itemName, dueDate } = req.body;

    const isUserList = await db.validateListId(userId, listId);

    if (isUserList.length) {
      await db.createItem(userId, listId, itemName, dueDate);
      req.session.msg = 'The item is successfully created!';
      return res.redirect('/');
    }
    return res.json('Bad request');
  }
  static async delete(req, res) {
    const userEmail = req.session.email;
    const userId = await db.getUserId(userEmail);

    const { listId, itemId } = req.body;

    const isUserList = await db.validateListId(userId, listId);

    if (isUserList.length) {
      await db.deleteItem(itemId, listId, userId);
      req.session.msg = 'The item is successfully deleted!';
      return res.redirect('/');
    }
    return res.json('Bad request');
  }
  static async complete(req, res) {
    const userEmail = req.session.email;
    const userId = await db.getUserId(userEmail);

    const { listId, itemId } = req.body;

    const isUserList = await db.validateListId(userId, listId);

    if (isUserList.length) {
      const bool = req.method === 'POST' ? 1 : 0;
      const msg_ = req.method === 'POST' ? 'completed' : 'uncompleted';

      await db.completeItem(bool, itemId, listId, userId);
      req.session.msg = `The item is successfully ${msg_}!`;
      return res.redirect('/');
    }
    return res.json('Bad request');
  }
}

module.exports = Item;
