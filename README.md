> If you are following the HackYourFuture curriculum we recommend you to start with module 1: [HTML/CSS/GIT](https://github.com/HackYourFuture/HTML-CSS). To get a complete overview of the HackYourFuture curriculum first, click [here](https://github.com/HackYourFuture/curriculum).

> Please help us improve and share your feedback! If you find better tutorials or links, please share them by [opening a pull request](https://github.com/HackYourFuture/JavaScript1/pulls).

# Module #6 - Databases: Store and retrieve data with MySQL (Backend)

![Databases](./assets/databases.png)

Have you ever thought about how your brain remembers things? It happens automatically for humans, but that's not so for computers. Any time you go to a website and you fill in some details, in say a form, that information needs to be saved somewhere. This "somewhere" is called a `database`.

In this module you'll learn all about a fundamental part of any software application: how to (safely) store data, so that it can be used on-demand. You'll learn how to structure and group data so your apps know where to find the correct data.

## Learning goals

In this module you will get familiar with the complexity of storing data. By the end of it you have learned:

- What the meaning is of a `database entity`
- How to work with `Structured Query Language` (SQL)
- Learn all about the `relational model`
- Recognize the basic setup of a database
- Know about MySQL as an example of a relational database system

## Before you start

Before you start you need to install the software we'll use to store our data: MySQL.

- Download the [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

Note: Make sure you select the right operating system: MacOS, Windows or Ubuntu/Linux.

After you've finished installing the software, open it through your command line interface:

- Windows users should use `Microsoft MySQL Command Line client`.
- Linux users should use `Gnome Terminal`
- MacOS users should use `Terminal`.

**Step 1: Creating a `root` user**

We first have to create a `root` user.

> A root user, also known as a `superuser` is a special user account that has access to all commands and files of any particular software.

Microsoft MySQL Command Line client gives you a `msql>` prompt after typing in your root password. Note that this password is the one you used for the `root user` of the mysql. Linux and MAC users can execute `mysql -uroot -p` and then type the password.

NOT FINISHEDDDD!!!!! io1j2eoi1j2i3oj1o23j12

**Step 2: Creating a `hyfuser` account**

After creating the root user, it's time to create the account we'll be using for this module. Execute the following commands, one after the other:

```
# Step 1: This command creates a user 'hyfuser' with password 'hyfpassword' for the database server at 'localhost'
mysql> create user 'hyfuser'@'localhost' identified with mysql_native_password by 'hyfpassword';


# If this does not work try the alternative command:
mysql> create user 'hyfuser'@'localhost' identified by 'hyfpassword';

# Step 2: This command gives all permissions to user 'hyfuser'. The (*.*) means every table of every database.
mysql> grant all privileges on *.* to 'hyfuser'@'localhost';

# Step 3: This command creates a database named 'userdb'
mysql> create database userdb;
```

For a step-by-step walkthrough on video, can watch the following video:

- [MySQL Installation on Linux (Ubuntu)](https://www.youtube.com/watch?v=Y_LibBhOGOY)

## Lesson Plan

### Lesson 1: MySQL and Node Setup! Create, Insert and Select !

Objective: This class aims to incorporate JavaScript code to operate the MySQL database.
MySQL client can be used to demonstrate SQL queries however, students should know how to
make a MySQL database connection from JavaScript, run queries from JavaScript and
capture results of queries in JavaScript.

### Lesson 2: Group by, Having and Joins. Promisification of JS client with prepared statements

Objective: This class introduces more clauses (group by, having) in the
select statement. MySQL joins (inner, self, left and right) should be explained
with demonstration (Employee table with **reportsTo** field and Department
table with its PK in Employee table is suitable for this demonstration).
Promise based JavaScript program with SQL prepared statements should be
understood by students. The program can be found in the Week2 folder (Credits:
@remarcmij)

### Lesson 3: Database design, normal forms, SQL injection

Objective: This class invites students to discuss Entity Relationship Diagram (ERD).
Students should be able to explain their choices of entities, relationships, attributes etc.
SQL injection should be explained with a demonstration (with a simple JS client).
Concepts of database transaction, ACID properties, normal forms should be introduced with
examples / live coding (creating a transaction, committing and rollback-ing).

## Planning

| Week | Topic                                                                        | Readings                       | Homework                       | Lesson Plan                           |
| ---: | ---------------------------------------------------------------------------- | ------------------------------ | ------------------------------ | ------------------------------------- |
|   1. | What's a database?, Structured Query Language (SQL), Connect with JavaScript | [Readings W1](week1/README.md) | [Homework W1](week1/MAKEME.md) | [Lesson Plan W1](week1/LESSONPLAN.md) |
|   2. | More SQL,                                                                    | [Readings W2](week2/README.md) | [Homework W2](week2/MAKEME.md) | [Lesson Plan W2](week2/LESSONPLAN.md) |
|   3. | Entity Relationship Diagram (ERD), SQL injection, ACID                       | [Readings W3](week3/README.md) | [Homework W3](week3/MAKEME.md) | [Lesson Plan W3](week3/LESSONPLAN.md) |

## Finished?

Did you finish the module? You're almost at the top!

If you feel ready for the next challenge, click [here](https://www.github.com/HackYourFuture/react) to go to React!

_The HackYourFuture curriculum is subject to CC BY copyright. This means you can freely use our materials, but just make sure to give us credit for it :)_

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
