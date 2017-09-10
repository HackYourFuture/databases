# Lesson 2: Practical Database Usage

In this class, students will learn how to use more complex SQL queries to retrieve information across tables, and interact with data including write operations.

Objective: Students should be able to build CRUD functionality using SQL statements, including INSERT INTO, UPDATE, etc.

## Pre-Class Readings

- [Inserting, Updating, and Deleting](https://www.youtube.com/watch?v=JeBYdqKferQ&index=31&list=PLYlr48f6CaXtlkXcGMUD49wHmvC7ZTiD0)
- [The ACID Database Model](https://www.thoughtco.com/the-acid-model-1019731)
- [Conflicts and Isolation](https://www.youtube.com/watch?v=oMijxWh01O8&index=34&list=PLYlr48f6CaXtlkXcGMUD49wHmvC7ZTiD0)
- [Planning Your Database](https://www.youtube.com/watch?v=R4lzIRmZaLA&index=12&list=PLYlr48f6CaXtlkXcGMUD49wHmvC7ZTiD0)
- [The Data Definition Language](https://www.youtube.com/watch?v=Yz9XHMsR9WU&index=32&list=PLYlr48f6CaXtlkXcGMUD49wHmvC7ZTiD0)
- [Understanding Stored Procedures and Injection Attacks](https://www.youtube.com/watch?v=jjK3dc0UYdA&index=35&list=PLYlr48f6CaXtlkXcGMUD49wHmvC7ZTiD0)

## Main Topics

- INSERT INTO
- UPDATE
- DELETE
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
- [Falsehoods Programmers Believe About Names](http://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/)
- [Rewatch the previously recorded session: part 1](https://www.youtube.com/watch?v=G6v1po3zvNk)
- [Rewatch the previously recorded session: part 2](https://www.youtube.com/watch?v=5fv1vV1TciM)
- [Rewatch the previously recorded session: part 3](https://www.youtube.com/watch?v=ZNLhHUDj6jo)


## Homework

- Write the necessary SQL statements to complete the functionality of your application. This probably includes, at the minimum, the following functionality:
    - Adding a new todo item
    - Changing the name, the due date, or the status of a todo item
    - Marking a todo item as completed
    - Deleting a todo item

