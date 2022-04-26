# Lesson Plan Databases Week 3

The lesson plan is primarily written for teachers so that they can
use examples and anecdotes from this document in conjunction with the README
and explain the concepts better in the class.

## Topics (essentially same as the README file)

0. Super Key vs Candidate Key vs Primary key
1. Normalization
2. Transactions
3. SQL injection
4. NoSQL (with MongoDB)

## 0. Super Key vs Candidate Key vs Primary key

#### Explanation

1. Super key is a set of columns that uniquely identify a row.
2. Candidate key is a minimal super key that can uniquely identify a row.
3. Primary key is a choice of candidate key chosen by the database designer.

#### Example

For the following table
`Employee (employee_id, employee_name, gender, salary, department, age, city)`

- Two super keys from this table are

1. SK1 = `{employee_name, department, age, city}`
2. SK2 = `{employee_id, employee_name, salary}`

- The candidate keys derived from these super key can be

1. CK1 from SK1 = `{employee_name, city}`
   if two employees with the same name always come from different city.
   Then, we don't need the `age` and `department` columns in this candidate key.
2. CK2 from SK2 = `{employee_id}` if different identifier is generated for every
   employee. Then we don't need the `employee_name` and `salary` columns in this candidate key.

- The primary key chosen from these candidate keys could be `employee_id`.

#### Exercise

Consider the following table:
`Book (ISBN int, book_name, author_name, publication_year, publisher, book_language)`.
Find out 2 sets of super keys, candidate keys and choose an appropriate primary key.

#### Essence

Primary key uniquely identifies rows.
Super keys and Candidate keys are used in database design.

## 1. Normalization and normal forms

### Explanation

The goal of normalization is to reduce duplication of data.
Different levels of normalization are called _normal forms_.
A table is said to be in `X normal form` if it satisfies all rules
defined by that normal form and all the normal forms before X.

#### 1NF (5 rules)

1. Single valued columns (each column should have atomic value, no multiple values)
2. Column domain (for any column) should not change.
3. Unique names for columns.
4. Order (of rows/columns) does not matter.
5. No duplicate records (every record has a primary key).

#### 2NF (1NF + rule)

- no non-prime column that is not a part of primary key
  should be functionally dependent on any proper subset of a candidate key.
  In other words, there should be
  No partial dependency (no column should depend on the part of the primary key).

```
Functional dependency: Denoted with A => B.
A and B are columns of a table. An oversimplified explanation of Function dependency is
as follows.
If I know a value in column A then I for sure know the value in column B
but the reverse is not true.
E.g. A is student number and B is student name.
I can tell the name of the student from student number, but
I cannot tell the student number from the name because there could be multiple students with the same name.
```

