"use strict";

const config = require("./config");

const express = require("express");
const app = express();
const PORT = 8000;

const bodyParser = require("body-parser");
const mysql = require("mysql");

const DB = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: "todo_app"
});


DB.connect(err => {
    if (err) {
        console.error(`Error connecting: ${err.stack}`);
        return;
    }
    console.log(`Connected as id ${DB.threadId}`);   
});


// CREATE a new todo item
app.post("/todo-api/create", (req, res) => {
    const createTodo = "INSERT INTO todo_items(text, user_id) VALUES(?, ?)";
    const values = [req.body.description, req.body.userId];

    DB.query(createTodo, values, (err, results, fields) => {
        if (err) {
            res.status(404).json({ success: false, error: err.message });
        }
        else {
            res.json({ success: true, message: "new todo item created" });
        }
    });
});


// UPDATE a todo item
app.put("/todo-api/update", (req, res) => {
    const updateTodo = "UPDATE todo_items SET text = ? WHERE id = ?";
    const values = [req.body.description, req.body.todoId];

    DB.query(updateTodo, values, (err, results, fields) => {
        if (err) {
            res.status(404).json({ success: false, error: err.message });
        }
        else {
            res.json({ success: true, message: "todo item updated" });
        }
    });
});


// DELETE a todo item
app.delete("/todo-api/delete", (req, res) => {
    const deleteTodo = "DELETE FROM todo_items WHERE id = ?";
    const values = [req.body.todoId];

    DB.query(deleteTodo, values, (err, results, fields) => {
        if (err) {
            res.status(404).json({ success: false, error: err.message });
        }
        else {
            res.json({ success: true, message: "todo item deleted" });
        }
    });
});


// TAG a todo item
app.post("/todo-api/tag", (req, res) => {
    const tagTodo = "INSERT INTO todo_item_tag(todo_item_id, tag_id) VALUES(?, ?)";
    const values = [req.body.todoId, req.body.tagId];

    DB.query(tagTodo, values, (err, results, fields) => {
        if (err) {
            res.status(404).json({ success: false, error: err.message });
        }
        else {
            res.json({ success: true, message: "new tag added to todo item" });
        }
    });
});


// UNTAG a todo item
app.put("/todo-api/untag", (req, res) => {
    const untagTodo = "DELETE FROM todo_item_tag WHERE todo_item_id = ? AND tag_id = ?";
    const values = [req.body.todoId, req.body.tagId];

    DB.query(untagTodo, values, (err, results, fields) => {
        if (err) {
            res.status(404).json({ success: false, error: err.message });
        }
        else {
            res.json({ success: true, message: "tag removed from todo item" });
        }
    });
});


// MARK a todo item as COMPLETED
app.put("/todo-api/mark-completed", (req, res) => {
    const markTodoCompleted = "UPDATE todo_items SET is_completed = TRUE WHERE id = ?";
    const values = [req.body.todoId];

    DB.query(markTodoCompleted, values, (err, results, fields) => {
        if (err) {
            res.status(404).json({ success: false, error: err.message });
        }
        else {
            res.json({ success: true, message: "todo item marked as completed" });
        }
    });
});


app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
