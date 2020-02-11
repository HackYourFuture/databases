# Lesson Plan Databases Week 1

The lesson plan is primarily written for teachers so that they can
use examples and anecdotes from this document in conjunction with the README
and explain the concepts better in the class.

##  Topics (essentially same as the README file)
1. What is an information (system)?
2. What are entities?
3. What is a database?
4. What is the role of a database in an application?
5. What is Structured Query Language (SQL)?
6. What are data types (as applied to databases)?
7. How to use SQL to Create, Read, Update and Delete (CRUD)
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
Jeep model Renegade with the number NL65JY is an instance of the *car entity*.
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
### Example (of  DBMS implementations)
MySQL, MongoDB, PostgreSQL, DynamoDB etc.
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
SQL supporst variety of command to interact with the database.

## 6. What are data types (in the context of  databases)?
### Explanation
When the data is stored in a database. It must be classified appropriately.
Numbers must be stored differently than a string of alphabets.
Boolean values need much less space than a BLOB (Binary Large OBject) of image.
### Example
### Exercise
### Essence
## 7. How to use SQL to Create, Read, Update and Delete (CRUD)
### Explanation
### Example
### Exercise
### Essence
## 8. What is a database dump?
### Explanation
### Example
### Exercise
### Essence
