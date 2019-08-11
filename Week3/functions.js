const { execQuery } = require('./database');
const { isInputValid } = require('./validate');

async function showRecords(path) {
  try {
    const table = path.substring(1);
    return await execQuery(`SELECT * FROM ${table}`);
  } catch (error) {
    return error.message;
  }
}

async function showRecordById(path, id) {
  try {
    let result;
    path = path.substring(1);
    const table = path.split('/', 1);
    result = await execQuery(`SELECT * FROM ${table} WHERE ${table}.ID = ?`, [id]);
    if (result.length == 0) result = 'There is no such id=' + id;
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function createUser(request) {
  try {
    const checkerMessage = isInputValid(request);
    if (checkerMessage === true) {
      const promises = await request.body.user.map(async user => {
        await execQuery('INSERT INTO user SET ?', user);
        const rows = await execQuery('SELECT * FROM user WHERE Name = ? AND Email = ?', [
          user.Name,
          user.Email,
        ]);
        return rows[0];
      });
      return await Promise.all(promises);
    } else return checkerMessage;
  } catch (error) {
    console.error(error);
  }
}

async function createTodoList(request) {
  try {
    const checkerMessage = isInputValid(request);
    if (checkerMessage === true) {
      const promises = request.body.todolist.map(async list => {
        await execQuery('INSERT INTO todolist SET ?', list);
        const rows = await execQuery('SELECT * FROM todolist WHERE Name = ? AND User_ID = ?', [
          list.Name,
          list.User_ID,
        ]);
        return rows[0];
      });
      return await Promise.all(promises);
    } else return checkerMessage;
  } catch (error) {
    console.error(error);
  }
}

async function createTodoItem(request) {
  try {
    const checkerMessage = isInputValid(request);
    if (checkerMessage === true) {
      const todoitem = [];
      const listitem = [];

      const promises = request.body.todoitem.map(async (item, index) => {
        todoitem.push({ Description: item.Description });
        await execQuery('INSERT INTO todoitem SET ?', todoitem[index]);
        let todoID = await execQuery('SELECT todoitem.ID FROM todoitem where Description = ?', [
          item.Description,
        ]);
        listitem.push({
          List_ID: item.List_ID,
          Item_ID: todoID[0].ID,
          IsCompleted: 'F',
        });
        await execQuery('INSERT INTO listitem SET ?', listitem[index]);
        const rows = await execQuery(
          'SELECT todoitem.ID, todoitem.Description FROM todoitem JOIN listitem ON todoitem.Description = ? AND listitem.List_ID = ? GROUP BY todoitem.ID',
          [item.Description, item.List_ID],
        );
        return rows[0];
      });
      return await Promise.all(promises);
    } else return checkerMessage;
  } catch (error) {
    console.error(error);
  }
}

async function createReminder(request) {
  try {
    const checkerMessage = isInputValid(request);
    if (checkerMessage === true) {
      const promises = await request.body.reminder.map(async reminder => {
        await execQuery('INSERT INTO reminder SET ?', reminder);
        const rows = await execQuery(
          'SELECT * FROM reminder WHERE Date = ? AND Notification = ? AND List_ID = ?',
          [reminder.Date, reminder.Notification, reminder.List_ID],
        );
        return rows[0];
      });
      return await Promise.all(promises);
    } else return checkerMessage;
  } catch (error) {
    console.error(error);
  }
}

async function createTag(request) {
  try {
    const checkerMessage = isInputValid(request);
    if (checkerMessage === true) {
      const tagArr = [];
      const itemtag = [];

      const promises = request.body.tag.map(async (tag, index) => {
        tagArr.push({ Name: tag.Name });
        await execQuery('INSERT INTO tag SET ?', tagArr[index]);
        let tagID = await execQuery('SELECT tag.ID FROM tag where Name = ?', [tag.Name]);
        itemtag.push({
          Item_ID: tag.Item_ID,
          Tag_ID: tagID[0].ID,
        });
        await execQuery('INSERT INTO itemtag SET ?', itemtag[index]);
        const rows = await execQuery(
          'SELECT tag.ID, tag.Name FROM tag JOIN itemtag ON tag.Name = ? AND itemtag.Item_ID = ? GROUP BY tag.ID',
          [tag.Name, tag.Item_ID],
        );
        return rows[0];
      });
      return await Promise.all(promises);
    } else return checkerMessage;
  } catch (error) {
    console.error(error);
  }
}

async function deleteUserById(id) {
  try {
    let result = await execQuery('SELECT * FROM user WHERE user.ID = ?', [id]);
    if (result.length == 0) {
      result = { Error: `There is no such ${id}!` };
    } else {
      await execQuery('DELETE FROM user WHERE user.ID = ?', [id]);
      await execQuery('DELETE FROM todolist WHERE todolist.User_ID = ?', [id]);
    }
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function deleteTodoListById(id) {
  try {
    let result = await execQuery('SELECT * FROM todolist WHERE todolist.ID = ?', [id]);
    if (result.length == 0) {
      result = { Error: `There is no such ${id}!` };
    } else {
      await execQuery('DELETE FROM todolist WHERE todolist.ID = ?', [id]);
      await execQuery('DELETE FROM reminder WHERE reminder.List_ID = ?', [id]);
      await execQuery('DELETE FROM listitem WHERE listitem.List_ID = ?', [id]);
    }
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function deleteTodoItemById(id) {
  try {
    let result = await execQuery('SELECT * FROM todoitem WHERE todoitem.ID = ?', [id]);
    if (result.length == 0) {
      result = { Error: `There is no such ${id}!` };
    } else {
      await execQuery('DELETE FROM listitem WHERE listitem.Item_ID = ?', [id]);
      await execQuery('DELETE FROM todoitem WHERE todoitem.ID = ?', [id]);
    }
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function deleteReminderById(id) {
  try {
    let result = await execQuery('SELECT * FROM reminder WHERE reminder.ID = ?', [id]);
    if (result.length == 0) {
      result = { Error: `There is no such ${id}!` };
    } else {
      await execQuery('DELETE FROM reminder WHERE reminder.ID = ?', [id]);
    }
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function deleteTagById(id) {
  try {
    let result = await execQuery('SELECT * FROM tag WHERE tag.ID = ?', [id]);
    if (result.length == 0) {
      result = { Error: `There is no such ${id}!` };
    } else {
      await execQuery('DELETE FROM itemtag WHERE itemtag.Tag_ID = ?', [id]);
      await execQuery('DELETE FROM tag WHERE tag.ID = ?', [id]);
    }
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function markItemWithListAsCompleted(request) {
  try {
    const checkerMessage = isInputValid(request);
    if (checkerMessage === true) {
      const promises = await request.body.listitem.map(async listitem => {
        await execQuery('INSERT INTO listitem SET ?', listitem);
        const rows = await execQuery('SELECT * FROM listitem WHERE List_ID = ? AND Item_ID = ?', [
          listitem.List_ID,
          listitem.Item_ID,
        ]);
        return rows[0];
      });
      return await Promise.all(promises);
    } else return checkerMessage;
  } catch (error) {
    console.error(error);
  }
}

async function markItemAsCompletedById(id) {
  try {
    let result = await execQuery('SELECT * FROM listitem WHERE listitem.Item_ID = ?', [id]);
    if (result.length == 0) {
      result = { Error: `There is no such ${id}!` };
    } else {
      await execQuery("UPDATE listitem SET IsCompleted = 'T' WHERE listitem.Item_ID = ?", [id]);
      result = await execQuery('SELECT * FROM listitem WHERE listitem.Item_ID = ?', [id]);
    }
    return result;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  showRecords,
  showRecordById,
  createUser,
  createTodoList,
  createTodoItem,
  createReminder,
  createTag,
  deleteUserById,
  deleteTodoListById,
  deleteTodoItemById,
  deleteReminderById,
  deleteTagById,
  markItemWithListAsCompleted,
  markItemAsCompletedById,
};
