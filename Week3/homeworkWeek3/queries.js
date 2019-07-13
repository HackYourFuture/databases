const queries = require('./async_create_tables.js');

const tables = async function () {
    try {
        await queries.execQuery(`SHOW tables`);
    } catch (error) {
        console.log(error);
    }
}

const createUser = async function(id, user_name) {
    try {
         await queries.execQuery(`INSERT INTO user (id, user_name) VALUES(?, ?);`, 
         [id, user_name]);
      } catch (error) {
          console.log(error);
    }
};

const createTodoList = async function(id, todo_name, user_id) {
    try {
        await queries.execQuery(`INSERT INTO todo (id, todo_name, user_id) VALUES(?, ?, ?);`, 
        [id, todo_name, user_id]);
    } catch (error) {
        console.log(error);
    }
};

const createItem = async function(id, item_desc, todo_id, done) {
    try {
        await queries.execQuery(`INSERT INTO items(id, item_desc, todo_id, done) VALUES(? ,? , ?, ?);`, 
        [id, item_desc, todo_id, done]);
    } catch (error) {
        console.log(error);
    }
};

const deleteItem = async function(item_id) {
    try {
        await queries.execQuery(`DELETE FROM items WHERE id = ? ;`, [item_id]);
    } catch (error) {
        console.log(error);
    }
};

const deleteTodoList = async function(todo_id) {
    try {
        await queries.execQuery(`DELETE FROM todo WHERE id = ? ;`, [todo_id]);
    } catch (error) {
        console.log(error);
    }
    
};

const createReminder = async function(id, todo_id, time_reminder) {
    try {
        await queries.execQuery(`INSERT INTO reminder(id, todo_id, time_reminder) VALUES(?, ?, ?);`,
        [id, todo_id, time_reminder]);
    } catch (error) {
        console.log(error);
    }
};




module.exports = {
    tables: tables,
    createUser: createUser,
    createTodoList: createTodoList,
    createItem: createItem,
    deleteItem: deleteItem,
    deleteTodoList: deleteTodoList,
    createReminder: createReminder
};