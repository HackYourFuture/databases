> This homework assumes you have installed the software [MySQL](https://dev.mysql.com/downloads/installer/) to your computer. If not please do that first!

# Homework Databases Week 1

## **Todo list**

1. Practice the concepts
2. MySQL exercises
3. Code along
   <!-- 4. PROJECT: Hack Your World -->

## 1. **Practice the concepts**

Let's start this week off with some interactive exercises. Check out the following to get started writing your first queries! In the following online course, **do sections 3 (Manipulation) and sections 4 (Queries)**.

- [Codecademy: Learn SQL](https://www.codecademy.com/learn/learn-sql)

## 2. **MySQL exercises**

## 3. **Code along**

In this week's code along you won't be building a complete app, but get familiar with using MySQL together with Node.js.

- [Using MySQL with Node.js](https://www.youtube.com/watch?v=EN6Dx22cPRI)

## 4. **PROJECT: Hack Your World**

# Homework week 1

This week you'll be writing a Node.js file that makes a connection to a MySQL database instance. These are the requirements that the file must have:

## Part 1 : More SQL queries through JS program

Write a node-JS program to get answers of following queries
on the **new_world** database: Note that you are expected to get the input from user
and use **prepared** statements to write the queries.

Hint: use [this](https://github.com/mysqljs/mysql) link to read more
about prepared statements.

1. What is the capital of country X ? (Accept X from user)
2. List all the languages spoken in the region Y (Accept Y from user)
3. Find the number of cities in which language Z is spoken (Accept Z from user)
4. Accept the region and language from the user.
   Are there any countries in this region with the given language
   as the official language ?
   If yes, display those countries.
   If no, display FALSE.
   E.g.
   (A) input region : 'Western Europe' and input language : 'Dutch'
   output should be Belgium and Netherlands
   (B) input region : 'Western Europe' and input language : 'Hindi'
   output should be 'FALSE'
5. List all the continents with the number of languages spoken in each continent

## Part 2 : SQL research

I want to get alerts when a country has >= 10 languages.
E.g. If a country X has 9 languages in the CountryLanguage table,
and a user INSERTs one more row in the CountryLanguage table, then I should get an alert.
_How can I achieve this ?_

- Write the necessary SQL statements for this solution and
- Test your solution with example insert statements.

## Part 3 : Database design

I want to develop a ToDo app in which a user can create a multiple
ToDo lists with different purposes. Each list has at least one item.
Each item can be tagged. Each item can be marked completed.
There could be reminders for some items.

- Draw an Entity Relationship Diagram for the database of the ToDo App.

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! The homework that needs to be submitted is the following:

1. MySQL exercises
2. PROJECT: Hack Your World

Upload both to your forked Databases repository in GitHub. Make a pull request to HackYourFuture's forked repository.

> Forgotten how to upload your homework? Go through the [guide](../hand-in-homework-guide.md) to learn how to do this again.

_Deadline Saturday 23.59 CET_
