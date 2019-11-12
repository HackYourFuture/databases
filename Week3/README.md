# Reading Material Databases Week 3

## Agenda

1. Normalization and normal forms
2. Transactions
3. SQL injection and prepared statements
4. NoSQL - Mongo
5. Non-relational vs. relational

## 1. Normalization and normal forms

When seting up a database, one of the most important aspects to be taken into account is to ensure that duplication of data is minimized. This is done for 2 purposes:  
* Reducing the amount of storage needed to store the data.
* Avoiding unnecessary data conflicts that may creep in because of multiple copies of the same data getting stored.

Database normalization is a technique that helps in designing the database in an optimal manner so as to ensure the above points. The core idea of database normalization is to divide large tables into smaller subtables and store pointers to data rather than replicating it. 

There are various database “Normal” forms. Each normal form (NF) has an importance which helps in optimizing the database to save storage and to reduce redundancies. These normal forms build incrementally. e.g. a database is in 3NF if it is already in 2NF and satisfied the rules for 3rd normal form.

#### 1st normal form (1NF) (4 rules)

The rules for first normal form are:
* Rule 1 : Single valued attributes (each column should have atomic value, no multiple values)
* Rule 2 : Attribute domain should not change
* Rule 3 : Unique names for attributes / columns
* Rule 4 : Order does not matter

Did you get that? Neither did I! These normal form rules are writen abstractly in a hard-to-understand formal language. 

Let us look at an example:

| Customer ID |	First Name	| Surname |	Telephone Number |
|-------------|-------------|---------|------------------|
| 123 |	Pooja | Singh       |	555-861-2025, 192-122-1111 |
| 456 |	San |	Zhang       |	(555) 403-1659 Ext. 53; 182-929-2929 |
| 789 |	John |	Doe         |	555-808-9633 |

This table violates rule 1 because the column for telephone numbers has multiple values. The easiest way to fix this is to have two separate phone columns: one for a landline and one for mobile.

#### 2nd normal form (2NF)
There is only one rule for second normal form: no non-prime attribute should be functionally dependent on any proper subset of a candidate key. 

Can you believe that your teacher had to memorize this definition by heart? What a waste of brain capacity. In Hack Your Future we will not ask you to memorize things. Instead let us try and understand what this really means by looking at an example:

| Manufacturer |	Model	| Manufacturer country |
|-------------|-------------|---------|
| Apple |	MacBook Air	| United States |
| Apple |	Macbook Pro	| United States |
| Lenovo |	ThinkPad |	China |
| Lenovo |	IdeaPad  |	China |

This table violates the rule of 2NF because data in the column `Manufacturer country` depends on the `Manufacturer` column (which can be considered a subset of the key {`Manufacturer`,`Model`}). To make that database comply with the 2NF, we have to split up the table into two smaller tables:

| Manufacturer | Manufacturer country |
|-------------|-----------|
| Apple |	 United States |
| Lenovo |	China |

| Manufacturer |	Model	| 
|-------------|-------------|
| Apple |	MacBook Air	|
| Apple |	Macbook Pro	|
| Lenovo |	ThinkPad |
| Lenovo |	IdeaPad  |

#### 3rd normal form (3NF)
There is only one rule for third normal form:  No transitive dependency (i.e. no field should depend on non-key attributes).

This rule is very similar to the rule for 2NF with the exception that it applies to non-key attiriutes. The approach for making your database comply with 3NF is also similar: split up your table. You can find a complete example [here](https://en.wikipedia.org/wiki/Third_normal_form).

#### Higher normal forms

Besides these three normal forms, there are other higher normal forms, for example, the Boyce-Codd normal form (3.5 NF). Not all of these normal forms are equally important. Most of the time while designing databases you should aim for the third normal form. If you still did not get what are the rules for the differet normal forms, don't worry. Over time you will develop a feel for it.

To increase your understanding, study the following materials:

* [Database Normalization in Simple English](https://www.essentialsql.com/get-ready-to-learn-sql-database-normalization-explained-in-simple-english/)
* [Database Normalization with examples](https://www.studytonight.com/dbms/database-normalization.php)
* [Normalization and normal forms](https://hackr.io/blog/dbms-normalization)
* [Normal forms through examples](https://medium.com/@mattburgess/critical-concepts-normalization-f9b5b1bf417e)


## 2. Transactions

A transaction is a set of SQL commands that you want to treat as "one command." It has to either happen in full or not at all.

Imagine writing a program for transferring money from one bank account to another. To do that you have first to withdraw the amount from the source account, and then deposit it to the destination account. The operation has to succeed in full. If there is an error halfway, the money will be lost.

To start a transaction in MySQL we use the keyword `begin transaction;`. Then we execute a series of commands. More concretely, in our money transfer example: `UPDATE account SET balance = balance - 100 WHERE account_no = 987654 ;` and `UPDATE account SET balance = balance + 100 WHERE account_no = 123456 ;`. If there are no errors we use the command `commit;` which finalizes the changes from both update commands. If there was an error we can use the command `rollback;` which will *undo* the changes from all commands in the transaction.

Transactions are essentials when building aplications, since it is very rare that a functionality can be written as a single SQL command. To do anything usefull, several SQL commands need to be executed and in that case transactions are there to ensure that if something fails halfway the data does not stay in this half-changed state.

To increase your understanding, study the following materials:

* [Transaction examples](https://www.w3resource.com/sql/controlling-transactions.php)

## 3. SQL injection

When writing SQL queries, often part of the query is based on user input (either in a text field or via an http request).
A malicious user can tweak the input so as to acquire more information from the database or
to destroy the database (literally!). This is a very common form of hacker attack and is not difficult to do. Before I show you how to do this let me state the obvious:

**!! DON'T TRY THIS AT HOME, SQL INJECTION IS ILLEGAL! **

Demo program `sql-injection.js` is in the `Week3` folder.

Consider the following query `query = 'SELECT name, salary FROM employees where id = '+user_input;`. A hacker could use SQL injection in two ways:

** Injection to get more information **

If `user_input` is `101 OR 1=1`, then the query is `SELECT name, salary FROM employees where id = 101 OR 1=1;`. This will return all records because 1=1 is always true. In this way, a user could extract information from the database that he might not be supposed to access.


** Injection to destroy the database**

If `user_input` is `101; DROP database mydb`, then the system will treat this as two separate queries (since `;` is treated as a delimiter). The first query is the harmless `SELECT` command but the other query is the `DROP` command. This would... I think you get the point. To keep it short just remember that SQL injection is really dangerous.

### Prepared statements

To prevent SQL injection you have to use prepared statements. The diagram below summarizes nicely how prepared statements work:

![SQL injection](https://pics.me.me/prepared-statements-sol-injections-let-me-in-adult-swim-sol-62056759.png)

With prepared statements, we instruct the database to treat certain parts of a query only as a string and nothing else. Even if the string is a valid SQL command it will not be evaluated or executed. To make this as safe as possible the SQL query is sent first, followed by the parts which need to be treated as strings. The syntax for prepared statements is:

```
PREPARE example FROM SELECT name, salary FROM employees where id = ?;
SET @id = 5; // this is only treated as string, so that writing '5 OR 1 = 1' will not work anymore.
EXECUTE example USING @id
```

When writing an application you should always use prepared statements if user input is (potentially) part of the query.

To increase your understanding check the following materials:
* [What is SQL injection?](https://www.youtube.com/watch?v=ciNHn38EyRc)
* [Prepared statements](https://www.databasejournal.com/features/mysql/a-guide-to-mysql-prepared-statements-and-parameterized-queries.html)



## 4. NoSQL - Mongo

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


