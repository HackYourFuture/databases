> If you are following the HackYourFuture curriculum we recommend you to start with module
> 1: [HTML/CSS/GIT](https://github.com/HackYourFuture/HTML-CSS). To get a complete overview of the HackYourFuture
> curriculum first, click [here](https://github.com/HackYourFuture/curriculum).

> Please help us improve and share your feedback! If you find better tutorials or links, please share them
> by [opening a pull request](https://github.com/HackYourFuture/databases/pulls).

# Module #6 - Databases: Store and retrieve data with MySQL (Backend)

![Databases](./assets/databases.png)

Have you ever thought about how your brain remembers things? It happens automatically for humans, but that's not the case for computers. Any time you go to a website and fill in some details in a form for example, that information needs to be saved somewhere. This "somewhere" is called a `database`.

In this module, you learn all about a fundamental part of any software application: how to (safely) store data, so that it can be used on-demand. You will learn how to structure and group data so that your apps know where to find and store the correct data.

## Before you start

**Before** your first session, you need to install the necessary software: MySQL. This differs depending on your operating system.

During the installation of MySQL v8, in one of the last steps, you must configure the password encryption. Here is [a screenshot of the step](./assets/MySQL-security-setup.jpg). **You must select _Legacy_ for all the given scripts to be able to connect.**

- For Windows, download the [MySQL Community Server](https://dev.mysql.com/downloads/mysql/);
- For Linux (Ubuntu), watch the following;
  video: [MySQL Installation on Linux (Ubuntu)](https://www.youtube.com/watch?v=Y_LibBhOGOY)
- For MacOS, watch the following video: [Installing MySQL on MacOS](https://www.youtube.com/watch?v=HxCXyxFEA0s).

### Setup your first database

In this document, you find all the instructions on how to setup your first database. Most of the commands are done in the command line, so make sure you have yours open before you start.

**Step 1: Logging in with the `root` user**

To get started with your new MySQL client, we first have to login with the `root` user.

> A root user, also known as a `superuser` is a special user account that has access to all commands and files of any
> particular software.

In Windows OS, if you click on the Start menu and type `MySQL Command line Client`, then the MySQL Command Line Client gives you a `msql>` prompt after typing in your root password. Note that this password is the one you used for the `root user` of the MySQL during the installation. Linux and MAC users can execute `mysql -uroot -p` and then type your root password.

**Step 2: Creating a `hyfuser` account**

After loggin in with the root user, it's time to create the account that you will use for this module. Execute the following commands, one after the other:

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

We want to use MySQL with JavaScript and to this end, we use the following [package](https://github.com/mysqljs/mysql). You can create a project wherever you want and install it. To test that everything is working, you can use the `connection-test.js` file. If you run it it should output `The solution is: 2`.

## Learning goals

In this module, you get familiar with the complexity of storing data. By the end of it, you have learned:

- What is the meaning of a `database entity`;
- How to work with `Structured Query Language` (SQL);
- All about the `relational model`;
- How to recognise the `basic setup of a database`;
- Know about `MySQL` as an example of a relational database system;
- Know `NoSQL` databases, with an emphasis on `MongoDB`.

## How to use this repository

### Repository content

This repository consists of 3 essential parts:

1. `README`: this document contains all the required theory you need to understand **while** working on the weekly assignment. It contains not only the right resources to learn about the concepts, but also lectures done by HackYourFuture mentors. This is the **first thing** you should start with every week
2. `MAKEME`: this document contains the instructions for each week's assignment. Start with the exercises rather quickly, so that you can ground the concepts you read about earlier.
3. `LESSONPLAN`: this document is meant for mentors as a reference. However, as a trainee don't be shy to take a look at it as well!

### How to study

Let's say you are just starting out with the Databases module. This is what you do:

1. The week always starts on **Wednesday**. First thing you'll do is open the `README.md` for that week. For the first week of `Databases`, that would be [Week1 Reading](/Week1/README.md).
2. You spend **Wednesday** and **Thursday** going over the resources and try to get a basic understanding of the concepts. In the meanwhile, you must implement any feedback you received on the preceeding assignments (from the Node.js module).
3. On **Friday** you start with the weekly assignment, found in the `MAKEME.md`. For the first week of `Databases`, that would be [Assignment W1](/Week1/MAKEME.md).
4. You spend **Friday** and **Saturday** playing around with the exercises and write down any questions you might have.
5. **DEADLINE 1**: You submit any question you might have before **Saturday 23.59**, in the cohort channel.
6. On **Sunday** you attend the Q&A session. There will be no new material, instead your questions will be be discussed and you can learn from others.
7. You spend **Monday** and **Tuesday** finalizing your assignment.
8. **DEADLINE 2**: You submit your assignment to the right channels (GitHub) before **Tuesday 23.59**. If you can't make it on time, please communicate it with your mentor and Joséphine.
9. Start the new week by going back to point 1!

In summary:

![Weekflow](assets/weekflow.png)

To have a more detailed overview of the guidelines, please read [this document](https://docs.google.com/document/d/1JUaEbxMQTyljAPFsWIbbLwwvvIXZ0VCHmCCN8RaeVIc/edit?usp=sharing) or ask your mentor/cohort on Slack!

## Planning

| Week | Topic                                                                         | Readings                       | Assignment                       | Lesson Plan                           |
| ---: | ----------------------------------------------------------------------------- | ------------------------------ | ------------------------------ | ------------------------------------- |
|   1. | What's a database, Entities, Data structures, Structured Query Language (SQL) | [Readings W1](Week1/README.md) | [Assignment W1](Week1/MAKEME.md) | [Lesson Plan W1](Week1/LESSONPLAN.md) |
|   2. | Identifiers, Relationships, Domain Modeling, Advanced SQL commands            | [Readings W2](Week2/README.md) | [Assignment W2](Week2/MAKEME.md) | [Lesson Plan W2](Week2/LESSONPLAN.md) |
|   3. | Normalization, Transactions, SQL Injection, NoSQL basics (with MongoDB)       | [Readings W3](Week3/README.md) | [Assignment W3](Week3/MAKEME.md) | [Lesson Plan W3](Week3/LESSONPLAN.md) |
|   4. | NoSQL advanced commands, Pagination, SQL vs NoSQL                             | [Readings W4](Week4/README.md) | [Assignment W4](Week4/MAKEME.md) |  |

## Finished?

Did you finish the module? You're almost at the top!

If you feel ready for the next challenge, click [here](https://www.github.com/HackYourFuture/react) to go to React!

### Copyright

_The HackYourFuture curriculum is subject to CC BY copyright. This means you can freely use our materials, but just make sure to give us credit for it :)_

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />
This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons
Attribution 4.0 International License</a>.
