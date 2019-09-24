/* eslint-disable require-atomic-updates */
'use-strict';

const pool = require('../database/connection').pool;

class DB {
  static async findUser(email, password) {
    const q = 'SELECT * FROM user WHERE email=?';
    const result = await pool.query(q, [email, password]);
    const resultObj = JSON.parse(JSON.stringify(result));

    if (resultObj.length) {
      const emailRes = email === resultObj[0].email ? email : 'not registered';
      const passRes = password === resultObj[0].password ? password : 'not found';
      const userName = resultObj[0].name;
      const userId = resultObj[0].id;
      const userRegisteredTime = resultObj[0].registeredtime;
      return { emailRes, passRes, userName, userId, userRegisteredTime };
    }
    return 'not registered';
  }

  static async addUser(name, email, password) {
    const q = 'INSERT INTO user SET name=?, email=?, password=?';
    await pool.query(q, [name, email, password]);
  }

  static async getUserId(userEmail) {
    const userSql = `SELECT id FROM user WHERE email=? `;
    const Id = await pool.query(userSql, [userEmail]);
    const userId = JSON.parse(JSON.stringify(Id[0].id));
    return userId;
  }

  static async createList(userId, listName, reminderDate) {
    const q = 'INSERT INTO list SET userId=?, listname=?, reminderdate=?';
    await pool.query(q, [userId, listName, reminderDate]);
  }

  static async validateListId(userId, listId) {
    const validateListid = `SELECT id FROM list WHERE userId=? && id=?`;
    const result = await pool.query(validateListid, [userId, listId]);
    const resultObj = JSON.parse(JSON.stringify(result));
    return resultObj;
  }
  static async deleteList(listId, userId, listName) {
    const q = 'DELETE FROM list WHERE id=? AND userId=? AND listname=?';
    await pool.query(q, [listId, userId, listName]);
  }

  static async createItem(userId, listId, itemName, dueDate) {
    const q = `INSERT INTO item SET userId=?, listId=?, itemname=?, duedate=?`;
    await pool.query(q, [userId, listId, itemName, dueDate]);
  }

  static async getItems(id) {
    const q = `
        SELECT l.id LIST_ID, l.listname LIST_NAME,
        l.reminderdate REMIND_ME, i.id ITEM_ID, i.itemname ITEM_NAME, 
        i.duedate DUE_DATE, i.completed IS_COMPLETED 
        FROM item i
        RIGHT JOIN list l
          ON i.listId = l.id
        WHERE l.userId=? 
        ORDER BY l.id        
        `;
    const items = await pool.query(q, [id]);
    return items;
  }

  static async deleteItem(itemId, listId, userId) {
    const q = `DELETE FROM item WHERE id=? AND listId=? AND userId=?`;
    await pool.query(q, [itemId, listId, userId]);
  }

  static async completeItem(bool, itemId, listId, userId) {
    const q = `UPDATE item SET completed = ${bool} WHERE id=? AND listId=? AND userId=?`;
    await pool.query(q, [itemId, listId, userId]);
  }
}

module.exports = DB;
