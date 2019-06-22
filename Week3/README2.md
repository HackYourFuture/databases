Insert item(s) in ToDo list:
1-On postman chose POST => body => raw => then chose JSON(application/json)
2-write the following link http://localhost:3000/items/add
3-then write this object as a example in side the body
4-press send to insert this object to item Table inside database

you don't have to insert id because it is AUTO_INCREMENT
{
"Name": "t-shirt",
"Description": "red t-shirt"
}

xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Delete item(s) in ToDo list:
1-On postman chose DELETE
2-write the following link http://localhost:3000/items/1 => (1) as the id of row
3-press send button to Remove all rows depended on the id (1) you inserted from all tables which has this ID as a foreign key.

xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Create a new ToDo list:
1-On postman chose POST => body => raw => then chose JSON(application/json)
2-write the following link http://localhost:3000/todolist/add
3-then write this object as a example inside the body.
4-press send button to insert this object to item Table inside database.

you don't have to insert ID because it is AUTO_INCREMENT
{
"Name": "drawing",
"Description": "drawing the structure of database",
"IsCompleted": "false",
"category_id": 2
}

xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Delete a ToDo list:
1-On postman chose DELETE.
2-write the following link http://localhost:3000/todolist/1 => 1 as the id of row(s).
3-press send button to Remove all rows depended on the id (1) you inserted from todolist Table.

xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Mark an item as completed
1-On postman chose PUT
2-write the following link http://localhost:3000/todolist/completed/2 (2 as id)
3-press send button to update all rows depended on this id (2) to true which is completed.
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Display all rows from any table Table
1-On postman chose GET then write the following link http://localhost:3000/tablename then press send to get all rows inside this (tablename)

xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Display a specific row from any table Table
1-On postman chose GET then write the following link http://localhost:3000/tablename/1 then press send to get a get row which has id 1 from this (tablename)
