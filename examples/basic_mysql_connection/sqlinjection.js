// This file demonstrates how `mysql.escape` changes a string to make it safe for a query
// Run with `node sqlinjection.js`
var mysql = require('mysql');

/*
In production, your `userInput` variable would probably be filled like this:
    var userInput = getUserInput();
But what if the user writes this string?
    "'; DROP TABLE todos;--"
*/

var userInput = "haha I hacked you'; DROP TABLE statuses;--";

console.log("Bare string: " + userInput);
console.log("Input escaped: " + mysql.escape(userInput));
console.log("Column name escaped: " + mysql.escapeId(userInput));
