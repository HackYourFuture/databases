const util = require('util');
const mysql = require('mysql');
//const uuidv4 = require('uuid-v4');//new id

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'ToDoDB'
});

const execQuery = util.promisify(connection.query.bind(connection));
let activeUserId = 1;

/**Category */
async function listCategory() {
  let queryWhere = " where id in (select categoryId from userscatalogs where userid = " + activeUserId + ")";
  const categList = await getResult('categories', queryWhere);
  return '' + JSON.stringify(categList);
}
async function createCategory(name) {
  //uuidv4()
  const id = await getLastId('categories');
  let query = "insert into categories values (" + id + ", '" + name + "')";
  await executeQuery(query);
  //When category is created, relation of user & category is also created.
  await createUsersCatalogs(activeUserId, id, true, true);
  return name + ' ==> New category is created.';
}
async function updateCategory(id, newName) {
  let query = "update categories set name = '" + newName + "' where id=" + id;
  await executeQuery(query);
  return newName + ' ==> is updated.';
}
async function deleteCategory(id) {
  //related records are deleted.
  const listIds = await getIdsListByCategoryId(id);
  await deleteToDoItemByLists(listIds);
  await deleteListByCategoryId(id);
  await deleteUsersCatalogsByCategoryId(id);

  let query = "delete from categories where id=" + id;
  await executeQuery(query);

  return id + ' is deleted.';
}/**Category */

/**Lists */
async function listLists() {
  const queryWhere = " where categoryId in (select categoryId from userscatalogs where userId = " + activeUserId + " and readright = true)";
  return await getResult('lists', queryWhere);
}
async function createList(name, categoryId, reminderId) {
  const id = await getLastId('lists');
  let query = "insert into lists values (" + id + ", '" + name + "'," + categoryId + "," + reminderId + ")";
  await executeQuery(query);
  return name + " is created.";
}
async function updateList(id, newName, categoryId, reminderId) {
  let query = "update lists set name = '" + newName + "', categoryId = " + categoryId + ", reminderId = " + reminderId + " where id=" + id;
  await executeQuery(query);
  return newName + " is updated.";
}
async function deleteList(id) {
  //related records are deleted
  await deleteToDoItemByLists([id]);

  let query = "delete from lists where id=" + id;
  await executeQuery(query);
  return id + " is deleted.";
}
async function getIdsListByCategoryId(categoryId) {
  const results = await getIds('lists', 'categoryId = ' + categoryId);
  const resultsArray = Object.keys(results).map(i => results[i].id);
  return resultsArray;
}
function deleteListByCategoryId(categoryId) {
  let query = "delete from lists where categoryId = " + categoryId;
  executeQuery(query);
}/**Lists */

/**Reminders */
async function listReminders() {
  return await getResult('reminders');
}
async function createReminder(name, reminderStartDate, reminderEndDate) {
  const id = await getLastId('reminders');
  let query = "insert into reminders values (" + id + ", '" + name + "','" + reminderStartDate + "','" + reminderEndDate + "')";
  await executeQuery(query);
  return name + "is created.";
}
async function updateReminder(id, newName, reminderStartDate, reminderEndDate) {
  let query = "update reminders set name = '" + newName + "', reminderStartDate = '" + reminderStartDate + "', reminderEndDate = '" + reminderEndDate + "' where id=" + id;
  await executeQuery(query);
  return id + " is updated.";
}
async function deleteReminder(id) {
  let query = "delete from reminders where id=" + id;
  await executeQuery(query);
  return id + " is deleted.";
}/**Reminders */

/**Tags */
async function listTags() {
  return await getResult('tags');
}
async function createTags(name) {
  const id = await getLastId('tags');
  let query = "insert into tags values (" + id + ", '" + name + "')";
  await executeQuery(query);
  return name + "is created.";
}
async function updateTags(id, newName) {
  let query = "update tags set name = '" + newName + "' where id=" + id;
  await executeQuery(query);
  return id + " is updated.";
}
async function deleteTags(id) {
  let query = "delete from tags where id=" + id;
  await executeQuery(query);
  return id + " is deleted.";
}/**Tags */

