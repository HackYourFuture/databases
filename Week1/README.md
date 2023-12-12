# Setup your first database

Follow these steps if you missed them from
the [home page of the repository](https://github.com/HackYourFuture/databases).

In this document you'll learn how to setup your first database. Most of the commands are done in the command line, so
make sure you have yours open before you start.

**Step 1: Logging in with the `root` user**

To get started with your new MySQL client, we first have to login with the `root` user.

> A root user, also known as a `superuser` is a special user account that has access to all commands and files of any
> particular software.

In Windows OS, if you click on the Start menu and type `MySQL Command line Client`, then
the MySQL Command Line Client gives you a `msql>` prompt after typing in your root password.
Note that this password is the one you used for the `root user` of the mysql during the installation.
Linux and MAC users can execute `mysql -uroot -p` and then type your root password.

**Step 2: Creating a `hyfuser` account**

After loggin in with the root user, it's time to create the account we'll be using for this module. Execute the
following commands, one after the other:

```bash
# Step 1: This command creates a user 'hyfuser' with password 'hyfpassword' for the database server at 'localhost'

mysql> create user 'hyfuser'@'localhost' identified with mysql_native_password by 'hyfpassword';

# If this does not work try the alternative command:

mysql> create user 'hyfuser'@'localhost' identified by 'hyfpassword';

# Step 2: This command gives all permissions to user 'hyfuser'. The (*.*) means every table of every database.

mysql> grant all privileges on *.* to 'hyfuser'@'localhost';

# Step 3: This command flushes all privileges so that mysql reloads the grant table and our changes are enabled

msyql> flush privileges;

# Step 4: This command creates a database named 'userdb'

mysql> create database userdb;
```

**Step 3: Installing MySQL driver to use with Node.js**

We want to use MySQL with JavaScript and to this end, we use the following [package](https://github.com/mysqljs/mysql).
You can create an project wherever you want and install it. To test everything is working you can use
the `connection-test.js` file. If you run it it should output `The solution is: 2`.

# Reading Material Databases Week 1

## Agenda

These are the topics for week 1:

1. [Introduction to databases](https://hackyourfuture.github.io/study/#/databases/README)
    - What is an information (system)?
    - What are entities?
    - What is a database?
    - What is the role of a database in an application?
2. [Introduction to Structured Query Language (SQL)](https://hackyourfuture.github.io/study/#/databases/sql/README)
    - What are data types (as applied to databases)?
    - How to use SQL to Create, Read, Update and Delete (CRUD)
3. [Using database dumps](https://hackyourfuture.github.io/study/#/databases/sql/dumps)
4. [Career Training II (Interview preparation)](https://github.com/HackYourFuture/interviewpreparation)

## Week goals

This week we want to introduce you to the world of databases! We will start with a general introduction of what databases are, go over some terms and explain how to start thinking about your application's data. Have a look at the introduction [here](https://hackyourfuture.github.io/study/#/databases/README).

In this module, we will be cover both the relational type of databases (SQL), as well as document based databases (NoSQL). For now you do not need to know the difference, that will become apparent when we have covered both. We will start by going into relational database by learning about SQL, which is the language used when interacting with most relational databases. Have a look [here](https://hackyourfuture.github.io/study/#/databases/sql/README).

Lastly, let's go over some practical information that will allow you to save your databases and share it with others! Learn all about database dumps [here](https://hackyourfuture.github.io/study/#/databases/sql/dumps).

## Career training II (Interview preparation)
Finally, it is time to continue with developing your soft skills to ace those job interviews. For that, have a look at the [interview preparation repo](https://github.com/HackYourFuture/interviewpreparation). It is a lot to get through, so you may need some time next week as well. There is an assignment for the career training next week, you can already have a look at it if you find these things difficult.

## Finished?

Are you done going through the materials? High five! If you feel ready to get practical,
click [here](./MAKEME.md).
