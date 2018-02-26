"use strict";

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/todo_app");

const DB = mongoose.connection;
DB.on("error", err => {
    console.log(`Connection error: ${err}`)
});

DB.once("open", () => {
    console.log("Connection to database successful");
});


module.exports = mongoose;
