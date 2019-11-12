# Reading Material Databases Week 3

## Agenda

1. Normalization
   - normal forms
2. Transactions
3. SQL injection
4. NoSQL
5. Non-relational vs. relational

## 1. Normalization

When developing the schema of a relational database, one of the most important aspects to be taken into account is to ensure that the duplication is minimized. This is done for 2 purposes:  
* Reducing the amount of storage needed to store the data.
* Avoiding unnecessary data conflicts that may creep in because of multiple copies of the same data getting stored.
Normalization in DBMS

Database Normalization is a technique that helps in designing the schema of the database in an optimal manner so as to ensure the above points. The core idea of database normalization is to divide the tables into smaller subtables and store pointers to data rather than replicating it. 

There are various database “Normal” forms. Each normal form (NF) has an importance which helps in optimizing the database to save storage and to reduce redundancies. These normal forms build incrementally. e.g. a database is in 3NF if it is already in 2NF and satisfied the 
rules for 3rd normal form. Read  for more details.

#### 1st normal form (1NF) (4 rules)
* Rule 1 : Single valued attributes (each column should have atomic value, no multiple values)
* Rule 2 : Attribute domain should not change
* Rule 3 : Unique names for attributes / columns
* Rule 4 : Order does not matter
#### 2nd normal form (2NF)
No partial dependency. (i.e. no field should depend on part of the primary key)
Example
```
Score table (student_ID, subject_ID, score, teacher)
Subject table (subject_ID, subject Name)
```
#### 3rd normal form (3NF)
No transitive dependency (i.e. no field should depend on non-key attributes).

#### Boyce-Codd normal form (3.5 NF)
for any dependency A → B, A should be a super key.

To increase your understanding, study the following materials:

* [Database Normalization in Simple English](https://www.essentialsql.com/get-ready-to-learn-sql-database-normalization-explained-in-simple-english/)
* [Database Normalization with examples](https://www.studytonight.com/dbms/database-normalization.php)
* [Normalization and normal forms](https://hackr.io/blog/dbms-normalization)


## 2. Transactions

A transaction is a set of SQL commands that you want to treat as "one command." It has to either happen in full or not at all.

Imagine writing a program for transferring money from one bank account to another. To do that you have first to withdraw the amount from the source account, and then deposit it to the destination account. The operation has to succeed in full. If you there is an error halfway, the money will be lost.

To start transaction in MySQL we use the keyword `begin transaction;`. Then we execute the series of commands. For example, in our money transfer example: `UPDATE account SET balance = balance - 100 WHERE account_no = 987654 ;` then `UPDATE account SET balance = balance + 100 WHERE account_no = 123456 ;`. If there are no errors you can use `commit;` which makes the changes final in the database. If there was an error and you want to abort you can use `rollback;`. This will *undo* all the commands from the transaction.

To increase your understanding, study the following materials:

* [Transaction examples](https://www.w3resource.com/sql/controlling-transactions.php)



## 3. SQL injection

Some SQL clients accept input from user to fabricate the queries.
A malicious user can tweak the input so as to acquire more information from the database or
to destroy the database (literally!). Demo program `sql-injection.js` is in the `Week3` folder.

Consider the following query `SELECT name, salary FROM employees where id = X`.

#### Injection to get more information
```
If X is `101 OR 1=1`, then the query returns all records because 1=1 is always true
SELECT name, salary FROM employees where id = 101 OR 1=1;
```

#### Injection to destroy the database
```
If X is `101; DROP database mydb`, then the query will delete the entire database
SELECT name, salary FROM employees where id = 101; DROP database mydb;
```

To prevent SQL injection you have to use prepared statements. The diagram below summarizes nicely how prepared statements work:

![SQL injection](https://pics.me.me/prepared-statements-sol-injections-let-me-in-adult-swim-sol-62056759.png)

With prepared statements we instruct the database to treat certain parts of a query only as a string and nothing else. Even if the string is a valid command it will not be evaluated or executed. To make this as safe as possible the SQL query is sent first, followed by the parts which need to be treated as strings. The syntax for prepared statements is:

```
PREPARE example FROM SELECT name, salary FROM employees where id = ?;
SET @id = 5;
EXECUTE example USING @id
```

To increase your understanding check the following materials:
* [What is SQL injection?](https://www.youtube.com/watch?v=ciNHn38EyRc)
* [Prepared statements](https://www.databasejournal.com/features/mysql/a-guide-to-mysql-prepared-statements-and-parameterized-queries.html)

## 4. MongoDB

IGOR

## 5. Non-relational vs. relational

IGOR

# OLD THINGS, SHOULD BE DELETED IF NOT USED


## Pre-Class Readings

[This YouTube video by freeCodeCamp.org](https://www.youtube.com/watch?v=HXV3zeQKqGY) explains
all the important topics.

Also, please read the following page that explains database foreign keys.
- [What is a Database Foreign Key](http://databases.about.com/cs/specificproducts/g/foreignkey.htm)

### Understanding the asynchronous nature of database queries
Jim (@remarcmij) wrote these [excellent demo programs](https://github.com/remarcmij/database_examples)
for better understanding. Do check them out.


### Complicated values to store in MySQL
    - Storing prices (floating point errors)
    - Storing dates (datetime vs. timestamp)
    - datetime : fixed value (joining date of employee): has a calendar date and a wall clock time
    - timestamp : unix timestamp, seconds elapsed from 1 Jan 1970 00:00 in UTC (takes timezone into consideration)


## Reference Material

- [Floating Point Inaccuracy](http://stackoverflow.com/questions/2100490/floating-point-inaccuracy-examples#2100502)
- [Example Entity Relationship Diagram (including associative entities)](http://users.csc.calpoly.edu/~jdalbey/308/Lectures/HOWTO-ERD.html)
- Scaffolding tools:
    - [Yeoman](http://yeoman.io) - General framework for creating and scaffolding all types of projects
    - [Sails](http://sails.js) - Lightweight framework for generating APIs and web server apps in Node
    - [Loopback](http://loopback.io/) - A more "enterprise-ready" framework for generating and managing APIs.


