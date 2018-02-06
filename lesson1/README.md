# Lesson 1: Retrieving Data

In this class, students will be introduced to relational data terminology (row, column), the function of a primary key, and retrieving data from a MySQL database using SELECT queries.

Objective: Students should be able to retrieve data from a database table using SELECT statements that include WHERE, GROUP BY, and ORDER BY.

## Pre-Class Readings

Before arriving to class on Sunday, please watch all of the videos in [this video playlist](https://www.lynda.com/SharedPlaylist/0299ced540444d7197460e7f1f74ddab) on Lynda.
- What are databases?
- Exploring databases and database management systems
- The features of a relational database
- Introduction to database modeling
- Using the basic SELECT statement
- Creating SQL queries
- Structuring the WHERE clause
- Sorting query results
- Using aggregate functions
- Joining tables


## Main Topics

- The relational model of data
- A 'database' vs. a 'DBMS' (database management system)
- The concept of a schema
- The properties of an 'entity' (or 'row')
- Basic entity relationship diagrams
- A basic SELECT statement
- Constructing more complex SELECT statements
- JOIN
    - Selecting composite data from multiple tables
    - Compare JOIN WHERE with cartesian product
- Naming Conventions: UpperCamelCase/PascalCase, lowerCamelCase, snake_case, hnHungarianNotation/HNHungarianNotation
- Character Sets in Databases (hint: always use UTF-8 encoding, called 'utf8mb4' in MySQL)


## Reference Material

- [TutorialsPoint MySQL Introduction](http://www.tutorialspoint.com/mysql/mysql-introduction.htm)
- [Official MySQL Documentation](https://dev.mysql.com/doc/refman/5.7/en/)
- [Official MySQL Tutorial (pretty dense)](https://dev.mysql.com/doc/refman/5.7/en/tutorial.html)
- [Node MySQL Documentation on Github](https://github.com/mysqljs/mysql)
- [Joel Spolsky - Character Sets and Unicode](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/)

## Homework

Design queries that retrieve the following data sets. Compare with classmates to see if your answers were correct.

- Find out how many todo items are on the list
- Find out how many todo items on the list do not have a valid due date
- Find all the todo items that are marked as done
- Find all the todo items that are not marked as done
- Get all the todo items, sorted with the most recent first
- Get the single most recently added todo item
- Get the name and due date of all todo items about 'databases'
- Get the name and status (as a string) of all todos
- Get the name of each status, along with a count of how many todos have that status
- Get the names of all statuses, sorted by most todos with that status to least

Build a simple Node application to connect to the class database (using `require('mysql')`). Run the above SQL statements through your Node app (either command-line input or hard-coded) and print the results on the command line.

Watch the previous session recorded on video here:

Part 1 : https://www.youtube.com/watch?v=NbB-EXAdKks&t 

Part 2 : https://www.youtube.com/watch?v=yN5XyVSUj8k&t=4055s
