> This assignment assumes you have installed the software [MySQL](https://dev.mysql.com/downloads/installer/) on your
> computer. If not, please do that first!

# Assignment Databases Week 1

## Todo list

1. Practice the concepts
2. Prep exercises
3. MySQL exercises
4. Code along
5. Career Training 2 (If not completed yet)

## 1. Practice the concepts

Let's start this week off with some interactive exercises. Check out the following to get started writing your first
queries! In the following online course, **do sections 1 (Manipulation) and sections 2 (Queries)**.

- [Codecademy: Learn SQL](https://www.codecademy.com/learn/learn-sql)

Also make time to do lesson 1-5 from the following:

- [SQLBolt](https://sqlbolt.com/lesson/select_queries_introduction)

## 2. Prep exercises

> Prep exercises are exercises that you should work on _before_ the session on Sunday. These are a little more difficult
> or show an important concept and as such are a great exercise to talk about with your mentor. Have a solution ready by
> Sunday as you may be asked to show what you did.

The [QA_PREP_EXERCISE.md](./QA_PREP_EXERCISE.md) file explains what needs to be done for the prep exercise this week.
There will also be some questions at the bottom to think about. Go through them _before_ the session on Sunday as it
will be covered then.

## 3. MySQL exercises

> You will need to do some research to solve these exercises. NOT all the concepts necessary to solve
> these exercises are covered in the reading material. This is on purpose.

### 3.1. Exercise 1: Create and insert queries

Write a JavaScript file (to be executed with Node.js) that creates and makes a connection to a MySQL database. Do so
using the `mysql` package (https://www.npmjs.com/package/mysql).

Remember, It's always better to test your queries as soon as you have created them. Feel free to first write them in any
SQL viewer tool or MySQL console before writing the Node program.

1. Create a database called `meetup`
2. Make a connection to your database, using your MySQL `hyfuser` login credentials
3. Create a table called `Invitee` with the following fields (`invitee_no`, `invitee_name` and `invited_by`)
4. Create a table called `Room` with the following fields (`room_no`, `room_name` and `floor_number`)
5. Create a table called `Meeting` with the following fields (`meeting_no, meeting_title, starting_time, ending_time`
   ,`room_no`)
6. Insert 5 rows into each table with relevant fields. Find a way to create the data for those fields
7. Test your code by executing `node <FILE_NAME>` in the terminal. Then check your MySQL database and see if everything
   has been created as expected. Please, be sure your file can be run more than once. You can drop and create the
   database every time the file is run.

### 3.2. Exercise 2 : Select queries on the "world" database

> For this part of the assignment, use the `world.sql` file in the `week1/databases` folder to create the database and
> tables. Before you go on, execute the file to create a database instance of the `world` database, using mysql console or
> any tool. Test to see if it's created. Make sure all the tables (`city`, `country` and `countrylanguage`) and the
> containing data are there.

Write a JavaScript file (to be executed with Node.js) that queries (using select statements) the `world` database. The
results given back should answer following questions:
Don't omit to test your queries evey time.

1. What are the names of countries with population greater than 8 million?
2. What are the names of countries that have “land” in their names?
3. What are the names of the cities with population in between 500,000 and 1 million?
4. What's the name of all the countries on the continent ‘Europe’?
5. List all the countries in the descending order of their surface areas.
6. What are the names of all the cities in the Netherlands?
7. What is the population of Rotterdam?
8. What's the top 10 countries by Surface Area?
9. What's the top 10 most populated cities?
10. What is the population number of the world?

After you've written your **tested** queries, test to see if everything work by executing `node <FILE_NAME>`.

## 4. Code along

In this week's code along you won't be building a complete app, but get familiar with using MySQL together with Node.js.

- [Using MySQL with Node.js](https://www.youtube.com/watch?v=EN6Dx22cPRI)

## **5. Career Training 2 (If not completed yet)**

Remember that the Career Training 2 session is coming up (check your cohort channel on slack for the exact date). Before the session make sure you have:

- Read the whole [‘Interview Preparation’ Repo](https://github.com/HackYourFuture/interviewpreparation).
- Done the assignment: make a copy of [this file](https://docs.google.com/document/u/2/d/114rTGS4eG6tpkrMAyVIdvgTrnpmkRL6ax_smkw1B0HI/copy) and submit your answers to the team [here](https://hackyourfuture.typeform.com/to/s6zYAugm).

## SUBMIT YOUR ASSIGNMENT!

After you've finished your todo list it's time to show us what you got! The assignment that needs to be submitted is the
following:

1. MySQL exercises

Upload your code to your forked Databases repository in GitHub. Make a pull request to `HackYourHomework/databases`
repository.

> Forgotten how to upload your assignment? Go through the [guide](../hand-in-assignments-guide.md) to learn how to do this
> again.

_Deadline Tuesday 23.59 CET_
