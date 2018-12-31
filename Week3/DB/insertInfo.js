var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: 'todoDB'
});

var insert_queries = [
  "insert into Users values (1, 'Rabia', 'Karapinar', 'ra555','ra555', 'rabiakarapinar78@gmail.com','+31 6 111 222 33')",
  "insert into Users values (2, 'Jaudi', 'Marjana', 'ja555','ja555', 'joudi@gmail.com','+31 6 222 333 44')",
  "insert into Users values (3, 'Rim', 'Sebai', 'ri555','ri555', 'rim@gmail.com','+31 6 555 666 77')",

  "insert into tags values (1, 'Weekly')",
  "insert into tags values (2, 'Monthly')",
  "insert into tags values (3, 'Daily')",

  "insert into reminders values (1, 'Morning', CURDATE() ,CURDATE() )",

  "insert into categories values (1, 'Plan vacation')",
  "insert into categories values (2, 'Shopping')",
  "insert into categories values (3, 'Home Work')",
  "insert into categories values (4, 'Children')",

  "insert into lists values (1, 'Research Hotels', 1, null)",
  "insert into lists values (2, 'Buy Guide Books', 1, null)",
  "insert into lists values (3, 'Reserve rental car', 1, null)",
  "insert into lists values (4, 'Supermarket', 2, null)",
  "insert into lists values (5, 'Bazaar', 2, null)",
  "insert into lists values (6, 'Lidly', 2, null)",
  "insert into lists values (7, 'JavaScript hw', 3, null)",
  "insert into lists values (8, 'Database hw', 3, null)",
  "insert into lists values (9, 'Node hw', 3, null)",
  "insert into lists values (10, 'Nederlands hw', 3, null)",
  "insert into lists values (11, 'Judo course', 4, null)",
  "insert into lists values (12, 'Meeting', 4, null)",

  "insert into ToDoItems values (1, 'Amsterdam Hotel', '', 1, false,null)",
  "insert into ToDoItems values (2, 'Antalya Hotel', '', 1, false,null)",
  "insert into ToDoItems values (3, 'A to Z LONDON', '', 2, false,null)",
  "insert into ToDoItems values (4, 'Buy Guide book for Amsterdam', '', 2, false,null)",
  "insert into ToDoItems values (5, 'Compare prise of car from www.snap.car', '', 3, false,null)",
  "insert into ToDoItems values (6, 'White Car', '', 3, false,null)",
  "insert into ToDoItems values (7, 'Milk', '', 4, false,null)",
  "insert into ToDoItems values (8, 'Strawberry', '', 4, false,null)",
  "insert into ToDoItems values (9, 'Bread', '', 4, false,null)",
  "insert into ToDoItems values (10, 'Buskuvit', '', 4, false,null)",
  "insert into ToDoItems values (11, '1 kg fish', '', 5, false,null)",
  "insert into ToDoItems values (12, 'See the promotions of Lidly', '', 6, false,null)",
  "insert into ToDoItems values (13, 'How can I use Json object?', '', 7, false,null)",
  "insert into ToDoItems values (14, 'Callback functions review', '', 7, false,null)",
  "insert into ToDoItems values (15, 'Finish Udemy course', '', 7, false,null)",
  "insert into ToDoItems values (16, 'Look at transaction process', '', 8, false,null)",
  "insert into ToDoItems values (17, 'Learn normalizations', '', 8, false,null)",
  "insert into ToDoItems values (18, 'Review Node', '', 9, false,null)",
  "insert into ToDoItems values (19, 'Learn irregular werbs', '', 10, false,null)",
  "insert into ToDoItems values (20, 'Chapter 9, study subject 1&2', '', 10, false,null)",
  "insert into ToDoItems values (21, 'Complete subsciption from web', '', 11, false,null)",
  "insert into ToDoItems values (22, 'Buy sport clothes', '', 11, false,null)",
  "insert into ToDoItems values (23, 'Meeting with home doctor for Seniha', '', 12, false,null)",
  "insert into ToDoItems values (24, 'Meeting2', '', 12, false,null)",
  "insert into ToDoItems values (25, 'Meeting3', '', 12, false,null)",

  "insert into UsersCatalogs values (1, 1, 1, true, true)",
  "insert into UsersCatalogs values (2, 1, 2, true, true)",
  "insert into UsersCatalogs values (3, 1, 3, true, true)",
  "insert into UsersCatalogs values (4, 1, 4, true, true)",
  "insert into UsersCatalogs values (5, 2, 3, true, false)",
  "insert into UsersCatalogs values (6, 2, 4, true, false)",
  "insert into UsersCatalogs values (7, 3, 1, true, true)",
  "insert into UsersCatalogs values (8, 3, 3, true, true)"
];
connection.connect();
for (let i in insert_queries) {
  connection.query(insert_queries[i], function (error, results, fields) {
    if (error) throw error;
    console.log("Query is worked: " + insert_queries[i]);
  });

}

connection.end();


