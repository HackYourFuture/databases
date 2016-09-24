# Class 2 preview 

Using `select`, `insert`, `update`, and `delete`
Primary keys and foreign keys (and a quick discussion of constraints)
When you go into a company you are usually not creating a database from scratch but rather using an existing one that you will need to become familiar with. 
We will discuss how to look at a database `schema` (major key!) and understand what is happening. 

Next we will look at how to read and write data from MySQL using  Node.js. 

Your homework will be to change the todo project that you worked on in the last class to use MySQL instead of a text file to store the Todos. 

### Headstart 
If you want to get ahead for tomorrow please have a look at the following:

https://codeforgeek.com/2015/01/nodejs-mysql-tutorial/

https://github.com/mysqljs/mysql

### Review
What we did today (a lot):
Looked at the use of  `select`, `insert`, `update`, and `delete`
Created two tables that had a foreign key and integrity constraints so that we could not insert into t2 unless the foreign key was present in t1. 
Used the `auto_increment` keyword and `primary key` keywords to make a column that served as a unique index increment the index every time we inserted a row into the table. 
For example to create a table with an auto increment primary key we did the following for todos:
```
create table todos (
  id int auto_increment primary key, 
  name varchar(256),
  done boolean
);
```
There is a another syntax for primary keys that you should be aware of: 
```
create table todos (
  id int auto_increment, 
  name varchar(256),
  done boolean, 
  primary key(id) # THE PRIMARY KEY IS SPECIFIED HERE! 
);
```
If you want to see the SQL that was used to create a table use the command 'show create table <TABLE_NAME>'

Remember that `auto_increment` simply creates a column that increases every time you add something but does NOT enforce uniqueness. It is the `primary key` that forces uniqueness. Being a primary key means that there can be only one row with this value in the table. The primary key does not need to be a number (but this is usually the most efficient way to do make tables) - you should prove this to yourself. 

### Foreign keys
Primary keys are used to guarantee that rows are unique. Foreign keys are used to guarantee that keys that are referenced by other tables exist. We created two tables `t1` and `t2` as follows:

```
create table t1 (
  id int auto_increment primary key, 
  name varchar(256), 
  done boolean
);

create table t2 (
  id int auto_increment primary key, 
  t1_id int not null, 
  description varchar(256),
  foreign key (t1_id) references t1(id)
);
```
We then inserted values into t1 and t2 as follows:

```
insert into t1 (id, name, done) values (null, 'First todo', false); # OK
insert into t2 (id, t1_id, description) values (null, LAST_INSERT_ID(), 'Our first todo'); # must do this right after t1 insert otherwise LAST_INSERT_ID() will change! 
insert into t1 (id, name, done) values (null, 'Another todo', false); # OK
insert into t2 (id, t1_id, description) values (null, LAST_INSERT_ID(), 'This is another todo');
```

and we got some errors when trying to do the following:
```
insert into t2 (id, t1_id, description) values (null, 99, 'A description of something todo'); # 99 does not exist in t1 and t1_id is a foreign key

delete from t1 where id = 1; # foreign key contraint violated because t2 still has data that references t1
```

We added to our data model some descriptions 
```
insert into t2 (id, t1_id, description) values (null, 2, 'Another description'); # OK 

insert into t2 (id, t1_id, description) values (null, 2, 'Another description'); # OK beacause we are adding a second description for the item where t1.id = 2 THINK ABOUT THIS - we didn't discuss this in class but you should think about it 

```

Some DANGEROUS commands:
`truncate table <TABLE NAME>` removes all data from the table but leaves the table alone
`drop table <TABLE NAME>` deletes the whole table!!! THINK TWICE

### commit and rollback
When you start the mysql client `autocommit` is set to true and you can turn it off in the client with `set autocommit = 0` 
Some more information on `commit` and `rollback` here - [https://dev.mysql.com/doc/refman/5.7/en/innodb-autocommit-commit-rollback.html]

### Joins 

We joined two tables by specifying the columns to use for the join. Using our earlier example if we fail to specify a join condition that uses the foreign key we get the *cartesian product*. 
Examples:
```
select * from t1, t2; # full cartesian product

select * from t1, t2 where t1.id = 1; # limited cartesian product - still not what we want - need to be more specific

select * from t1, t2 where t1.id = 1 and t1.id = t2.t1_id; # OK 
```

### Drivers and databases
We defined a `driver` as a piece of software (library) that creates a common interface to another system. In our mysql and node example here [https://github.com/tkaria/hyf/edit/master/MySQL/MySQL-connection-example-1.js] we used a mysql javascript driver to connect to mysql from our javasript program. Drivers exist for many languages and many systems (not just databases). 

You should `npm install --save mysql` to add the mysql driver to your `package.json` file before you run the example. 

# Homework 2
You worked with @joostlubach to build a todos app with a flat file. Now we are going to save todos in a database instead of a file.
Your homework is to implement the following [http://www.restapitutorial.com/lessons/httpmethods.html](HTTP VERBS). As we discussed:

There are similarities between the HTTP actions (verbs) and what we've been doing in MySQL:

`POST` is similar to `INSERT`

`PUT` is similar to `UPDATE`

`DELETE` is similar to `DELETE`

`GET` is similar to `SELECT`

You need create two pieces to do this:
1) Create functions to `insert`, `update`, `select` and `delete` todos 
2) Make those functions available to API users through the express framework you used with Joost

As we discussed - I will do the `GET` as an example and you guys can do the rest. 

Some helpful links: 

http://expressjs.com/en/api.html#req

https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

https://erichonorez.wordpress.com/2013/02/10/how-create-a-rest-api-with-node-js-and-express/
