title: Database Week 1
author:
    name: Unmesh Joshi
    url: https://unmeshjoshi.wordpress.com
output: week1.html
controls: true

--

# Database 101

--

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
--

### Relations = Table

* What is a relation (in the following sentences)?
* Delhi is the capital of India
* Amsterdam is the capital of Netherlands
* Damascus is the capital of Syria

Dan, 29, works in Amazon and lives in Seattle. His friend Ben who just celebrated
his 24th birthday works in Facebook and lives in Redmond.

---

### DBMS implementations

* ** MySQL **
* PostgreSQL
* MongoDB (NoSQL)
* Cassandra (NoSQL)
--

### MySQL

* MySQL server (runs as a service, default port: 3306)
* mysql: monitor / terminal / client (to connect to the server and execute stuff)
* mysqladmin: Administering a MySQL Server

--

### Create a user, grant privileges, create database

```
# Create a new user with privileges
mysql> GRANT ALL PRIVILEGES ON *.* TO 'hyfuser'@'localhost' IDENTIFIED BY 'hyfpassword';

Query OK, 0 rows affected, 1 warning (0.01 sec)

# Create a database to work with

mysql>create database todo_app

```
---

### Create Table in MySQL

## Collection of rows and columns
## SYNTAX
```
CREATE TABLE table_name (column_name, column_type [, column2_name, column2_type]);
```

* INT(N) type
* DATE, DATETIME and TIMESTAMP, (set time_zone = '+03:00')
* BLOB (LOAD_FILE(filename))
--

### Fill up the table in MySQL: INSERT rows
A row (aka record or tuple) represents a single, implicitly structured data item in the table.

## SYNTAX
```
INSERT INTO table_name VALUES(value1, value2 [,value3,...]);
```
* INSERT INTO table_name VALUES(...values...)
* INSERT INTO table_name (column names) VALUES(..values...)
* INSERT INTO table_name SET column_name = {expr | DEFAULT}

--

### See the content : SELECT

* FROM clause : multiple tables
* WHERE clause : Multiple conditions(AND, OR, NOT) Operators ( =, <>, BETWEEN, LIKE, IN)
* Aggregation : SUM, AVG, COUNT
* Joins : Natural join, inner join, left outer and right outer join
## Simple SYNTAX for a single table
```
SELECT */column_name FROM TABLE
WHERE condition1 AND/OR
      condition;
```
--

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
--

### Uniqueness and Keys

* Super key : set of columns that uniquely identify a row
* Candidate key : minimal super key that can uniquely identify a row
* Primary key : choice of candidate key chosen by database designer : cannot be null
--

### Relations

* One to One : Account to Employee
* One to Many : Department to Employee
* Many to Many : Project to Employee
--

### Foreign key

* A field (or collection of fields) in one table that uniquely identifies a row of another table or the same table
* In simpler words, the foreign key is defined in a second table, but it refers to the primary key or a unique key in the first table
