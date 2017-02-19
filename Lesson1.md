# Lesson 1: Retrieving Data

In this class, students will be introduced to relational data terminology (row, column), the function of a primary key, and retrieving data from a MySQL database using SELECT queries.

Objective: Students should be able to retrieve data from a database table using SELECT statements that include WHERE, GROUP BY, and ORDER BY.

## Main Topics

- The relational model of data
- The concept of a schema
- The properties of an 'entity' (or 'row')
- A basic SELECT statement
- Constructing more complex SELECT statements
- JOIN
    - Selecting composite data from multiple tables
    - Compare JOIN WHERE with cartesian product

## Reference Material

- [TutorialsPoint MySQL Introduction](http://www.tutorialspoint.com/mysql/mysql-introduction.htm)
- [Official MySQL Documentation](https://dev.mysql.com/doc/refman/5.7/en/)
- [Official MySQL Tutorial (pretty dense)](https://dev.mysql.com/doc/refman/5.7/en/tutorial.html)
- [Node MySQL Documentation on Github](https://github.com/mysqljs/mysql)
- [Types of SQL JOINs](http://www.khankennels.com/blog/index.php/archives/2007/04/20/getting-joins/)
- [Joel Spolsky - Character Sets and Unicode](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/)

## Homework

Design queries that retrieve the following data sets. Compare with classmates to see if your answers were correct.

- Find out how many todo items are on the list
- Find all the todo items that are marked as done
- Find all the todo items that are not marked as done
- Get all the todo items, sorted with the most recent first
- Get the single most recently added todo item
- Get all todo items about 'databases'

Build a simple Node application to connect to the class database (using `require('mysql')`). Run the above SQL statements through your Node app (either command-line input or hard-coded) and print the results on the command line.