If you feel adventurous, then read this [Functional Dependency Wikipage](https://en.wikipedia.org/wiki/Functional_dependency)

#### 3NF (2NF + rule)

- No transitive dependency (i.e. no column should depend on non-key column).

#### 3.5NF AKA BCNF (3NF + rule)

- For any dependency A => B, A should be a super key.
  In other words, for a dependency A => B, A cannot be a non-prime column, if B is a prime column.

#### 4NF (3NF + rule)

- No multi-value dependency.

### Example

#### 1NF

Consider the following table

```
+-------------+------------+-----------------------+
| Employee Id |   Name     |   Contact             |
+-------------+------------+-----------------------+
|       101   |   Amit     | 0684927317            |
|       102   |   Ben      | 0634899234, ben@bu.nl |
|       103   |   Cathy    | 0647882102, cat@dog.us|
|       104   |   Dua      | 0622467559            |
+-------------+------------+-----------------------+
```

This table is not in 1NF because rule (1) of 1NF is violated because
row 2 and row 3 contain multiple values for the column `Contact`.
Also the rule (2) of 1NF is violated because the column `Contact` contains
numeric values (for phone numbers) and string value (for emails).

This table could be converted to 1NF as follows:

```
+-------------+------------+------------------------+
| Employee Id |   Name     | Phone      | Email     |
+-------------+------------+------------------------+
|       101   |   Amit     | 0684927317 | NULL      |
|       102   |   Ben      | 0634899234 | ben@bu.nl |
|       103   |   Cathy    | 0647882102 | cat@dog.us|
|       104   |   Dua      | 0622467559 | NULL      |
+-------------+------------+----------------------- +
```

In real life, you actually need to

- DROP column Contact.
- ADD column Phone with the type int.
- ADD column Email with the type varchar(50).

#### 2NF

Consider the following table (employee-project M-M relationship table).

```
+-------------+------------+-----------------------+
| Employee Id | Project ID |  Project Budget       |
+-------------+------------+-----------------------+
|       101   |   1001     | 317                   |
|       102   |   1001     | 234                   |
|       103   |   2001     | 102                   |
|       104   |   2001     | 559                   |
+-------------+------------+-----------------------+
```

2NF is violated here because

```
porj_budget (non prime column)
proj_no => proj_budget (functionally dependent on proj_no)
proj_no (It is part of the candidate key)
emp_no + proj_no (is a candidate key)
```

This table could be converted to 2NF by removing the `Project Budget` column and
adding it to the project table.

#### 3NF

Consider the following table (employees)

```
+-------------+------------+-----------------------+
| Employee Id | Dept Id    |  Dept Location        |
+-------------+------------+-----------------------+
|       101   |   2221     | Amsterdam             |
|       102   |   2221     | Amsterdam             |
|       103   |   3335     | Rome                  |
|       104   |   3335     | Rome                  |
+-------------+------------+-----------------------+
```

This table violates the 3NF because there is a transitive dependency.
`Employee Id => Dept Id` and `Dept Id => Dept Location.`
`Dept Location` column depends on the `Dept Id` which is not a primary key column.

#### 3.5 NF (AKA BCNF)

Consider the following table (students opting for subjects)

```
+-------------+------------+-----------------------+
| Student Id  | Subject    |  Professor            |
+-------------+------------+-----------------------+
|       101   |   Java     | X                     |
|       102   |   Java     | X                     |
|       101   |   C++      | Y                     |
|       103   |   C++      | Y                     |
|       103   |   Java     | X                     |
|       104   |   C++      | Y                     |
+-------------+------------+-----------------------+
```

This table violates the 3.5NF because there is a functional dependency
`Professor => Subject` and `Professor` is not a super key.
`Student Id + Subject` is the primary key. Hence `Subject` is a prime column.

This table could be converted to 3.5NF as follows:

```
+-------------+------------+
| Student Id  | Prof Id    |
+-------------+------------+
|       101   |   P0001    |
|       102   |   P0001    |
|       101   |   P0002    |
|       103   |   P0002    |
|       103   |   P0001    |
|       104   |   P0002    |
+-------------+------------+
```

and

```
+-------------+------------+----------+
| Prof Id     | Professor  |  Subject |
+-------------+------------+----------+
|   P0001     |   X        | C++      |
|   P0002     |   Y        | Java     |
+-------------+------------+----------+
```

#### 4NF

Consider the following table (students opting for subjects)

```
+-------------+------------+-----------+
| Student     | Subject    |  Hobby    |
+-------------+------------+-----------+
|    Benno    |  Excel     |  Violin   |
|    Benno    |  Python    |  Woodwork |
|    Benno    |  Dutch     |  Paint    |
|    Lukas    |  Java      |  Running  |
|    Lukas    |  C++       |  Reading  |
+-------------+------------+-----------+
```

This table violates 4NF because `Subject` and `Hobby` are independent of each other.
Hence the hobby of the student must be repeated in the table with each subject
the student chooses.

```
+-------------+------------+-----------------------+
| Student     | Subject    |  Hobby                |
+-------------+------------+-----------------------+
|    Benno    |  Excel     |  Violin               |
|    Benno    |  Excel     |  Woodwork             |
|    Benno    |  Excel     |  Paint                |
|    Benno    |  Python    |  Violin               |
|    Benno    |  Python    |  Woodwork             |
|    Benno    |  Python    |  Paint                |
|    Benno    |  Dutch     |  Violin               |
|    Benno    |  Dutch     |  Woodwork             |
|    Benno    |  Dutch     |  Paint                |
+-------------+------------+-----------------------+
```

It leads to a lot of repetition.
This table could be converted to 4NF by splitting it into two.

```
+-------------+------------+
| Student     | Subject    |
+-------------+------------+
|    Benno    |  Excel     |
|    Benno    |  Python    |
|    Benno    |  Dutch     |
|    Lukas    |  Java      |
|    Lukas    |  C++       |
+-------------+------------+
```

and

```
+-------------+-----------+
| Student     |  Hobby    |
+-------------+-----------+
|    Benno    |  Violin   |
|    Benno    |  Woodwork |
|    Benno    |  Paint    |
|    Lukas    |  Running  |
|    Lukas    |  Reading  |
+-------------+-----------+
```

### Exercise

Normalize the following table.

```
+-------------+------------+-----------------------------------------------+------------+
| Full name   | Adddress   |  Movies rented                                | Salutation |
+-------------+------------+-----------------------------------------------+------------+
| Janet Jones | 5 John St  |  Pirate of the Carribean, Clash of the Titans |     Ms.    |
| Rob Smith   | 12 Ann St  |  Shawshank Redemption, Beautiful mind         |     Mr.    |
| Rob Smith   | 9 Joy St   |  Clash of the Titans                          |     Mr.    |
+-------------+------------+-----------------------------------------------+------------+
```

### Essence

Normal forms help in a better database design mostly by reducing redundancy.

## 2. Transactions

### Explanation

We explain the need for the transaction with the following anecdotal illustration:

Assume that the balance in Ali's bank is 500€ and
the balance in the bank account of Birgul is 700€.
Imagine that Ali is transferring 50€ to Birgul. Then, at the end
of this money transaction, Ali should have 450€ and Birgul should have 750€.
Note that this involved two database queries.

1. Update the row of the account of Ali and _subtract_ the balance by 50.
2. Update the row of the account of Birgul and _add_ the balance by 50.

These two database queries together form a transaction. If we execute only
one of them, then there is inconsistency.

Transactions have the following syntax:

```
start transaction;
SQL command 1
SQL command 2 ...
SQL command N

rollback OR commit;

# "rollback" aborts the transaction (also ends the transaction)
# "commit" commits the transaction (also ends the transaction)
```

> Note that there is no "end transaction" command. To end the transaction,
> we have to either commit the transaction or rollback the transaction.

#### ACID properties

Transactions in relational databases (like MySQL) follow the
following properties.

1. Atomicity : Execute all commands in the transaction or execute zero commands in the transaction (all or none).
2. Consistency : A transaction brings database from one valid state to the next valid state.
3. Isolation : Concurrent execution of transactions (possibly by different users) should leave the database in a consistent state.
4. Durability : When a transaction is committed, it will remain committed even in the case of system failure. In other words,
   committed transactions are recorded on the disk.

### Example

Atomicity can be demonstrated with the following `rollback` and `commit` examples:

#### Rollback example

```
set autocommit = 0; # default is 1 which automatically commits every command as transaction.

start transaction;

select * from employees; # Show all the rows of the table

update employees set salary = 10000 where employee_id = 101; # Update the salary of one employee

select * from employees; # Show the new salary

rollback; # Does not show any output but actually rolls back the transaction

select * from employees; # Show the old salary
```

> There can be hundreds of commands after `start transaction`. rollback command will undo all of them.

#### Commit example

```
set autocommit = 0; # default is 1 which automatically commits every command as transaction.

start transaction;

select * from employees; # Show all the rows of the table

update employees set salary = 10000 where employee_id = 101; # Update the salary of one employee

select * from employees; # Show the new salary

commit; # Does not show any output but actually commits the transaction

select * from employees; # Show the new salary
```

> After commit, the changes are written permanently on the disk.

#### Isolation and Consistency examples

Start two `mysql` command line clients.

```
# First client

update employees set city = 'Mumbai' where employee_id = 101;

commit;
```

In the second client, show that the value is updated.

```
# Second client
select * from employees;

```

> The change made by one database client in the database server will be seen by the other client(s). Thus,
> both clients have the consistent view on the database.

```
# First client

set autocommit = 1;

LOCK TABLES employees WRITE;

update employees set salary = 7000 where employee_id = 101;

```

```
# Second client

select * from employees; # Will hang because First client has the WRITE lock on that table
```

As soon as the First client executes `UNLOCK TABLES;` command,
the Second client will get the output of the `select` command.

> Transactions can also be created from the JavaScript client. Demo program is [async-transaction](async-transaction.js).

### Exercise

Discuss the transaction in the context of an Uber ride. How many operations/actions are involved in the successful transaction ?
When can the transaction be aborted ? What would be the database tables ?

### Essence

A transaction is a set of SQL commands that is treated as ONE command.

## 3. SQL injection

### Explanation

SQL injection is a type of hacker attack where the attacker tries to get the program to execute a query to read/write
the data that they should not have access to.

### Example

Use the `prompt` package in `input-demo.js` to simulate the input from HTML forms.

`sql-injection.js` contains three ways of passing the input to the select query

```
// 1. Naive way of passing the parameter to the query
const select_query = `select * from employees WHERE employee_id =  ${input_number};`
```

This way is vulnerable to the following attacks.

```
$ node sql-injection.js # Execute the Javascript program from the (VS code) terminal.

prompt: employee_number: 1234 OR 1=1
# select * from employees where employee_id = 1234 OR 1=1;


prompt: employee_number: 1234 OR 1=1; show tables;
# select * from employees where employee_id = 1234 OR 1=1; show tables;


prompt: employee_number: 1234 OR 1=1; drop table demo;
# select * from employees where employee_id = 1234 OR 1=1; drop table demo;
```

To solve this problem, there are two ways of sanitizing the input:

```
// 1. Escaping the parameter ( replacing the unwanted characters)
const select_query = `select * from employees WHERE employee_id =` + connection.escape(input_number);

// 2. Using a question mark syntax to do the escaping
const select_query = `select * from employees WHERE employee_id = ?`
```

### Exercise

https://www.hacksplaining.com/exercises/sql-injection#/start

### Essence

SQL injections are dangerous. Always sanitize the input from your HTML forms.

## 4. No SQL

### Explanation

### Example

> use the same tables here (as Week 1 lessonplan) to be consistent and show students how to make similar databases using MySQL and MongoDB

### Exercise

### Essence
