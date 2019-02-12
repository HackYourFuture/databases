# Lesson 3: Database design, normal forms, SQL injection

Objective: This class invites students to discuss Entity Relationship Diagram (ERD).
Students should be able to explain their choices of entities, relationships, attributes etc.
SQL injection should be explained with a demonstration (with a simple JS client).
Concepts of database transaction, ACID properties, normal forms should be introduced with
examples / live coding (creating a transaction, committing and rollback-ing).

## Pre-Class Readings

Before arriving to class on Sunday, please watch all of the videos in [this video playlist](https://www.lynda.com/SharedPlaylist/ae29ea2f495c432793abc220da47baa6) on Lynda.

Also, please read the following page that explains database foreign keys.
- [What is a Database Foreign Key](http://databases.about.com/cs/specificproducts/g/foreignkey.htm)

## Topics to be covered

### Entity Relationship Diagrams
    - Associative entities from many-to-many relationships
    - Boolean attribute instead of a table

### Normalization
Database Design following normal forms as a convention.
These normal forms build incrementally.
E.g. The database is in 3NF if it is already in 2NF and satisfied the
rules for 3rd normal form. Read [here] (https://www.studytonight.com/dbms/database-normalization.php) for more details.

#### 1NF (4 rules)
* Rule 1 : Single valued attributes (each column should have atomic value, no multiple values)
* Rule 2 : Attribute domain should not change
* Rule 3 : Unique names for attributes / columns
* Rule 4 : Order does not matter
#### 2NF
No partial dependency. (i.e. no field should depend on part of the primary key)
Example
```
Score table (student_ID, subject_ID, score, teacher)
Subject table (subject_ID, subject Name)
```
#### 3NF
No transitive dependency (i.e. no field should depend on non-key attributes).

#### Boyce Codd Normal Form (3.5 NF)
for any dependency A → B, A should be a super key.

#### 4NF
No multi-value dependency.

### Complicated values to store in MySQL
    - Storing prices (floating point errors)
    - Storing dates (datetime vs. timestamp)
    - datetime : fixed value (joining date of employee): has a calendar date and a wall clock time
    - timestamp : unix timestamp, seconds elapsed from 1 Jan 1970 00:00 in UTC (takes timezone into consideration)

### Database transactions
- A transaction is a set of commands that you want to treat as "one command." It has to either happen in full or not at all.

- A classical example is transferring money from one bank account to another. To do that you have first to withdraw the amount from the source account, and then deposit it to the destination account. The operation has to succeed in full. If you stop halfway, the money will be lost, and that is Very Bad.

### ACID properties

- **Atomicity** : states that database modifications must follow an “all or nothing” rule.
Each transaction is said to be “atomic.”
If one part of the transaction fails, the entire transaction fails.
- **Consistency** : states that only valid data will be written to the database. If, for some reason, a transaction is executed that violates the database’s consistency rules, the entire transaction will be rolled back, and the database will be restored to a state consistent with those rules.
- **Isolation** : requires that multiple transactions occurring at the same time not impact each other’s execution.
- **Durability** : ensures that any transaction committed to the database will not be lost. Durability is ensured through the use of database backups and transaction logs that facilitate the restoration of committed transactions in spite of any subsequent software or hardware failures.

### SQL injection

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
mysqljs prevents the second injection by not allowing multiple SQL statements
to be executed at once.

### Understanding the asynchronous nature of database queries
Jim (@remarcmij) wrote these [excellent demo programs](https://github.com/remarcmij/database_examples)
for better understanding. Do check them out.

## Reference Material

- [Floating Point Inaccuracy](http://stackoverflow.com/questions/2100490/floating-point-inaccuracy-examples#2100502)
- [Example Entity Relationship Diagram (including associative entities)](http://users.csc.calpoly.edu/~jdalbey/308/Lectures/HOWTO-ERD.html)
- Scaffolding tools:
    - [Yeoman](http://yeoman.io) - General framework for creating and scaffolding all types of projects
    - [Sails](http://sails.js) - Lightweight framework for generating APIs and web server apps in Node
    - [Loopback](http://loopback.io/) - A more "enterprise-ready" framework for generating and managing APIs.
