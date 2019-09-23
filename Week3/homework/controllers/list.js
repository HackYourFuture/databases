'use-strict';

const db = require('../database/dbHandler');

class List {
  static async create(req, res) {
    if (!req.session.email) {
      return res.json('You should login again');
    }
    const userEmail = req.session.email;
    const userId = await db.getUserId(userEmail);

    const listName = req.body.listName;
    const reminderDate = req.body.reminderDate;

    await db.createList(userId, listName, reminderDate);
    res.json('The list is successfully created!');
  }
  static async delete(req, res) {
    if (!req.session.email) {
      return res.json('You should login again');
    }

    const userEmail = req.session.email;
    const userId = await db.getUserId(userEmail);

    const listName = req.body.listName;
    const listId = req.body.listId;

    await db.deleteList(listId, userId, listName);
    res.json('The list is successfully deleted!');
  }
}

module.exports = List;
