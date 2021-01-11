# Lesson 2: Data Models, Relationships, and Schemas

In this class, the students will learn how to use more complex SQL queries to retrieve information across tables, and interact with data including write operations.

Objective: the students should be able to build CRUD functionality using SQL statements, including INSERT INTO, UPDATE and DELETE. The students should also be able to create an entity relationship diagram based on a qualitative description of data requirements, and translate that into a MySQL database schema.

## Pre-Class Readings

- [Falsehoods Programmers Believe About Names](http://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/)
- [What is a Database Foreign Key](http://databases.about.com/cs/specificproducts/g/foreignkey.htm)
- [Example Entity Relationship Diagram (including associative entities)](http://users.csc.calpoly.edu/~jdalbey/308/Lectures/HOWTO-ERD.html)

The students should watch this video before class: https://youtu.be/geetitV4u3s

## Main Topics

- Data definition language
  - Creating tables
  - Altering tables
  - Indexes
- Foreign key constraints
- INSERT INTO
- UPDATE
- DELETE
- More complex entity relationship diagrams
  - Associative entities from many-to-many relationships
  - Introduction to normalisation
- Complicated values to store in MySQL
  - Storing prices (floating point errors)
  - Storing date and time (datetime vs. timestamp)
  - Timezones when storing date and time
- Creating an ER model and a database from existing data

## Reference Material

- [Floating Point Inaccuracy](http://stackoverflow.com/questions/2100490/floating-point-inaccuracy-examples#2100502)
- [TutorialsPoint MySQL Introduction](http://www.tutorialspoint.com/mysql/mysql-introduction.htm)
- [w3schools tutorial (easy to find how specific commands work)](https://www.w3schools.com/sql/default.asp)
- [Official MySQL Documentation](https://dev.mysql.com/doc/refman/8.0/en/)

## Get git ready to work on homework

Using the `hyf-homework` repo. In the terminal run `git status`

If there are changes that have not been committed, figure out what to do with those changes

- Should they be committed to another branch?
- Should they be committed to `master`?
- Should they be discarded?

When you have figured out what to do with the changes and fixed those. Write `git status` again. If it says `nothing to commit, working tree clean`. Then you are ready to create the branch for this weeks homework.

### Creating the branch

Using the `hyf-homework` repo write this command

`git checkout master` - You are now on the `master` branch

`git checkout -b databases/week2`

This will create and checkout the branch so you are ready make commits to it

[This video](https://www.youtube.com/watch?v=XYlgh9hSWtw) can help. On slack use the #git-support channel to ask questions about git

## Homework

### Part 1: Working with tasks

Write the following sql queries:

- Add a task with these attributes: `title, description, created, updated, due_date, status_id, user_id`
- Change the title of a task
- Change a task due date
- Change a task status
- Mark a task as complete
- Delete a task

In all the above queries, you choose which is the task that you will modify/delete.

### Part 2: School database

- Create a new database containing the following tables:
  - **Class**: with the columns: id, name, begins (date), ends (date)
  - **Student**: with the columns: id, name, email, phone, class_id (foreign key)
- If you are done with the above tasks, you can continue with these advanced tasks:
  - Create an index on the name column of the student table.
  - Add a new column to the class table named **status** which can only have the following values: not-started, ongoing, finished (hint: enumerations).

### Part 3: More queries

You should do these queries on the database `hyf_lesson2`, which we created last class.
You can find the data [here](lesson2-data.sql) if you need to create the DB again.

- Get all the tasks assigned to users whose email ends in `@spotify.com`
- Get all the tasks for 'Donald Duck' with status 'Not started'
- Get all the tasks for 'Maryrose Meadows' that were created in september (hint: `month(created)=month_number`)
- Find how many tasks where created in each month, e.g. how many tasks were created in october, how many tasks were created in november, etc. (hint: use group by)

### Part 4: Creating a database

Using an entity relationship diagram, design the data model for an application of your choice. This can be anything, previous students have used a small business (with staff, offices, and job titles), a library (with books, genres, racks, members, and a borrowing log), or a farm (with animals, barns, and farmers).

Your application must include at least one many-to-many relationship and any supporting tables (linking tables) that are needed. The entity relationship diagram must describe what tables you will need, the columns in these tables, which column is the primary key, and the relationships between tables.

Next, using the entity relationship diagram as a starting point, write all the necessary `CREATE TABLE` statements to create all tables and relationships (foreign key constraints) for this data model.

Submit an image or PDF of your entity relationship diagram, and a `.sql` file with the `CREATE TABLE` statements.

## Hand in Homework:

Watch [this video](https://www.youtube.com/watch?v=XYlgh9hSWtw) for a more detailed go-through of how to hand in homework!

- Use the branch called `databases/week2`
- Add all your changes to this branch in the `databases/week2` folder.
- Go through the [Homework checklist](#homework-checklist)
- Create a pull request using the `databases/week2` branch
- Wait for mentor feedback
- Implement feedback, `add`, `commit` and `push` the changes
- Now you can merge the changes into `master`
- When merged you can **share the github link** to your classes slack channel if you are **proud of what you did** 💪
- Now celebrate 🎉🎉🎉

## Homework checklist

Go over your homework one last time:

- [ ] Does every file run without errors and with the correct results?
- [ ] Have you used `const` and `let` and avoided `var`?
- [ ] Do the variable, function and argument names you created follow the [Naming Conventions](https://github.com/HackYourFuture/fundamentals/blob/master/fundamentals/naming_conventions.md)?
- [ ] Is your code well-formatted (see [Code Formatting](https://github.com/HackYourFuture/fundamentals/blob/master/fundamentals/naming_conventions.md))?

## Feedback giving time!

Find a student to give feedback using this site: https://hyf-peer-review.herokuapp.com/. The feedback should be given after the homework has been handed in, preferably two days after.

Give the review on the PR exactly how the mentors do it! To find the link for the PR ask the person you are reviewing :) You can see how to give feedback on a PR using github [here](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request)

To help you get started with reviewing we have created [some ressources](https://github.com/HackYourFuture-CPH/curriculum/tree/master/review) about giving feedback. Find them

Why is it important to give feedback? Because it will make you a [better](https://www.brightspot.com/blog/developer-life-5-reasons-why-the-code-review-process-is-critical-for-developers) [developer](https://www.sitepoint.com/the-importance-of-code-reviews/)
