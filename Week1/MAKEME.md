> This homework assumes you have installed the software [MySQL](https://dev.mysql.com/downloads/mysql/) to your computer. If not please do that first!

# Homework week 1

This week you'll be writing a Node.js file that makes a connection to a MySQL database instance. These are the requirements that this "entrypoint" file must have:

1. Use the `mysql` package (https://www.npmjs.com/package/mysql)
2. Make a connection to MySQL, using the login credentials
3. Write JavaScript code that incorporates SQL commands:
    - Create a database called 'world'
    - Create a table called 'country'
    - Create a table called 'city'
4. Insert the right columns into each table. Make use of the following file: [world.sql](./databases/world.sql).
5. Write queries (that's a technical term meaning 'requests for information from a database') that will retrieve data that answers the following questions:
    1. What are the names of the countries with population greater than 8 million
    2. What are the names of the countries that have “land” in their names ?
    3. What are the names of the cities with population in between 500,000 and 1 million ?
    4. What are the names of all the countries on the continent ‘Europe’ ?
    5. List all the countries in the descending order based on their surface areas.


6. If you haven't already, load the entire [world.sql](https://github.com/HackYourFuture/databases/blob/master/Week1/databases/world.sql) file by using the native filesystem library [fs](https://nodejs.org/docs/latest-v8.x/api/fs.html) (require('fs')), 
and including `multipleStatements: true` in `createConnection`
(ie. in addition to   `, host: 'localhost', user: 'hyfuser', ` ) .
You may then need to change the database which you query to "new_world".  Write queries that answer the following questions:
    1. List the top 10 cities of Western Europe in descending order of population
    3. List the monarch next to the language they speak, for the continent with the 2nd highest population

7. As long as your database server is running, running the command `node homework_entrypoint.js` should output a console.log of readable and concise messages, some of which state the answers to the geography questions. The output is *regardless* of what existed in the database(s) before. In other words running `node homework_entrypoint.js` again should give the same result. And no matter what *my* database has, running `node your_homework_entrypoint.js` should give me a good idea that your code works and helps me read your code, and make it super easy for me to check your homework! Near the top of your file, you'll want to put something like the first four lines of world.sql  `drop schema if exists etc...` 

(Note: when you code for a company, you will probably *not* want to write code that drops the database, unless you want to really annoy your customers!) 

Tip: Before writing any query, first get a working version of the [example](https://www.npmjs.com/package/mysql#introduction) going. This will help you understand the basic structure of making a database connection and query.

Tip: If you want to learn how SQL itself works check out the following online tutorial: [SQL Teaching](https://www.sqlteaching.com/)
