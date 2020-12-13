This folder contains a small codebase to setup a database with some content.
The database will contain information about users their projects and tasks.
Tasks can be assigned to users optionally which make for some nice example queries.

Create a database called `db_qa_session` or make changes to the `knexfile.js`

```
npm install
npm install -g knex 
knex migrate:latest
knex seed:run
```

Your database should be filled with some demo content :)

These seeds and migrations themselves aren't within scope of this course.
Its just a convenient way to create the demo database that will have some meaningful content to demonstrate queries.

Some exercise that cover the topics of this week:

1. List all tasks 
    1. only show the ones that aren't done yet
    2. add the first name and last name of the assigned user
    3. add the project for the task

2. List all projects
    1. reduce the list to the projects that aren't ended
    2. add a column wit the amount of tasks on the project
    
3. List the users
    1. add a column with the amount of projects for each user

4. In your frontend you might have a project details page. Pick a project from your db and remember the code.
    1. Fetch all tasks for the project with that code without the project table columns

5. List the users with their projects and add the project alias (don't mind the duplicate users)
