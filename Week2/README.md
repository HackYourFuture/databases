# Lesson 2: Group by, Having and Joins. Promisification of JS client with prepared statements

Objective: This class introduces more clauses (group by, having) in the
select statement. MySQL joins (inner, self, left and right) should be explained
with demonstration (Employee table with **reportsTo** field and Department
table with its PK in Employee table is suitable for this demonstration).
Promise based JavaScript program with SQL prepared statements should be
understood by students. The program can be found in the Week2 folder (Credits:
@remarcmij)

## Pre-Class Readings

Before arriving to class on Sunday, please watch all of the videos in [this video playlist](https://www.lynda.com/SharedPlaylist/0d62f3e4428e44ada89466cdbc296fc0) on Lynda.

Also, please read the following page that explains the ACID database model.
- [The ACID Database Model](https://www.thoughtco.com/the-acid-model-1019731)

## Topics to be covered

### NOT NULL and default values in CREATE table statement

Following links are worth reading.
- [Working with nulls] (https://dev.mysql.com/doc/refman/8.0/en/working-with-null.html)
- [TO DEFAULT or TO NULL] (https://blog.jooq.org/2014/11/11/have-you-ever-wondered-about-the-difference-between-not-null-and-default/)

### foreign key

Creating foreign key while creating the table
```
CREATE TABLE Employee (
other fields,
dept_id int,
foreign key (dept_id)
references Department(id)
);
```

Creating the foreign key by explicitly adding the constraint
```
ALTER TABLE Employee ADD CONSTRAINT fk_dept foreign key (dept_id) references Department(id);
```


### Database dump

A database dump (aka SQL dump) contains a record of the table structure
and/or the data from a database and is usually in the form of a list of SQL statements.

- Collecting the dump of an existing database from terminal `mysqldump -uroot -p database > dump-file.sql`
- Applying the dump from mysql command prompt `source /path/to/the/dump/file`
- Applying the dump from the terminal `mysql -uroot -p [database] < /path/to/the/dump/file`

### Group by and Having clauses

- *Group by* clause is used to group rows with same values.
- It can be used in conjunction with aggregate functions (E.g. min, max).
- The queries that contain the *group by* clause only return a single row for every grouped item.
- *Having* clause restricts the query results of *group by* clause.

### INSERT INTO table SET syntax

```
INSERT INTO Department SET dept_id=101, dept_name='fun', dept_head='unmesh';
```
### Promise based program demo

The program is called `async-create-insert.js` and can be found in Week2 folder.
- async : to create asynchronous function and ensure they return promise without having to worry
about building those promises
- await : to call a function returning promise without having to call .then() over that promise
- promisify() : to convert a callback based function to a promise based one.

### Relationships between tables : 1-M, M-M

- One to One (one user has one profile)
- One to Many (one department has many employees)
- Many to Many (book(s) and author(s))

### Adding a column to the table
```
alter table Employee add column dept_id int
```

### Update table (add a department head for a department)

```
update Department set dept_head = 'Lucas' where dept_id = 3;
```

### JOINs : CROSS, left, right, self, inner

- A comma (,) after **FROM** is equivalent to the CROSS join.
- Implicit inner join (when the keyword **JOIN** is not used), **WHERE** clause has conditions.
- self join use case : Employee table with (*eid* field and *reports_to* field)
- left and right join : reverse of each other
- [Join manual](https://dev.mysql.com/doc/refman/8.0/en/join.html)

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
