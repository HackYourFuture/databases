> If you are following the HackYourFuture curriculum we recommend you to start with module 1: [HTML/CSS/GIT](https://github.com/HackYourFuture/HTML-CSS). To get a complete overview of the HackYourFuture curriculum first, click [here](https://github.com/HackYourFuture/curriculum).

> Please help us improve and share your feedback! If you find better tutorials or links, please share them by [opening a pull request](https://github.com/HackYourFuture/JavaScript1/pulls).

# Module #6 - Databases: Store and retrieve data with MySQL (Backend)

![Databases](./assets/databases.png)

Have you ever thought about how your brain remembers things? It happens automatically for humans, but that's not so for computers. Any time you go to a website and you fill in some details, in for example a form, that `information` needs to be saved somewhere. This "somewhere" is called a `database`.

In this module you'll learn all about a fundamental part of any software application: how to (safely) store data, so that it can be used on-demand. You'll learn how to structure and group data so your apps know where to find and store the correct data.

## Learning goals

In this module you will get familiar with the complexity of storing data. By the end of it you have learned:

- What the meaning is of a `database entity`
- How to work with `Structured Query Language` (SQL)
- Learn all about the `relational model`
- Recognize the `basic setup of a database`
- Know about `MySQL` as an example of a relational database system
- Learn about `NoSQL` databases, with an emphasis on `MongoDB`

## Before you start

Before you start you need to install the necessary software: MySQL.

### Installation on Windows machine
Download the [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

### Installation on Linux (Ubuntu)
[MySQL Installation on Linux (Ubuntu)](https://www.youtube.com/watch?v=Y_LibBhOGOY) if you are using Ubuntu Linux.

### Installation on MAC
Open the `Terminal` to type following commands.

1. Install Homebrew if you don't have it:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

2. Install MySQL server and client using `brew install mysql`.

After you've finished installing the software, open it through your command line interface:

- Windows users should use `Microsoft MySQL Command Line client`.
- Linux users should use `Gnome Terminal`
- MacOS users should use `Terminal`.

**Step 1: Logging in with the `root` user**

To get started with your new MySQL client, we first have to login with the `root` user.

> A root user, also known as a `superuser` is a special user account that has access to all commands and files of any particular software.

In Windows OS, if you click on the Start menu and type `MySQL Command line Client`, then
the MySQL Command Line Client gives you a `msql>` prompt after typing in your root password.
Note that this password is the one you used for the `root user` of the mysql during the installation.
Linux and MAC users can execute `mysql -uroot -p` and then type your root password.

**Step 2: Creating a `hyfuser` account**

After loggin in with the root user, it's time to create the account we'll be using for this module. Execute the following commands, one after the other:

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

**Step 3: Installing MySQL drivers for node**

We want to use MySQL with JavaScript and to this end, we use [mysqljs driver](https://github.com/mysqljs/mysql).
* Use `npm install -g mysql` command to install them.
* Run `node connection-test.js` by navigating to the `Week1` folder from the VScode terminal.

The output should be `The solution is: 2`.


## Planning

| Week | Topic                                                                         | Readings                       | Homework                       | Lesson Plan                           |
| ---: | ----------------------------------------------------------------------------- | ------------------------------ | ------------------------------ | ------------------------------------- |
|   1. | What's a database, Entities, Data structures, Structured Query Language (SQL) | [Readings W1](Week1/README.md) | [Homework W1](Week1/MAKEME.md) | [Lesson Plan W1](Week1/LESSONPLAN.md) |
|   2. | Identifiers, Relationships, Domain Modeling, Advanced SQL commands            | [Readings W2](Week2/README.md) | [Homework W2](Week2/MAKEME.md) | [Lesson Plan W2](Week2/LESSONPLAN.md) |
|   3. | Normalization, Transactions, SQL Injection, NoSQL (with MongoDB)              | [Readings W3](Week3/README.md) | [Homework W3](Week3/MAKEME.md) | [Lesson Plan W3](Week3/LESSONPLAN.md) |

## Finished?

Did you finish the module? You're almost at the top!

If you feel ready for the next challenge, click [here](https://www.github.com/HackYourFuture/react) to go to React!

_The HackYourFuture curriculum is subject to CC BY copyright. This means you can freely use our materials, but just make sure to give us credit for it :)_

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
