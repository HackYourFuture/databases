# Lesson 2: Practical Database Usage

In this class, students will learn how to use more complex SQL queries to retrieve information across tables, and interact with data including write operations.

Objective: Students should be able to build CRUD functionality using SQL statements, including INSERT INTO, UPDATE, etc.

## Pre-Class Readings

Before arriving to class on Sunday, please watch all of the videos in [this video playlist](https://www.lynda.com/SharedPlaylist/0d62f3e4428e44ada89466cdbc296fc0) on Lynda.
- Inserting, Updating, and Deleting
- Understanding Write Conflicts
- Planning Your Database
- The Data Definition Language
- Understanding Stored Procedures and Injection Attacks

Also, please read the following page that explains the ACID database model.
- [The ACID Database Model](https://www.thoughtco.com/the-acid-model-1019731)

## Main Topics

- INSERT INTO
- UPDATE
- Writing SQL in your application
    - Raw SQL strings
    - Parameter validation
    - Escaping
    - Prepared statements
    - Stored procedures
- Security
    - SQL Injection
    - User GRANTS
    - Enumeration

## Reference Material

- [OWASP on SQL Injection](https://www.owasp.org/index.php/SQL_injection)
- [Parameter Validation on Wikipedia](https://en.wikipedia.org/wiki/Parameter_validation)
- [Node MySQL Escaping Query Values](https://github.com/mysqljs/mysql#escaping-query-values)
- [Node MySQL Preparing Queries (automatic escaping)](https://github.com/mysqljs/mysql#preparing-queries)
- [MySQL SHOW GRANTS](https://dev.mysql.com/doc/refman/5.7/en/show-grants.html)
- [Rewatch the previously recorded session: part 1](https://www.youtube.com/watch?v=G6v1po3zvNk)
- [Rewatch the previously recorded session: part 2](https://www.youtube.com/watch?v=5fv1vV1TciM)
- [Rewatch the previously recorded session: part 3](https://www.youtube.com/watch?v=ZNLhHUDj6jo)


## Homework

- Write the necessary SQL statements to complete the functionality of your application. This probably includes, at the minimum, the following functionality:
    - Adding a new todo item
    - Changing the name, the due date, or the status of a todo item
    - Marking a todo item as completed
    - Deleting a todo item

