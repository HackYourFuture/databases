> This homework assumes you have installed the software [MySQL](https://dev.mysql.com/downloads/installer/) to your computer. If not please do that first!

# Homework Databases Week 2

## **Todo list**

1. Practice the concepts
2. Prep exercises
3. MySQL exercises

## 1. **Practice the concepts**

Let's do some interactive exercises first. In the following online course, **do sections 3 (Aggregate Functions) and sections 4 (Multiple Tables)**.

- [Codecademy: Learn SQL](https://www.codecademy.com/learn/learn-sql)

Also make time to do lesson 6-12 from the following:

- [SQLBolt](https://sqlbolt.com/lesson/select_queries_with_joins)

## 2. **Prep exercises**

> Prep exercises are exercises that you should work on _before_ the session on Sunday. These are a little more difficult or show an important concept and as such are a great exercise to talk about with your mentor. Have a solution ready by Sunday as you may be asked to show what you did.

Inside your `databases` fork, go to the folder `Week2`. Inside of that folder, navigate to `QA_PREP_EXERCISE.md` file which explains what needs to be done. There will also be some questions at the bottom to think about. Go through them _before_ the session on Sunday as it will be covered then.

## 3. **MySQL exercises**

> You will need to do some research to solve these exercises. All the concepts necessary to solve
> these exercises are NOT covered in the reading material. This is on purpose.

This week we'll practice some more with writing SQL queries using JavaScript. For each exercise make a separate `.js` file; make sure to give it an appropriate name!

**Exercise 1: Keys**

1. Create a table, called `authors`. Give it the following fields: `(author_no(Primary Key), author_name, university, date_of_birth, h_index, gender)`
2. Write a query that adds a column called `mentor` to `authors` table that references the column `author_no`.
   For integrity add a `foreign key` on this column.

**Exercise 2: Relationships**

1. Create another table, called `research_Papers` with the following fields: `(paper_id, paper_title, conference, publish_date, ...)`
2. What is the relationship between Authors and Research papers ? Make necessary changes to `authors` and
   `research_Papers` tables and add more tables if necessary.
3. Read exercises 3 and 4 and then add information (insert rows) of 15 authors and 30 research papers such that
   all queries in the exercises 3 and 4 will return some answers

**Exercise 3: Joins**

1. Write a query that prints names of all `authors` and their corresponding `mentors`.
2. Write a query that prints all columns of `authors` and their published `paper_title`.
   If there is an author without any `research_Papers`, print the information of that `author` too.

**Exercise 4: Aggregate Functions**

Write some queries to retrieve the following rows:

1. All research papers and the number of authors that wrote that paper.
2. Sum of the research papers published by all female authors.
3. Average of the h-index of all authors per university.
4. Sum of the research papers of the authors per university.
5. Minimum and maximum of the h-index of all authors per university.

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! The homework that needs to be submitted is the following:

1. MySQL exercises

Upload both to your forked Databases repository in GitHub. Make a pull request to HackYourFuture's forked repository.

> Forgotten how to upload your homework? Go through the [guide](../hand-in-homework-guide.md) to learn how to do this again.

_Deadline Tuesday 23.59 CET_
