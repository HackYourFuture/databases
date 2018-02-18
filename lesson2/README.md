# Lesson 2: Practical Database Usage

In this class, students will learn how to use more complex SQL queries to retrieve information across tables, and interact with data including write operations.

Objective: Students should be able to build CRUD functionality using SQL statements, including INSERT INTO, UPDATE and DELETE.

## Pre-Class Readings

Before arriving to class on Sunday, please watch all of the videos in [this video playlist](https://www.lynda.com/SharedPlaylist/0d62f3e4428e44ada89466cdbc296fc0) on Lynda.
- Inserting, Updating, and Deleting
- Understanding Write Conflicts
- Planning Your Database
- The Data Definition Language
- Understanding Stored Procedures and Injection Attacks

Also, please read the following pages that explains the ACID database model and connecting to MySQL from node.
- [The ACID Database Model](https://www.thoughtco.com/the-acid-model-1019731)
- [Node MySQL Documentation on Github](https://github.com/mysqljs/mysql)

## Main Topics

- INSERT INTO
- UPDATE
- DELETE
- Connecting to MySQL from node
- Security
    - SQL Injection
    - User GRANTS
- Writing SQL in your node application
    - Raw SQL strings
    - Parameter validation
    - Escaping
    - Prepared statements
    - Stored procedures
    - Enumeration
- Data definition language
    - Creating tables
    - Altering tables
    - Indexes


## Reference Material

- [OWASP on SQL Injection](https://www.owasp.org/index.php/SQL_injection)
- [Parameter Validation on Wikipedia](https://en.wikipedia.org/wiki/Parameter_validation)
- [Node MySQL Escaping Query Values](https://github.com/mysqljs/mysql#escaping-query-values)
- [Node MySQL Preparing Queries (automatic escaping)](https://github.com/mysqljs/mysql#preparing-queries)
- [MySQL SHOW GRANTS](https://dev.mysql.com/doc/refman/5.7/en/show-grants.html)
- [Falsehoods Programmers Believe About Names](http://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/)
- [Rewatch the previously recorded session: part 1](https://www.youtube.com/watch?v=G6v1po3zvNk)
- [Rewatch the previously recorded session: part 2](https://www.youtube.com/watch?v=5fv1vV1TciM)
- [Rewatch the previously recorded session: part 3](https://www.youtube.com/watch?v=ZNLhHUDj6jo)


## Homework

- Write the necessary SQL statements to complete the functionality of the node task application. This includes, at the minimum, the following functionality:
    - Adding a new task item
    - Changing the name, the due date, or the status of a task item
    - Marking a task item as completed
    - Deleting a task item
    - Deleting a user
- Create a new database containing the following tables:
    - **Class** with the columns: id, name, begins (date), ends (data)
    - **Student** with the columns: id, name, email, phone, class_id (foreign key)
- If you are done with the above tasks, you can continue with these advanced tasks:
    - Create an index on the name column of the student table.
    - Add a new column to the class table named **status** which can only have the following values. not-started, ongoing, finished (hint: enumerations).

