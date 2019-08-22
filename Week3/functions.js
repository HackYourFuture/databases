const util = require('util');
const mysql = require('mysql');
const {
  listsByUserId,
  listsAndToDosByUserId,
  allDoneToDosByUserId,
  remindersByUserId,
  s_Id_Todos_Desc,
  s_lId_listsTodos_lIdTdId,
  s_lId_listsTodos_TId,
  s_Id_users_uName,
  s_Id_lists_nameUId,
  s_todoId_listsTodos_lId,
  s_lId_listsTodos_tId,
  i_todos_S,
  i_listsTodos_S,
  i_lists_S,
  d_listsTodos_lId,
  d_todos_Id,
  d_lists_Id,
  d_listsTodos_lIdTId,
  u_listsTodos_tIdLId,
  u_listsTodos_reminder_tIdLId,
} = require('./queries.js');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todoapp',
});

const execQuery = util.promisify(connection.query.bind(connection));

function checkRequest(reqBody) {
  if (!reqBody.list || !reqBody.user || !reqBody.todo || Object.keys(reqBody).length !== 3) {
    return false;
  }
}

async function checkUser(reqBody) {
  const userId = await execQuery(s_Id_users_uName, [reqBody.user]);
  if (userId[0] === undefined) throw new Error('no such user');
  reqBody.list.user_id = userId[0].id;
}

async function isListExist(list) {
  return new Promise(async (resolve, reject) => {
    const listId = await execQuery(s_Id_lists_nameUId, [list.name, list.user_id]);
    if (listId[0] === undefined) {
      resolve(false);
    }
    resolve(listId);
  });
}

