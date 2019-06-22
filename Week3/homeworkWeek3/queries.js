const queries = require('./async_create_tables.js');

const createUser = async function(id, user_name) {
    try {
         await queries.execQuery(`INSERT INTO user (id, user_name) VALUES(?, ?);`);
      } catch (error) {
          console.log(error);
    }
};

const createTodoList = async function(id, todo_name, user_id) {
    try {
        await queries.execQuery(`INSERT INTO todo (id, todo_name, user_id) VALUES(?, ?, ?);`);
    } catch (error) {
        console.log(error);
    }
};

const createItem = async function(id, item_disc, todo_id, done) {
    try {
        await queries.execQuery(`INSERT INTO items(id, item_disc, todo_id, done) VALUES(? ,? , ?, ?);`);
    } catch (error) {
        console.log(error);
    }
};

const deleteItem = async function(item_id) {
    try {
        await queries.execQuery(`DELETE FROM items WHERE id = ? ;`);
    } catch (error) {
        console.log(error);
    }
};

const deleteTodoList = async function(todo_id) {
    try {
        await queries.execQuery(`DELETE FROM todo WHERE id = ? ;`);
    } catch (error) {
        console.log(error);
    }
    
};

const createReminder = async function(id, todo_id, time_reminder) {
    try {
        await queries.execQuery(`INSERT INTO reminder(id, todo_id, time_reminder) VALUES(?, ?, ?);`);
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    createUser: createUser,
    createTodoList: createTodoList,
    createItem: createItem,
    deleteItem: deleteItem,
    deleteTodoList: deleteTodoList,
    createReminder: createReminder
};