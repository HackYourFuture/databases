# What we did today 

Discussion of what is a database and why we use them in the context of the todo example from Node.js class. 
Our goal is to make the Node.js version of the todo application use a database to make managing the data 
in the todo list easier and more structured. 

# Installing MySQL
We installed mysql and created a root user 
Saw that the system was running mysql as a [daemon](https://en.wikipedia.org/wiki/Daemon_(computing))
You can see this on Windows by looking at services in the control panel 
On Mac start the activity monitor

# MySQL client and server 
We saw that MySQL has two parts - a client and a server 
Now we understand how to start the command line interface to MySQL and connect to the running server to issue commands.

# Commands
We created a new database named `todos` with the following command
`create database todos`

When errors or warnings are reported we know to use:
`show errors` and `show warnings`

Creating new tables (spaces in the database to store data) using the command
```
create table todos (
	Id int, 
	Done boolean, 
	Name string
);
```

Delete tables using the `drop table TABLE_NAME` syntax (be careful!)

Show the structure of a table (not what is IN the table) using:

`desc TABLE_NAME`

`describe TABLE_NAME`

`show columns from TABLE_NAME`
(these all do the same thing!)

Show the commands (SQL) used to create a table with:

`show create table TABLE_NAME`

Discussed the difference between varchar(1) and varchar(255) (or any number)
If you are not clear on this please read the first 5 paragraphs of this: 
[MySQL char and varchar](http://dev.mysql.com/doc/refman/5.7/en/char.html)

# We played around a little (this is important)
Run your own tests to understand this but to get you started:
### Example 1
```
create table string_test (
	string1 varchar(1),
	string2 varchar(23) 
);

insert into string_test (string1, string2) values ('abcdefghijklmnopq', 'a');
show errors; 
show warnings;
select * from string_test;
```

This will create a table with two columns (named `string1` and `string2`)  and then insert two values into that table. 
It inserts `abcdefghijklmnopq` into string1 and `a` into string2. We saw that this works but should generate a warning. 

### Example 2
```
CREATE TABLE int_test (
  id1 int(1),
  id2 int(23)
);

insert into int_test (id1, id2) values (99999999, 1);
show errors; 
show warnings;
select * from int_test;
```

# Homework 1

* Create a table in the `todos` database also named `todos` that will store the list of todos
The table should look as follows:
```
mysql> desc todos;
+-------+------------+------+-----+---------+-------+
| Field | Type       | Null | Key | Default | Extra |
+-------+------------+------+-----+---------+-------+
| Id    | int(11)    | YES  |     | NULL    |       |
| Done  | tinyint(1) | YES  |     | NULL    |       |
| Name  | text       | YES  |     | NULL    |       |
+-------+------------+------+-----+---------+-------+
3 rows in set (0.01 sec)
```

* There were some good suggestions in class that the `Id` field should increment every time we add something to the todos list
and that the default value for `Done` should be `false`
Your next assignment is to make the table look like this:
```
mysql> desc todos;
+-------+------------+------+-----+---------+----------------+
| Field | Type       | Null | Key | Default | Extra          |
+-------+------------+------+-----+---------+----------------+
| Id    | int(11)    | NO   | PRI | NULL    | auto_increment |
| Done  | tinyint(1) | YES  |     | 0       |                |
| Name  | text       | YES  |     | NULL    |                |
+-------+------------+------+-----+---------+----------------+
3 rows in set (0.00 sec)
```
For this you will need to understand 3 things:
  1. Default values for columns (Google default values mysql)
  2. The meaning of `auto_increment` and how to use it [http://dev.mysql.com/doc/refman/5.7/en/create-table.html](MySQL reference) but use the force of the Google! 
  3. How to tell mysql which column should be the primary_key - IMPORTANT TOPIC we will discuss next week but for now please just understand what adding the `primary_key` statement means when creating a table. Have a look [http://www.mysqltutorial.org/mysql-primary-key/](here)
  
* If you have time...
It is generally a bad idea to use mysql as user `root` all the time. 
Your homework is to create a new user and allow that user access to the `todos` table. 
See here for some (help)[http://dev.mysql.com/doc/refman/5.7/en/adding-users.html]