async function writeToDo(toDoArray, listId) {
  return new Promise(async (resolve, reject) => {
    try {
      const insertedItems = toDoArray.map(async function(element) {
        let todoId = await execQuery(s_Id_Todos_Desc, [element.description]);
        if (todoId[0] === undefined) {
          await execQuery(i_todos_S, element);
          todoId = await execQuery(s_Id_Todos_Desc, [element.description]);
        }
        return [todoId[0].id, element.description];
      });
      toDoIds = await Promise.all(insertedItems);
      const insertPromises = toDoIds.map(async function(element) {
        const result = {};
        const isAlready = await execQuery(s_lId_listsTodos_lIdTdId, [listId, element[0]]);
        if (!isAlready[0]) {
          insertion = { list_id: listId, todo_id: element[0] };
          await execQuery(i_listsTodos_S, insertion);
          result.description = `${element[1]}`;
          result.status = 'added';
          return result;
        }
        result.description = `${element[1]}`;
        result.status = 'already exists in the list';
        return result;
      });
      const result = await Promise.all(insertPromises);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

async function createToDo(reqBody) {
  try {
    await checkUser(reqBody);
    const listId = await isListExist(reqBody.list);
    if (!listId) {
      const err = new Error('no such list');
      console.error(err);
      return err.message;
    }
    return await writeToDo(reqBody.todo, listId[0].id);
  } catch (error) {
    return error;
  }
}
async function createList(reqBody) {
  try {
    await checkUser(reqBody);
    let listId = await isListExist(reqBody.list);
    if (!listId) {
      await execQuery(i_lists_S, reqBody.list);
      return `{list_name: ${reqBody.list.name}, process: created}`;
    } else {
      return `{list_name: ${reqBody.list.name}, process: exists}`;
    }
  } catch (err) {
    return err.message;
  }
}

async function deleteList(reqBody) {
  try {
    if (checkRequest(reqBody) === false) {
      return 'BAD REQUEST';
    }
    await checkUser(reqBody);
    const findList = await isListExist(reqBody.list);
    if (findList[0] === undefined) {
      const falseList = {
        list: { name: reqBody.list.name, warn: 'there is no such list' },
      };
      return falseList;
    }
    const listId = findList[0].id;
    const listItems = await execQuery(s_todoId_listsTodos_lId, [listId]);
    await execQuery(d_listsTodos_lId, [listId]);
    listItems.forEach(async function(element) {
      const isBelongs = await execQuery(s_lId_listsTodos_tId, [element.todo_id]);
      if (!isBelongs[0]) {
        await execQuery(d_todos_Id, [element.todo_id]);
      }
    });
    await execQuery(d_lists_Id, listId);
    const deletedList = {
      list: { name: reqBody.list.name, action: 'deleted' },
    };
    return deletedList;
  } catch (err) {
    console.error(err);
    return `sth went wrong. list is not deleted`;
  }
}

async function deleteToDo(reqBody) {
  try {
    await checkUser(reqBody);
    const findList = await isListExist(reqBody.list);
    if (findList === false) {
      const falseList = {
        list: { name: reqBody.list.name, warn: 'there is no such list' },
      };
      return falseList;
    }
    const listId = findList[0].id;
    const toDoIdPromises = reqBody.todo.map(async function(element) {
      const id = await execQuery(s_Id_Todos_Desc, [element.description]);
      if (id[0] === undefined) {
        const falseDesc = { description: element.description, action: null, warn: 'no such todo' };
        return falseDesc;
      }
      const isDeleted = await execQuery(d_listsTodos_lIdTId, [listId, id[0].id]);
      if (isDeleted.affectedRows === 0) {
        const falseToDo = {
          description: element.description,
          action: null,
          warn: 'doesnt belongs to list',
        };
        return falseToDo;
      }
      const isBelongsToOtherList = await execQuery(s_lId_listsTodos_TId, [id[0].id]);
      if (!isBelongsToOtherList[0]) {
        await execQuery(d_todos_Id, [id[0].id]);
      }
      const deletedToDo = {
        description: element.description,
        action: 'deleted',
      };
      return deletedToDo;
    });
    toDoIds = await Promise.all(toDoIdPromises);
    return toDoIds;
  } catch (err) {
    console.error(err);
    return `sth went wrong. list is not deleted`;
  }
}

async function markAsDone(reqBody) {
  if (checkRequest(reqBody) === false) {
    return 'BAD REQUEST';
  }
  await checkUser(reqBody);
  const findList = await isListExist(reqBody.list);
  if (findList[0] === undefined) {
    const falseList = {
      list: { name: reqBody.list.name, warn: 'there is no such list' },
    };
    return falseList;
  }
  const listId = findList[0].id;
  const toDoArrPromises = reqBody.todo.map(async function(element) {
    const result = { description: element.description, action: null, warn: null };
    const todoId = await execQuery(s_Id_Todos_Desc, [element.description]);
    if (todoId[0] === undefined) {
      (result.action = null), (result.warn = 'no such todo');
      return result;
    }
    const isDone = await execQuery(u_listsTodos_tIdLId, [todoId[0].id, listId]);
    if (isDone.changedRows === 0) {
      if (isDone.affectedRows === 1) {
        result.warn = 'todo is already done';
        return result;
      }
      result.warn = "doesn't belong to list";
      return result;
    } else if (isDone.changedRows === 1) {
      result.action = 'done';
      return result;
    }
  });
  const results = await Promise.all(toDoArrPromises);
  return results;
}

async function addReminder(reqBody) {
  try {
    if (checkRequest(reqBody) === false) {
      return 'BAD REQUEST';
    }
    await checkUser(reqBody);
    const findList = await isListExist(reqBody.list);
    if (findList[0] === undefined) {
      const falseList = {
        list: { name: reqBody.list.name, warn: 'there is no such list' },
      };
      return falseList;
    }
    const listId = findList[0].id;
    const dateRegEx = /^(((\d{4})(-)(0[13578]|10|12)(-)(0[1-9]|[12][0-9]|3[01]))|((\d{4})(-)(0[469]|1‌​1)(-)([0][1-9]|[12][0-9]|30))|((\d{4})(-)(02)(-)(0[1-9]|1[0-9]|2[0-8]))|(([02468]‌​[048]00)(-)(02)(-)(29))|(([13579][26]00)(-)(02)(-)(29))|(([0-9][0-9][0][48])(-)(0‌​2)(-)(29))|(([0-9][0-9][2468][048])(-)(02)(-)(29))|(([0-9][0-9][13579][26])(-)(02‌​)(-)(29)))(\s([0-1][0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9]))$/;
    if (!dateRegEx.test(reqBody.list.reminder)) {
      return 'date is not valid';
    }
    const isAdded = await execQuery(u_listsTodos_reminder_tIdLId, [reqBody.list.reminder, listId]);
    const result = {
      list: { name: reqBody.list.name, reminder: reqBody.list.reminder, warn: null },
    };
    if (isAdded.changedRows === 0) {
      result.list.warn = 'reminder was already set';
      return result;
    }
    return result;
  } catch (err) {
    console.error(err);
    return 'sth went wrong.';
  }
}

async function callSelectQuery(username, query) {
  return new Promise(async (resolve, reject) => {
    const userId = await execQuery(s_Id_users_uName, [username]);
    if (userId[0] === undefined) {
      reject(new Error('no such user'));
    }
    switch (query) {
      case 'myLists':
        results = await execQuery(listsByUserId, [userId[0].id]);
        result = results.map(el => el.name);
        resolve(result);
        break;
      case 'myTodos':
        rows = await execQuery(listsAndToDosByUserId, [userId[0].id]);
        results = rows.map(el => {
          const result = { description: el.description, list_name: el.name };
          return result;
        });
        resolve(results);
        break;
      case 'myDoneTodos':
        resolve(await execQuery(allDoneToDosByUserId, [1, userId[0].id]));
        break;
      case 'myReminders':
        resolve(await execQuery(remindersByUserId, [userId[0].id]));
        break;
      default:
        reject('impossible query');
    }
  });
}
module.exports = {
  createList,
  createToDo,
  deleteList,
  deleteToDo,
  markAsDone,
  addReminder,
  callSelectQuery,
};
