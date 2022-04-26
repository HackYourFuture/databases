> If you are following the HackYourFuture curriculum we recommend you to start with module 1: [HTML/CSS/GIT](https://github.com/HackYourFuture/HTML-CSS). To get a complete overview of the HackYourFuture curriculum first, click [here](https://github.com/HackYourFuture/curriculum).

> Please help us improve and share your feedback! If you find better tutorials or links, please share them by [opening a pull request](https://github.com/HackYourFuture/JavaScript1/pulls).

# Module #6 - Databases: Store and retrieve data with MySQL (Backend)

![Databases](./assets/databases.png)

Have you ever thought about how your brain remembers things? It happens automatically for humans, but that's not so for computers. Any time you go to a website and you fill in some details, in for example a form, that `information` needs to be saved somewhere. This "somewhere" is called a `database`.

In this module you'll learn all about a fundamental part of any software application: how to (safely) store data, so that it can be used on-demand. You'll learn how to structure and group data so your apps know where to find and store the correct data.

## Before you start

**Before** your first class you start you need to install the necessary software: MySQL. This differs depending on your operating system:

During installation of MySQL v8, in one of the last steps you will configure the password encryption.
Here is [a screenshot of the step](https://i.stack.imgur.com/nFnWV.jpg).
**You must select _Legacy_ for all the given scripts to be able to connect.**

- For Windows, download the [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- For Linux (Ubuntu), watch the following video: [MySQL Installation on Linux (Ubuntu)](https://www.youtube.com/watch?v=Y_LibBhOGOY)
- For MacOS, watch the following video: [Installing MySQL on MacOS](https://www.youtube.com/watch?v=HxCXyxFEA0s)

Afterwards, read the following [document](./setup-db.md) to learn how to setup your database **before** your first class.

## Learning goals

In this module you will get familiar with the complexity of storing data. By the end of it you have learned:

- What the meaning is of a `database entity`
- How to work with `Structured Query Language` (SQL)
- Learn all about the `relational model`
- Recognize the `basic setup of a database`
- Know about `MySQL` as an example of a relational database system
- Learn about `NoSQL` databases, with an emphasis on `MongoDB`

## How to use this repository

### Repository content

This repository consists of 3 essential parts:

1. `README`: this document contains all the required theory you need to understand **while** working on the homework. It contains not only the right resources to learn about the concepts, but also lectures done by HackYourFuture teachers. This is the **first thing** you should start with every week
2. `MAKEME`: this document contains the instructions for each week's homework. Start with the exercises rather quickly, so that you can ground the concepts you read about earlier.
3. `LESSONPLAN`: this document is meant for teachers as a reference. However, as a student don't be shy to take a look at it as well!

### How to study

Let's say you are just starting out with the Databases module. This is what you do...

1. The week always starts on **Wednesday**. First thing you'll do is open the `README.md` for that week. For the first week of `Databases`, that would be [Week1 Reading](/Week1/README.md)
2. You spend **Wednesday** and **Thursday** going over the resources and try to get a basic understanding of the concepts. In the meanwhile, you'll also implement any feedback you got on last week's homework (from the Node.js module)
3. On **Friday** you start with the homework, found in the `MAKEME.md`. For the first week of `Databases`, that would be [Week1 Homework](/Week1/MAKEME.md)
4. You spend **Friday** and **Saturday** playing around with the exercises and write down any questions you might have
5. **DEADLINE 1**: You'll submit any questions you might have before **Saturday 23.59**, in the class channel
6. On **Sunday** you'll attend class. It'll be of the Q&A format, meaning that there will be no new material. Instead your questions shall be discussed and you can learn from others
7. You spend **Monday** and **Tuesday** finalizing your homework
8. **DEADLINE 2**: You submit your homework to the right channels (GitHub) before **Tuesday 23.59**. If you can't make it on time, please communicate it with your mentor
9. Start the new week by going back to point 1!

In summary:

![Weekflow](assets/weekflow.png)

To have a more detailed overview of the guidelines, please read [this document](https://docs.google.com/document/d/1JUaEbxMQTyljAPFsWIbbLwwvvIXZ0VCHmCCN8RaeVIc/edit?usp=sharing) or ask your mentor/class on Slack!

## Planning

| Week | Topic                                                                         | Readings                       | Homework                       | Lesson Plan                           |
| ---: | ----------------------------------------------------------------------------- | ------------------------------ | ------------------------------ | ------------------------------------- |
|   1. | What's a database, Entities, Data structures, Structured Query Language (SQL) | [Readings W1](Week1/README.md) | [Homework W1](Week1/MAKEME.md) | [Lesson Plan W1](Week1/LESSONPLAN.md) |
|   2. | Identifiers, Relationships, Domain Modeling, Advanced SQL commands            | [Readings W2](Week2/README.md) | [Homework W2](Week2/MAKEME.md) | [Lesson Plan W2](Week2/LESSONPLAN.md) |
|   3. | Normalization, Transactions, SQL Injection, NoSQL basics (with MongoDB)       | [Readings W3](Week3/README.md) | [Homework W3](Week3/MAKEME.md) | [Lesson Plan W3](Week3/LESSONPLAN.md) |
|   4. | NoSQL advanced commands, Pagination, SQL vs NoSQL                             | [Readings W4](Week4/README.md) | [Homework W4](Week4/MAKEME.md) |  |

## Finished?

Did you finish the module? You're almost at the top!

If you feel ready for the next challenge, click [here](https://www.github.com/HackYourFuture/react) to go to React!

_The HackYourFuture curriculum is subject to CC BY copyright. This means you can freely use our materials, but just make sure to give us credit for it :)_

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
