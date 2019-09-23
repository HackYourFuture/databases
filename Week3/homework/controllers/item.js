'use-strict';

const db = require('../database/dbHandler');

class Item {
  static async create(req, res) {
    if (!req.session.email) {
      return res.json('You should login again');
    }

    const userEmail = req.session.email;
    const userId = await db.getUserId(userEmail);

    const listId = req.body.listId;
    const itemName = req.body.itemName;
    const dueDate = req.body.dueDate;

    const isUserList = await db.validateListId(userId, listId);

    if (isUserList.length) {
      await db.createItem(userId, listId, itemName, dueDate);
      res.json('The item is successfully created!');
    } else {
      res.json('Bad request');
    }
  }
  static async delete(req, res) {
    const userEmail = req.session.email;
    const userId = await db.getUserId(userEmail);

    const listId = req.body.listId;
    const itemId = req.body.itemId;

    const isUserList = await db.validateListId(userId, listId);

    if (isUserList.length) {
      await db.deleteItem(itemId, listId, userId);
      res.json('The item is successfully deleted!');
    } else {
      res.json('Bad request');
    }
  }
  static async complete(req, res) {
    const userEmail = req.session.email;
    const userId = await db.getUserId(userEmail);

    const listId = req.body.listId;
    const itemId = req.body.itemId;

    const isUserList = await db.validateListId(userId, listId);

    if (isUserList.length) {
      const bool = req.method === 'POST' ? 1 : 0;
      const msg = req.method === 'POST' ? 'completed' : 'uncompleted';

      await db.completeItem(bool, itemId, listId, userId);
      res.json(`The item is successfully ${msg}!`);
    } else {
      res.json('Bad request');
    }
  }
}

module.exports = Item;
