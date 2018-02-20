"use strict";

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/app_db");

const db = mongoose.connection;
db.on("error", error => console.log(`Connection error: ${error}`));
db.once("open", () => {
    console.log("Connection to database successful");
});


module.exports = mongoose;
