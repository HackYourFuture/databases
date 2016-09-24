# Class 3 review


### Review
We again covered a lot of material today

### SCHEMA
The layout of a database. If you are using MySQL then the schema is the `.sql` file that you used to create the database. There are also some very nice tools for
visualizing the layout (schema) of a database. This one is interesting - https://snowflakejoins.com/index.html  

### HTTP Verbs and how they relate to actions
**GET** is like `select`

**POST** is like `insert`

**PUT** is like `update`

**DELETE** is like `delete`


### Using PUT and DELETE in forms
We found out that you CAN NOT use these verbs directly in forms. Instead you need to use `XMLHttpRequest`s and specify the verb when you make the `open()` call. The reason for this is the difference between the `HTTP` specification and `HTML` specification. Here's the answer we found in class - http://stackoverflow.com/questions/5162960/should-put-and-delete-be-used-in-forms 

### MongoDB
After some hassle we installed MongoDB.
Most of you installed Mongo in `C:\Program Files\Mongodb\server\bin\` and created a directory called `C:\db` for the data.
We saw that the DAEMON is a program which runs in the background of your computer all the time. You may hear this referred to as a `background process` as well.
We started the MongoDB server (daemon) by opening a `cmd` window and running `c:\Program Files\Mongodb\server\bin\mongod.exe -dbpath c:\db`
Now start a NEW command window and run the Mongodb client with `c:\Program Files\Mongodb\server\mongo.exe`
PLEASE NOTE THAT YOU MAY NEED TO CHANGE THE PATHS ABOVE DEPENDING ON YOUR SYSTEM - PUT A MESSAGE IN SLACK IF YOU HAVE A PROBLEM

### Some mongo commands
We saw that there are many parallels between Mongo and MySQL
They both have commands to choose which database you want to use:
`use test` (use the collection/database named `test`)

We imported the restaurants database to have some test data:
`c:\Program Files\Mongodb\bin\mongoimport.exe --db test --collection restaurants --drop --file c:\primer-dataset.json`
Please know thtat this assumes you have saved the test data in `c:\primer-dataset.json`

They both have commands to **find (query)** data:

Docs for Mongo here - https://docs.mongodb.com/getting-started/shell/query/

In Mongo we would say:

`db.todos.find({'name': 'Eat breakfast'})` to find all todos with the name `Eat breakfast`

while in MySQL we would say:

`select * from todos where name = 'Eat breakfast';`

And commands to **insert** data:

Docs for Mongo here - https://docs.mongodb.com/getting-started/shell/insert/

In Mongo we would say:

`db.todos.insert({'name': 'Do some stuff', 'done': 0})`

while in MySQL we would say:

`insert into todos (name, done) values ('Do some stuff', false);`

And commands to **update** data:

Docs for Mongo here - https://docs.mongodb.com/getting-started/shell/update/

Remember that the first part is what to search for to change and the `$set` part is what to change.

So in this case we are looking for a todo with a `name` = `Do some stuff` and changing the `done` value to 1.

Also remember that Mongo only changes the first record unless we use `{multi: true}` in the query.

```
db.todos.update(
	{'name': 'Do some stuff'},
	{
		$set: { 'done': 1}
	}
)
```
while in MySQL we would say:

`update todos set done = 1 where name = 'Test';`

Lastly, the commands to **delete** data:

Docs for Mongo here - https://docs.mongodb.com/getting-started/shell/remove/

`db.todos.update({'name': 'Do some stuff'})`

while in MySQL we would say:

`delete from todos where name = 'Do some stuff'`

### Using with Node.js
Unfortunately we did not have time to install the drivers for Mongo so that you can use a Mongo database from your Node projects but you all know how to do it and it is quite simple.

Simply run `npm install --save mongodb`. This will install the Mongo driver for you.

# Homework 3
We built the todos server last week using a relational database (MySQL). For this week we will keep the same structure (YOU DID THE HARD PART ALREADY) and change the database to use Mongo instead.
**This one should be easy!**

You might see the term `CRUD` used in some documentation. This stands for:

**C**reate - create some data 

**R**ead - query some data

**U**pdate - update some data

**D**elete - delete some data

CRUD is simply a short way of talking about the operations you can perform on data.

A few tips:
 - Use Postman
 - Use the mongo command line (mongo.exe) to create the `todos` database
 - Remember that Mongo uses `documents` and `collections` instead of `records` and `tables` but you can think about them a little bit the same way.
 - When you insert into Mongo it will assign a unique ID to the document for you and return that ID
 - Think about the difference between inserting data (MySQL) and inserting an entire document to a collection.

### Good references
https://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html
http://blog.modulus.io/mongodb-tutorial


Since I did not get to do an example in class I will do the GET request again for you this time and you guys can do the rest.
