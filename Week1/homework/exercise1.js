import mysql from "mysql";
import { tables, values } from "./data.js";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'meetup'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected..');
});

//Create Tables
const createTables = (table) => {
    connection.query(table, (err, result) => {
        if (err) throw err;
        console.log("table is added");
    });
};

//Adding Values
const addingValues = (value) => {
    connection.query(value, (err, result) => {
        if (err) throw err;
        console.log("value is added");
    });
};

const dropTables = () => {
    const sql = `DROP TABLE Room , Meeting , Invitee`;
  
    connection.query(sql, (err, result) => {
      if (err) console.log(err);
  
      console.log("Tables Droped");
    });
  };
  dropTables();
tables.forEach(table => createTables(table));
values.forEach(value => addingValues(value)); 