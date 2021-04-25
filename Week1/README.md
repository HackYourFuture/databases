# Reading Material Databases Week 1

## Agenda

These are the topics for week 1:

1. What is an information (system)?
2. What are entities?
3. What is a database?
4. What is the role of a database in an application?
5. What is Structured Query Language (SQL)?
6. What are data types (as applied to databases)?
7. How to use SQL to Create, Read, Update and Delete (CRUD)
8. What is a database dump?

   <!-- - SQL vs. NoSQL
   - When to use either an SQL or NoSQL database?
   - What is MySQL? -->

   <!-- 9. The role of a database in a full-stack application
   - What does a database do for our apps?
   - How to connect with Node.js -->

## 0. Video Lectures

Your teachers Igor and Unmesh have made video lectures for this week's material. You can find them here: [Videos 1 - 8](https://www.youtube.com/playlist?list=PLVYDhqbgYpYVq-rHFB1x2-P7esnWotCB7)

<a href="https://www.youtube.com/playlist?list=PLVYDhqbgYpYVq-rHFB1x2-P7esnWotCB7" target="_blank"><img src="../assets/playlist-thumbnail.png" width="600" height="350" alt="HYF Video" /></a>

## 1. What is an information (system)?

Information is something that adds knowledge. It tells you something you didn't know before.

For example:

_"At 9:30 on Sunday November 10th 2019 Wouter Kleijn was walking on the Sarphatistraat in Amsterdam."_

This is information because it adds knowledge: you now know where Wouter was at a particular point in time. For a computer this might be a bit difficult to understand though because it is just an English sentence.

It's much easier if you structure it this way:

- Address:
  - Street: Sarphatistraat
  - City: Amsterdam
- Who: Wouter Kleijn
- When: 2019-11-10T09:30:00+01:00 (+01:00 refers to the Amsterdam timezone)
- Activity: Walking

A database will allow you to store structured information and at a later point in time retrieve that information again.

You can ask the database:

_"Who was walking on the Sarphatistraat on November the 10th 2019?"_

and the database will tell us: _"Wouter Kleijn"_.

For further study, check out the following:

