> This homework assumes you have installed the software [MySQL](https://dev.mysql.com/downloads/installer/) to your computer. If not please do that first!

# Homework Databases Week 1

## **Todo list**

1. Practice the concepts
2. MySQL exercises
3. Code along
   <!-- 4. PROJECT: Hack Your World -->

## 1. **Practice the concepts**

Let's do some interactive exercises first. In the following online course, **do sections 3 (Aggregate Functions) and sections 4 (Multiple Tables)**.

- [Codecademy: Learn SQL](https://www.codecademy.com/learn/learn-sql)

Also make time to do lesson 6-12 from the following:

- [SQLBolt](https://sqlbolt.com/lesson/select_queries_with_joins)

## 2. **MySQL exercises**

This week we'll practice some more with writing SQL queries using JavaScript. For each exercise make a separate `.js` file; make sure to give it an appropriate name!

**Exercise 1: Identifiers**

1. Create a table, called `employee`. Give it the following fields: `(employee_no(Primary Key), full_name, salary, address)`
2. Insert 20 rows in this table, use SQL Dump and write the query too.
3. Write a query that adds a `foreign key` to `Employee` table that points to itself, call it as `manager`.

**Exercise 2: Relationships**​

1. Create another table, called `department with fields:`(dept_no(Primary Key), title, description, address)`
2. Each department can have some employees working there. What type of relationship should we implement? Do the required changes in order to implement it.
   ​

**Exercise 3: Joins**

1. Write a query that retrieves all `employees` and their corresponding `manager's full name`.
2. Write a query that retrieves all `employees` and their working `department` title. If no `employee` worked in a specific `department`, return the `department` too.

**Exercise 4: Aggregate Functions**

Write some queries to retrieve the following rows:

1. All department numbers and the number of employees working there.
2. Sum of the salaries of all employees.
3. Average of the salaries of all employees.
4. Sum of the salaries of the employees per department.
5. Minimum and maximum od the salaries per department.
6. For each salary value, return the number of employees paid.

<!-- ## 4. **PROJECT: Hack Your World* -->

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! The homework that needs to be submitted is the following:

1. MySQL exercises

Upload both to your forked Databases repository in GitHub. Make a pull request to HackYourFuture's forked repository.

> Forgotten how to upload your homework? Go through the [guide](../hand-in-homework-guide.md) to learn how to do this again.

_Deadline Saturday 23.59 CET_
