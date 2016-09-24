# hyf

# Database Systems
A (hopefully) practical introduction to databases

## What is a database? 
A place to store “things”. Could be as simple as a phone book (physical) or as complex as storing all the inventory for Amazon.com. 

## Why use databases? 
Easier than having data all over the place.  Puts the problem of collecting, storing, sorting and searching data in a single place. 

## Relational (RDBMS) vs NoSQL
There are two primary types of database systems - *relational and NoSQL*. Relational databases have tables that relate to one another and can be “joined” 
ACID vs BASE 

*Extra reading*  
MEAN (Mongo, Express, Angular, Node) vs LAMP (Linux, Apache, MySQL, PHP) - relational vs NoSQL databases and key value stores
http://www.cs.tut.fi/~tjm/seminars/nosql2012/NoSQL-Intro.pdf 
![CAP theorem](http://maxivak.com/wp-content/uploads/2011/07/media_httpfarm5static_mevIk.png)  
Source: [rdbms vs nosql](http://maxivak.com/rdbms-vs-nosql-databases/)

## Installing MySQL
[http://dev.mysql.com/doc/refman/5.7/en/windows-installation.html] USE THE MSI INSTALLER PLEASE! 

[https://dev.mysql.com/doc/refman/5.7/en/osx-installation-pkg.html] 

*Extra reading*
[https://www.udacity.com/course/intro-to-relational-databases--ud197]

## DDL
Designing and creating a database
Our goal is to extend the todo list example you started in node to use a database. First we will use a relational database (MySQL) and then we will do the same thing with a NoSQL databse (probably Mongo).

Our design should allow us to update data easily and avoid duplication while allowing flexibility 
*Extra reading* 
[https://en.wikipedia.org/wiki/Database_normalization]

### Creating tables 
Data types
IDs, unique IDs, keys, constraints
### Modifying tables 
Adding indices - why use indices? 
Importing and exporting data from MySQL

## SQL
What is SQL? Structured Query Language - originally developed to allow business users to access data on their own (that didn’t work so developers took it over). 

Basic operations - `select, insert, update, delete`

### The value of structure for sorting and searching

Joining data
Types of joins - inner, outer, 
Applications accessing databases
Database drivers
Accessing your data from node.js 
Issuing queries and parsing results


## NoSQL
We'll start using Mongo since it's part of the MEAN stack so let's install that first. 
Installing Mongo on Windows - [https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/]
Installing Mongo on Mac - [https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/]
What’s the difference? The language looks the same ([http://www.planetcassandra.org/try-cassandra/]) 
Key/value stores (Redis) vs NoSQL dbs