/**Users */
async function listUsers() {
  return await getResult('users');
}
async function createUser(name, surname, username, password, email, tel) {
  const id = await getLastId('users');
  let query = "insert into users values (" + id + ", '" + name + "','" + surname + "','" + username + "','" + password + "','" + email + "','" + tel + "')";
  await executeQuery(query);
  return name + " " + surname + " is created.";
}
async function updateUser(id, newName, newSurname, newUsername, newPassword, newEmail, newTel) {
  let query = "update users set name = '" + newName + "', surname = '" + newSurname + "', password = '" + newPassword + "', email = '" + newEmail + "', tel = '" + newTel + "' where id=" + id;
  await executeQuery(query);
  return id + " is updated.";
}
async function deleteUser(id) {
  //related data is deleted;
  await deleteUsersCatalogsByUserId(id);

  let query = "delete from users where id=" + id;
  await executeQuery(query);
  return id + " is deleted.";
}/**Users */

/**ToDoItems */
async function listToDoItems() {
  return await getResult('todoitems');
}
async function createToDoItem(name, description, listId, isCompleted, tagId) {
  const id = await getLastId('todoitems');
  let query = "insert into todoitems values (" + id + ", '" + name + "','" + description + "'," + listId + ", " + isCompleted + ", " + tagId + ")";
  await executeQuery(query);
  return name + " is created.";
}
async function updateToDoItem(id, newName, description, listId, isCompleted, tagId) {
  let query = "update todoitems set name = '" + newName + "', description = '" + description + "', listId = " + listId + ", isCompleted = " + isCompleted + ", tagId = " + tagId + " where id=" + id;
  await executeQuery(query);
  return id + " is updated.";
}
async function deleteToDoItem(id) {
  let query = "delete from todoitems where id=" + id;
  await executeQuery(query);
  return id + " is deleted.";
}
async function deleteToDoItemByLists(ListArrayIds) {
  for (let listId of ListArrayIds) {
    let query = "delete from todoitems where listId =" + listId;
    await executeQuery(query);
  }
  return
}/**ToDoItems */

/**userscatalogs */
async function listUsersCatalogs() {
  return await getResult('userscatalogs');
}
async function createUsersCatalogs(userId, categoryId, readRight, writeRight) {
  const id = await getLastId('userscatalogs');
  let query = "insert into userscatalogs values (" + id + ", " + userId + "," + categoryId + "," + readRight + ", " + writeRight + ")";
  await executeQuery(query);
  return userId + " is created.";
}
async function updateUsersCatalogs(id, userId, categoryId, readRight, writeRight) {
  let query = "update userscatalogs set userId = " + userId + ", categoryId = " + categoryId + ", readRight = " + readRight + ", writeRight = " + writeRight + " where id=" + id;
  await executeQuery(query);
  return id + " is updated.";
}
async function deleteUsersCatalogsByCategoryId(categoryId) {
  let query = "delete from userscatalogs where categoryId=" + categoryId;
  await executeQuery(query);
}
async function deleteUsersCatalogsByUserId(userId) {
  let query = "delete from userscatalogs where userId = " + userId;
  await executeQuery(query);
}

async function deleteUsersCatalogs(id) {
  let query = "delete from userscatalogs where id=" + id;
  await executeQuery(query);
  return id + " is deleted.";
}/**userscatalogs */

async function executeQuery(query) {

  try {
    //connection.connect();
    console.log(query);
    await execQuery(query);
  } catch (error) {
    console.log(error);
    connection.rollback(function () {
      throw err;
    });
    //connection.end();
  }
  console.log("Query is worked: " + query);
  //connection.end();
}

async function getLastId(table) {
  try {
    let query = "SELECT MAX(Id) as lastId FROM " + table;
    const results = await execQuery(query);
    return results[0].lastId.valueOf() + 1;
  } catch (err) {
    console.log(err);
  }
}
async function getResult(table, queryWhere) {
  if (queryWhere === undefined) {
    queryWhere = "";
  }
  let query = "select * from " + table + queryWhere;
  const results = await execQuery(query);
  //const resultsArray = Object.keys(results).map(i => JSON.parse(results[i]));
  console.log(results);
  return results;
}
async function getIds(table, whereConstraints) {
  let query = "select id from " + table + " where " + whereConstraints;
  const results = await execQuery(query);

  return results;
}

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategory,
  listLists,
  createList,
  updateList,
  deleteList,
  listReminders,
  createReminder,
  updateReminder,
  deleteReminder,
  listTags,
  createTags,
  updateTags,
  deleteTags,
  listUsers,
  createUser,
  updateUser,
  deleteUser,
  listToDoItems,
  createToDoItem,
  updateToDoItem,
  deleteToDoItem,
  listUsersCatalogs,
  createUsersCatalogs,
  updateUsersCatalogs,
  deleteUsersCatalogs
};