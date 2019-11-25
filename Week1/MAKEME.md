> This homework assumes you have installed the software [MySQL](https://dev.mysql.com/downloads/installer/) to your computer. If not please do that first!

# Homework Databases Week 1

## **Todo list**

1. Practice the concepts
2. MySQL exercises
3. Code along

## 1. **Practice the concepts**

Let's start this week off with some interactive exercises. Check out the following to get started writing your first queries! In the following online course, **do sections 1 (Manipulation) and sections 2 (Queries)**.

- [Codecademy: Learn SQL](https://www.codecademy.com/learn/learn-sql)

Also make time to do lesson 1-4 from the following:

- [SQLBolt](https://sqlbolt.com/lesson/select_queries_introduction)

## 2. **MySQL exercises**

**Exercise 1: Create and insert queries**

Write a JavaScript file (to be executed with Node.js) that creates and makes a connection to a MySQL database. Do so using the `mysql` package (https://www.npmjs.com/package/mysql).

> Before working on the exercise, first get a working version of the [example](https://www.npmjs.com/package/mysql#introduction) going. This will help you understand the basic structure of making a database connection and query. When doing this, make sure you replace the `user`, `password` and `database` values with the ones you've created for HackYourFuture: `hyfuser`, `hyfpassword` and `user_db`.

When you feel familiar with the library, you can go on with the exercise. Inside of your JavaScript file, make queries that:

1. Create a database called `company`
2. Make a connection to your database, using your MySQL `hyfuser` login credentials
3. Create a table called `Employees` with the following fields (`emp_no`, `emp_name`, `salary` and `reports_to`).
4. Create a table called `Departments` with the following fields (`dept_no`, `dept_name` and `manager`)
5. Create a table called `Projects` with the following fields (`proj_no, proj_name, starting_date, ending_date`)
6. Insert 10 rows into each table with relevant fields. Find a way to create the data for those fields
7. Test your code by executing `node <FILE_NAME>` in the terminal. Then check your MySQL database and see if everything has been created as expected

**Exercise 2 : Select queries on the "world" database**

> For this part of the homework, use the `world.sql` file in the `week1/databases` folder. Before you go on, execute the file to create a database instance of the `world` database. Test to see if it's created. Make sure all the tables (`city`, `country` and `countrylanguage`) and the containing data are there.

Write a JavaScript file (to be executed with Node.js) that queries (using select statements) the `world` database. The results given back should answer following questions:

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

After you've written your queries, test to see if they work by executing `node <FILE_NAME>`.

## 3. **Code along**

In this week's code along you won't be building a complete app, but get familiar with using MySQL together with Node.js.

- [Using MySQL with Node.js](https://www.youtube.com/watch?v=EN6Dx22cPRI)

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! The homework that needs to be submitted is the following:

1. MySQL exercises

Upload your code to your forked Databases repository in GitHub. Make a pull request to HackYourFuture's forked repository.

> Forgotten how to upload your homework? Go through the [guide](../hand-in-homework-guide.md) to learn how to do this again.

_Deadline Saturday 23.59 CET_