- [What is an information system](https://www.youtube.com/watch?v=Qujsd4vkqFI)

## 2. What are entities?

You abstract (generalize) to make sense of the world. You do it everywhere, all the time. Even without thinking about it.
As Zachery Tellman states: "To abstract is to treat things which are different as equivalent".
You speak of a dog called Bello, and since it's a dog you also know that Bello is an animal and a pet.
This is not something that Bello will tell you, humans made all this up.
Dog, animal, pet, humans, all these are abstractions.

One way of abstracting is to think of entities and their relationships.
An entity is an abstraction. It represents a certain category of things, like:
humans, women, men, animals, pets, broken bicycles, chairs, music, teachers, chewing gum, and planets.
You can think of a **pet** as an entity that has a relationship to another entity **human**, its owner.
More formally you can say a **human** owns **zero or more** **pets**.

When creating an application you need to think of all the entities and their relationships
that are relevant to our application, you call this the application's **domain**.
Together these entities and relationships form the **domain model** for your application.

Learn more about entities with the following resources:

- [Entities vs. Database](https://www.youtube.com/watch?v=hBu2pdphYaA)
- [Entities, Attributes, and Relationships](https://www.youtube.com/watch?v=hveVlCHZtsI)

## 3. What is a database?

A database's primary purpose is to provide a mechanism for `storing` and `retrieving` structured information.

There are many different types of databases but they all provides these two capabilities.

If you just consider these two properties (information storage and retrieval)
you could implement a database using just a JavaScript array:

1. `Information storage`. Pushing onto the array adds knowledge:

```js
const musicians = [
  "John Coltrane",
  "Miles Davis",
  "Thelonious Monk",
  "Sonny Rollins",
];

musicians.push("Steve Lehman");
```

2. `Information retrieval`. Using the `[]` operator you can access what was previously stored:

```js
console.log(musicians[0]); // prints: 'John Coltrane'
```

While this JavaScript database is a nice and simple example, it doesn't persist the data for the next day.

In this module you will focus primarily on persisting databases, in particular the relational database MySQL.

To learn more, check out the following resources:


- [What is a database?](https://www.youtube.com/watch?v=t8jgX1f8kc4)

## 4. What is the role of a database in an application?

A database setup typically involves two components, a server and a client.

The server is the actual database management system (DBMS) and runs as a process on a machine either on your computer or on another computer in a data center somewhere.
Unlike applications that you are used to, DBMSes usualy do not come with a user interface.
The database server application can only be given commands using the CLI or using a separate client.

The client is  a program that talks to the DBMS server, so it has to know where that server is running.
The client then creates a [TCP connection](https://www.youtube.com/watch?v=EkNq4TrHP_U) to the server.

A client would be your web application talking to the database or a GUI to interact with your database during development.
Examples of free GUIs are [SequelPro for mac](https://www.sequelpro.com) and [HeidiSQL for Windows](https://www.heidisql.com/).
These GUIs allow you to easily show the structure and contents of your database, and run your own queries.

To do this the client needs to know:

- the server's address
  - an IP address like _192.168.1.5_
  - or a name like _my-db-server_
- a username
- a password
- the name of the database (optionally)

The reason why you would want to use a database is that you can store information in a reliable and structured way. The database will ensure your information is stored safely (if setup correctly), with a high degree of reliability. The database also allows you to structure your information in such a way that we're able to find what we're looking for.

- [What problems do database solve?](https://www.youtube.com/watch?v=Ls_LzOZ7x0c)

## 5. What is Structured Query Language (SQL)?

SQL (Structured Query Language) is a programming language used for managing the data that is stored in a DBMS (DataBase Management System). The `Query` part in SQL refers to the act of "asking a database" for a certain type of information; you are `querying the database`.

There are several implementations (software) of DBMS. Each software provides its own query language. For this course, you will learn [MySQL](https://www.mysql.com/).

To learn more, check out the following:

- [The Structured Query Language (SQL)](https://www.youtube.com/watch?v=kqUIoOM3WEs)

## 6. What are data types (as applied to databases)?

When you store data in MySQL, each datum (singular of the word data) needs to be associated with its type.

For example numbers like 42, 1636 or -345 are all associated with the type `int`.

The following is a list of the most frequently used data types.

| Type       | Description                                   | Example Value           |
| ---------- | --------------------------------------------- | ----------------------- |
| int        | Numbers                                       | 42                      |
| float      | Decimal numbers                               | 3.14                    |
| varchar(N) | String with variable maximum of N characters  | "Dragon"                |
| text       | String with fixed maximum of 65535 characters | "Positive"              |
| datetime   | Store date and time without timezone          | 2019-01-01 22:10:23     |
| timestamp  | Store date with timezone (e.g. last login)    | 2019-01-01 22:10:23 UTC |
| BLOB       | Store binary files                            | an image                |

There are many more data types. You can read about them [here](https://www.w3resource.com/mysql/mysql-data-types.php).

## 7. How to use SQL to Create, Read, Update and Delete (CRUD)

With the knowledge of all the datatypes, you can now create tables that contain the data with these datatypes.

Tables contain columns and columns have datatypes. For example, in a column with names of students,
you cannot have numbers.

- MySQL provides a `CREATE TABLE` statement that creates a table with columns. You can choose the table name, column names but you have to choose the pre-defined datatypes supported by MySQL. For example, a column `Registration number` cannot have the data type number. It must use `int` because it represents the numeric datatype.

- MySQL provides `SELECT` statement which reads (columns and rows) from a table with or without filtration.

- MySQL provides `UPDATE` statement which changes the contents of (columns and rows of) a table.

- MySQL provides `DELETE` statement which can delete rows of tables. In order to delete columns, you need to use `ALTER` and `DROP` statements.

Check out the following to learn more about how to apply SQL:

- [Learn basic SQL in 10 minutes](https://www.youtube.com/watch?v=bEtnYWuo2Bw)
- [Learn Basic SQL Commands](https://www.youtube.com/watch?v=OlT3FispsMU)

## 8. What is a database dump?

A database `dump` (aka SQL dump) contains a record of the table structure and/or the data from a database and is usually in the form of a list of SQL statements. (An example file named `world.sql` is present in the Week1 folder, look for `databases`)

1. Collecting the dump of an existing database from terminal `mysqldump -uroot -p database_name > dump-file.sql`
2. Applying the dump from mysql command prompt (`mysql>`) `source /path/to/the/dump/file`
3. Applying the dump from the terminal(with generally a dollar prompt `$`) `mysql -uroot -p [database] < /path/to/the/dump/file`

## Finished?

Are you finished with going through the materials? High five! If you feel ready to get practical, click [here](./MAKEME.md).
