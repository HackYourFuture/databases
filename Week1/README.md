# Lesson 1: MySQL and Node setup! Create, Insert and Select !

Objective : This module aims to incorporate JavaScript code to operate the MySQL database.
MySQL client can be used to demonstrate SQL queries however, students should know how to
make a MySQL database connection from JavaScript, run queries from JavaScript and
capture results of queries in JavaScript.

## Pre-Class Preparation
- Install MySQL using the following [official docs](https://dev.mysql.com/downloads/mysql/)
- MAC users may use `brew install mysql`

Before arriving to class on Sunday, please watch all of the videos in [this video playlist](https://www.lynda.com/SharedPlaylist/0299ced540444d7197460e7f1f74ddab) on Lynda.
If you actually manage to watch them all and understand everything,
then you are a database expert.

## Setup

### MySQL setup
This setup assumes MySQL version 8.0.
Windows users should use **Microsoft MySQL Command Line** client.
Linux and MAC users should use **gnome-terminal** and **Terminal** respectively.
**Microsoft MySQL Command Line** client gives you a **msql>** prompt after typing in your root password.
Note that this password is the one you used for root user of the mysql.
Linux and MAC users can execute `mysql -uroot -p` and then type the password.
Following commands should be run under the **mysql>** prompt:
```
mysql> create user ‘hyfuser’@‘localhost’ identified with mysql_native_password by ‘hyfpassword’;
# This command creates a user 'hyfuser' with password 'hyfpassword' for
# the database server at 'localhost'

mysql> grant all privileges on *.* to ‘hyfuser’@‘localhost’;
# This command gives all permissions to user 'hyfuser'.
(*.*) means every table of every database.

mysql> create database userdb;
This command creates a database 'userdb'
```

### Node setup
This setup assumes that you have Node.js 0.6 or higher.
We use **mysqljs** driver which can be installed using `npm install mysql`

### Verification of the correct setup
Run `node connection-test.js` from VScode(Windows) or the terminal(Linux or MAC).
The output should be `The solution is:  2`.
connection-test.js can be found in the Week1 folder.

In this class, students will be introduced to

* Basics of relational databases: Concepts of tables, rows, columns, primary key, foreign key.
* Creation of a database table and insertion of values.
* Retrieving data from a MySQL database using SELECT queries.

Objective: Students should be able to create tables,
insert values in tables and
retrieve data from tables using SELECT statements that include FROM, WHERE clauses.


## Topics to be covered

### What is a Database ?
* Definition : Organized collection of data and rules about its manipulation
* Client-server architecture : E.g. (Relational) DBMS
* Files as database
* Data structure/object as database
```js
const capitals = [
  "Amsterdam",
  "Delhi",
  "Damascus",
  "Madrid"];
```

### Relations = Table

* What is a relation (in the following sentences)?
* Delhi is the capital of India
* Amsterdam is the capital of Netherlands
* Damascus is the capital of Syria

Dan, 29, works in Amazon and lives in Seattle. His friend Ben who just celebrated
his 24th birthday works in Facebook and lives in Redmond.

### DBMS implementations

* ** MySQL **
* PostgreSQL
* MongoDB (NoSQL)
* Cassandra (NoSQL)

### MySQL components

* MySQL server (runs as a service, default port: 3306)
* mysql: monitor / terminal / client (to connect to the server and execute stuff)
* mysqladmin: Administering a MySQL Server

### Create Table in MySQL

#### Collection of rows and columns
#### SYNTAX
```
CREATE TABLE table_name (column_name, column_type [, column2_name, column2_type]);
```

* INT(N) type
* DATE, DATETIME and TIMESTAMP, (set time_zone = '+03:00')
* BLOB (LOAD_FILE(filename))


### Fill up the table in MySQL: INSERT rows
A row (aka record or tuple) represents a single, implicitly structured data item in the table.

#### SYNTAX
```
INSERT INTO table_name VALUES(value1, value2 [,value3,...]);
```
* INSERT INTO table_name VALUES(...values...)
* INSERT INTO table_name (column names) VALUES(..values...)
* INSERT INTO table_name SET column_name = {expr | DEFAULT}

### See the content : SELECT

* FROM clause : multiple tables
* WHERE clause : Multiple conditions(AND, OR, NOT) Operators ( =, <>, BETWEEN, LIKE, IN)
* Aggregation : SUM, AVG, COUNT
* Joins : Natural join, inner join, left outer and right outer join
#### Simple SYNTAX for a single table
```
SELECT */column_name FROM TABLE
WHERE condition1 [AND/OR
      condition2 ...];
```

### INSERT and SELECT together

```
INSERT INTO 'employees' ('shop_id', 'gender', 'name', 'salary')
SELECT 3,
       LEFT(gender, 1),
       CONCAT_WS(' ', first_name, last_name),
       salary
FROM   transferred_ employees
WHERE  transfer_date > '2008-01-01';
```

### Uniqueness and Keys

* Super key : set of columns that uniquely identify a row
* Candidate key : minimal super key that can uniquely identify a row
* Primary key : choice of candidate key chosen by database designer : cannot be null

## Reference Material

- [TutorialsPoint MySQL Introduction](http://www.tutorialspoint.com/mysql/mysql-introduction.htm)
- [Official MySQL Documentation](https://dev.mysql.com/doc/refman/5.7/en/)
- [Official MySQL Tutorial (pretty dense)](https://dev.mysql.com/doc/refman/5.7/en/tutorial.html)
- [Node MySQL Documentation on Github](https://github.com/mysqljs/mysql)
- [Joel Spolsky - Character Sets and Unicode](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/)
- [SQL Fundamentals - SoloLearn](https://www.sololearn.com/Course/SQL/)
