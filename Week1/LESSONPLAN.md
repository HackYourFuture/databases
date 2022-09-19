# Lesson Plan Databases Week 1

The lesson plan is primarily written for teachers so that they can
use examples and anecdotes from this document in conjunction with the README
and explain the concepts better in the class.

## Topics (essentially same as the README file)

1. What is an information (system)?
2. What are entities?
3. What is a database?
4. What is the role of a database in an application?
5. What is Structured Query Language (SQL)?
6. What are data types (as applied to databases)?
7. How to use SQL to Create, Read, Update and Delete (CRUD) ?
8. What is a database dump?

> Before you start, ask around and make sure that everyone has successfully installed the [MySQL Community Edition Server](https://dev.mysql.com/downloads/mysql/)

## 1. What is an information (system) ?

### Explanation

An information system (in the context of computers) consists of three components.

1. A place where information is kept.
2. A tool(program) which can interact with this place
3. A user interface

### Example

Email service. Any email server maintains the list of registered users, their messages etc (component 1).
An email client is the program that can interact with it (component 2).
A browser or the computer provides a user interface (component 3).

### Exercise

_Name three other information systems and explain their components._

### Essence

Information systems process and interpret information by the means of computers and people.

## 2. What are entities?

### Explanation

Entity is an abstract concept as opposed to a concrete concept. It describes something that is not tangible.
It has attributes that provide more information about it. An instance is the manifestation of the entity.

### Example

1. Car is a an Entity. Attributes of the car are `Manufacturer name`, `Model name`, `number`, `four wheel drive` etc.
   Jeep model Renegade with the number NL65JY is an instance of the _car entity_.
2. If you consider a table in an Excel sheet, then name of the table is the entity and the rows are the instances.

### Exercise

_Give three more examples of entities and their instances._

### Essence

Entities are general names given to the types/classes of things.

## 3. What is a database?

### Explanation

A database is a collection of tables and users and permissions given to those users and rules for
the access of tables. DataBase Management System (DBMS) is the term often used to describe
the system that manages the access of database. This management involves storing the database,
creating users, giving users appropriate permissions, supporting query language etc.

### Example

Examples of DBMS implementations: MySQL, MongoDB, PostgreSQL, DynamoDB etc.
We use MySQL for the demonstration.

The following command shows all existing database:

```
show databases;
```

The following command creates a database:

```
CREATE DATABASE company;
```

The following command selects (switches to) a database:

```
USE company;
```

The following command shows you the current database:

```
select database();
```

### Exercise

_Explain how the database is an example of a client/server system._

### Essence

Database is used to store data in an organized manner.

## 4. What is the role of a database in an application?

### Explanation

Many applications want to store the data outside of the program and access
it whenever necessary. This **outside** can be really different computer
where database is stored. In such a case, we need the ability to talk to
this external computer and access the database. Thus, we need the external
computer to act as a server and our application acts as a client.
In this way, the primary role of a database is to separate the data handling
from the business logic.

### Example

In a ticket reservation system, the database contains the information
about all passengers, trains, timetables, stations etc. All this information
can be stored in a database and the external application can query the relevant
details per request.

```
Use connection-test.js file to demonstrate the database connection.
```

### Exercise

_Find out 2 applications on your laptop/phone that require a database and 2 applications that do not require a database._

### Essence

Role of a database is separation of data from the business logic of the application.

## 5. What is Structured Query Language (SQL)?

### Explanation

SQL is a language to interact with the database. It consists of four categories.

1. Data Definition Language (DDL)
2. Data Query Language (DQL)
3. Data Manipulation Language (DML)
4. Data Control Language (DCL)

### Example (in the format Language : Commands)

1. DDL : `CREATE`, `ALTER`
2. DQL : `SELECT`
3. DML : `INSERT`, `UPDATE`
4. DCL : `GRANT`, `REVOKE`

### Exercise

_Guess the difference between ALTER And UPDATE commands_

### Essence

SQL supports variety of command to interact with the database.

## 6. What are data types (in the context of databases)?

### Explanation

When the data is stored in a database. It must be classified appropriately.
Numbers must be stored differently than a string of alphabets.
Boolean values need much less space than a BLOB (Binary Large OBject) of image.
When the tables are created in the database, all of its columns must
have fixed data type. A column of age must have a number as a data type.

### Example (for MySQL 5.0.3 and higher)

| Type       | Description                                   | Example Value           |
| ---------- | --------------------------------------------- | ----------------------- |
| int        | Numbers                                       | 42                      |
| float      | Decimal numbers                               | 3.14                    |
| varchar(N) | String with variable maximum of N characters  | "Dragon"                |
| text       | String with fixed maximum of 65535 characters | "Positive"              |
| datetime   | Store date and time without timezone          | 2019-01-01 22:10:23     |
| timestamp  | Store date with timezone (e.g. last login)    | 2019-01-01 22:10:23 UTC |
| ENUM       | Define a set of allowed values                | (MALE, FEMALE)          |
| BLOB       | Store binary files                            | an image                |

### Exercise

_What data types should be used to store a boolean value?_

### Essence

MySQL data types are used to define what types of values the columns of the tables in the database contain.

## 7. How to use SQL to Create, Read, Update and Delete (CRUD)

### Explanation

We will use both MySQL command line client and the JavaScript client to demonstrate the
interaction with the SQL server.

`Use create-table.js, insert-values.js` files to show how the table creation, insertion etc.
can be done via JavaScript client

### Example

All examples can be executed in the `MySQL command line client`.
Remember that all these commands can also be sent via JavaScript clients.
Please check the available `.js` files in the `Week1` folder.

#### CREATE

The following command creates a table called `employees` (in the `company` database)
with five columns:

1. `employee_id` that contains integer number.
2. `employee_name` that contains alphabetical names (of max 50 characters).
3. `salary` that contains a decimal number.
4. `joining_date` that contains a date time.
5. `gender` than can either be `'m'` or `'f'`.

```
CREATE TABLE employees (
    employee_id int,
    employee_name varchar(50),
    salary float,
    joining_date datetime,
    gender enum('m', 'f')
);
```

#### INSERT

The following command inserts a row in the table `employees`.
Note that the sequence of columns must be followed.

```
INSERT INTO employees VALUES (101, "Dan", 5000, "2019-06-24", 'm');
```

The following command uses column name (also known as field name sometimes) syntax:

```
INSERT INTO employees (employee_name , salary, employee_id, gender, joining_date) VALUES("Dany", 5000, 102, 'f', "2019-05-20");
```

The following command uses the same syntax to add multiple rows at a time

```
INSERT INTO employees (employee_name , salary, employee_id, gender, joining_date) VALUES("Ben", 7000, 103, 'm', "2019-07-20"), ("Benta", 3000, 104, 'f', "2019-10-12"), ("Raj", 9000, 105, 'm', "2019-01-01");
```

The following command uses the SET syntax to insert values in a random order of columns:

```
INSERT INTO employees SET employee_name = "Joe", salary = 4000, joining_date = "2019-07-01", gender = 'f', employee_id = 100;
```

> If you don't remember the column names, then use describe employees; command which lists the column names and their data types.

#### SELECT

The following command displays the entire table. The `*` means all columns.

```
SELECT * FROM employees;
```

The following command displays names of employees whose salary is greater than 3000.
It uses the `WHERE` clause which filters out the rows based on the condition.
The condition is applied on the column `salary` of each row.
`SELECT employee_name` will only print the `employee_name` column of the rows
where `salary` column has the value `>3000`.

```
SELECT employee_name from employees
WHERE salary > 3000;
```

#### UPDATE

The following command updates the salary of the employee whose `employee_id` is 102.
Note that `=` works as an assignment operator in `SET salary = 8000`
but works as a comparison operator in the WHERE clause `employee_id = 102`.

```
UPDATE employees
SET salary = 8000
WHERE employee_id = 102;
```

#### DELETE

The following command deletes all (rows of) employees who joined after the 1st of July 2019.

```
DELETE from employees
WHERE joining_date > "2019-07-01";
```

### Exercise

1. Write an SQL query to find all employees who are males.
2. Write an SQL query to insert 4 more records in the table of employees.
3. Write an SQL query to update the salary of all female employees to 12000.
4. Write an SQL query to delete all the employees whose name starts with a 'B'.
5. Write an SQL query to create a table called `departments` with following columns: `dept_id`, `dept_name`, `manager`.

### Essence

SQL commands provide a neat and structured way to interact with the database tables.

## 7.5 Miscellaneous concepts

### Aliases in SELECT queries

#### Explanation

Aliases give nicknames to column names when displaying them. They are especially useful in case of nested queries
when tables have long names and joins are used.

#### Example (without nested query)

`SELECT employee_id as "Employee Number", employee_name as "Employee Name", salary as Earnings from employees;`

### NOT NULL and DEFAULT values for columns

#### Explanation

While creating a table, some columns may be declared as `NOT NULL` or `DEFAULT` with a value,
or both. For example, `gender` of the employee can NOT be null. Also some columns like
`Number of holidays` can have default values. It is a good practice to explicitly mark
the columns as `NOT NULL` so that MySQL can do optimizations in storing/indexing.

#### Example

Demonstrate the difference with the live execution of the following sequence of commands:

```
CREATE TABLE default_not_null_demo(num1 int, num2 int NOT NULL, num3 int default 5555, num4 int not null default 1111);
DESCRIBE default_not_null_demo;
INSERT INTO default_not_null_demo set num2 = 1, num4 = default;
SELECT * from default_not_null_demo;
INSERT INTO default_not_null_demo set num2 = 1, num3 = 233, num4 = default;
```

### What is int(N) ?

#### Explanation

The number N represents the number of decimal spaces that may be padded when displaying the number.
It does not indicate the highest number that can be stored in the column. E.g. The column `cost int(3)`
can hold numbers greater than 999.

#### Example

Illustrate the difference with the live execution of the following sequence of commands:

```
CREATE TABLE test_int(num1 int(4) ZEROFILL, num2 int(6));
INSERT INTO test_int values (23,34);
INSERT INTO test_int values (3,534);
INSERT INTO test_int values (14563,534);
INSERT INTO test_int values (12345,98534);
INSERT INTO test_int values (12345,1234567);
SELECT * FROM test_int;
```

### Datetime vs Timestamp

#### Explanation

Both Datetime and Timestamp accept values in the format `YYYY-MM-DD HH:MM:SS`.
However, MySQL stored the timestamp value along with the current system time zone information.
If the time zone is changed, the value stored in the database is changed accordingly.
Datetime may be a suitable data type for the `joining date`, while timestamp
may be a suitable data type for `last login` where the exact time and time zone might be crucial.

#### Example

Demonstrate with the live execution of the following sequence of commands:

```
CREATE TABLE test_timestamp (dt datetime, ts timestamp);

INSERT INTO test_timestamp VALUES ("2020-01-01 00:00:00", "2020-01-01 00:00:00");

SELECT * FROM test_timestamp;

SET time_zone = '+05:30';

SELECT * FROM test_timestamp;

```

## 8. What is a database dump?

### Explanation

A database dump is a file. This file contains SQL commands (mostly CREATE and INSERT)
that reflect the current state of the database.

### Example

To create the SQL dump, execute the following command from the terminal of MAC/Linux.

```
mysqldump -uhyfuser -p company > /path/to/store/dump/file/company-db-snapshot.sql
```

To create the SQL dump in Windows, you will have to
[include the path of your MySQL installation in the `Path` environment variable](https://www.computerhope.com/issues/ch000549.htm).
Then you can execute the following command

```
mysqldump.exe -uhyfuser -p company > /path/to/store/dump/file/company-db-snapshot.sql
```

Note that the path should be a location where the user has `write` permission (E.g. Desktop),
otherwise, you will get permission errors.

To apply the dump from mysql command prompt (`mysql>`), use the following command

```
source /path/to/the/dump/file
```

To apply the dump from the terminal(with generally a dollar prompt `$`), use the following command

```
mysql -uhyfuser -p [database] < /path/to/the/dump/file
```

Use [this](https://john-dugan.com/dump-and-restore-mysql-databases-in-windows/) link to learn more about
how to do it in Windows (using `cmd`).

### Exercise

Take the dump of `company` database and use the dump file to re-create the database.

### Essence

Dump files work as a snapshot of the database which allows going back to the previous states of the database.
