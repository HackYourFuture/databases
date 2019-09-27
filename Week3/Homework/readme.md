Database TodoApplication

+---------------------------+
| Tables_in_todoapplication |
+---------------------------+
| category |
| task |
| task_list |
| user |
+---------------------------+

Table user;
+---------+--------------+----------------+---------------------+
| user_id | user_name | user_email | user_password |
+---------+--------------+----------------+---------------------+
| 1 | Joe | Joe@gmail.com | udhj1253 |
| 2 | Mary | mary@gmail.com | udhj1253 |
+---------+----------- --+----------------+---------------+

Table task;
+---------+-----------+---------------------+---------------------+----------+-------------+---------+
| task_id | task_name | date_created | deadline | complete | category_id | list_id |
+---------+-----------+---------------------+---------------------+----------+-------------+---------+
| 1 | Buy Milk | 2019-09-27 15:45:42 | 2019-09-28 15:45:42 | F | NULL | 1 |
+---------+-----------+---------------------+---------------------+----------+-------------+---------+

Table task_list;
+---------+--------------+---------------------+
| list_id | list_name | reminder_time |
+---------+--------------+---------------------+
| 1 | Grocery List | 2019-11-11 10:00:00 |
| 2 | Workout List | 2019-10-21 10:00:00 |
+---------+--------------+---------------------+

Table category;
+-------------+---------------+
| category_id | category_name |
+-------------+---------------+
| 2 | Chores |
| 6 | Family |
| 4 | Fun |
| 5 | Personal |
| 3 | Urgent |
| 1 | Work |
+-------------+---------------+

How to use the App?

- Install npm packages(express, body-parser, ejs, mysql, path, router)
- Use TodoDatabase.sql for database
- Start the server using server.js

Our main page is localhost:3000/ Most of the action happens there (Adding a user, list and todos)

**_ On localhost:3000/ _**

- To add a user:
  Enter a name, email, password and click Submit. You don't have to fill all of the fields.

- To add a list:
  Enter a list name and fill in the reminder date and time. If you don't fill in the time list will not be created.

- To add a todo task:
  Enter a task name and deadline(necessary).
  If you wish you can add it to a List you already created (type in the list name).
  Choose a category(Necessary).
  By default all todos status will be Not Done.

Now you can check what you created ==>>>

> On localhost:3000/get_todos;

You will see all the todo tasks you have created.
Here you can delete each task by clicking on the Delete button.
Here you can mark them as Complete too.

> On localhost:3000/get_lists;

You will see all the todo lists you have created.
Here you can delete each list by clicking on the Delete button.

> On localhost:3000/get_users

You will see all the todo users you have created.
An ordinary user shouldn't be seeing this probably:) so I am assuming you are the admin.

> On localhost:3000/get_category/:id

For ID you can enter a number between 1-6 (Work-1, Chores-2, Urgent,-3 Fun-4, Personal-5, Family-6) and get the todos that belong to that category.

> On localhost:3000/get_list/:id

For ID you can check the task table(/get_todos) to find out the id of a List. With this query you will get all todos that belong to a list.
