# Lesson Plan Databases Week 2

The lesson plan is primarily written for teachers so that they can
use examples and anecdotes from this document in conjunction with the README
and explain the concepts better in the class.

## Topics

0. Async nature of MySQL-Nodejs interaction
1. Keys (unique, primary)
2. Relationships (1-M with foreign keys, M-M with composite keys)
3. Joins (comma (cross), implicit inner, self, left, right)
4. More SQL clauses (group by, having, distinct and Aggregate functions)
5. Domain modeling (ERD)


### 0. Async nature of MySQL-Nodejs interaction

#### Explanation
The nature of database queries is asynchronous.
Some queries can take long time to execute.
When our JavaScript MySQL client is sending the queries to the MySQL server,
it may not want to block until the answer is returned.
However if the JavaScript MySQL client is sending multiple queries such that
the second query (for example insert) depends on the first query (for example create),
then it must wait until the execution of the first query is successful.
To ensure smooth interaction with the MySQL server, promises can be used in conjunction
with the await() method.

#### Example(s)
Demonstrate with four programs at [this repository](https://github.com/unmeshvrije/database_examples)
how
1. 1-db-naive.js fails because the connection is closed prematurely.
2. 2-db-callback.js solves the problem but looks ugly because of the callback-hell.
3. 3-db-promise.js uses the promise chaining to make it better.
about building those promises
4. 4-db-await.js uses promisify() and await() to make it the best.

#### Exercise
The program called `async-create-insert.js` can be found in `Week2` folder.
Add a select query to that program using await and promisify.

#### Essence
> async keyword : to create asynchronous function and ensure they return promise without having to worry
> await : to call a function returning promise without having to call .then() over that promise
> promisify() : to convert a callback based function to a promise based one.


### 1. Key (Constraints)
#### Explanation
1. A column can be declared as the UNIQUE column. Such a column has UNIQUE values.
It can also have NULL values. Thus, two rows can have same NULL value in the column that
is declared as UNIQUE (In other words, this is a UNIQUE CONSTRAINT on that column).
2. A column can be declared as the PRIMARY KEY column. Such a column has UNIQUE values too.
They cannot be NULL values. Thus two rows can NEVER have same values in the column
that is declared as PRIMARY KEY (In other words, this is a PRIMARY KEY CONSTRAINT on that column).

> There are more constraints in MySQL. Read more about them [here](https://www.w3resource.com/mysql/creating-table-advance/constraint.php).

#### Example
Consider the following commands (# represents comments, mysql> is the prompt).
```
# create table with two columns. one with primary key and one with unique key constraint
mysql>CREATE TABLE pri_uniq_demo(id_pr int PRIMARY KEY, id_un int UNIQUE);

# Note the error that says that the primary key column cannot be NULL
mysql> INSERT INTO pri_uniq_demo VALUES (NULL, NULL);
ERROR 1048 (23000): Column 'id_pr' cannot be null

# Note that the UNIQUE key column can be NULL
mysql> insert into pri_uniq_demo values (1, NULL);
Query OK, 1 row affected (0.00 sec)

# Normal insertion
mysql> insert into pri_uniq_demo values (2, 2);
Query OK, 1 row affected (0.05 sec)

# Note that you cannot insert 2 in the id_un column because it should be UNIQUE
mysql> insert into pri_uniq_demo values (3, 2);
ERROR 1062 (23000): Duplicate entry '2' for key 'id_un'

# Note that you cannot insert 2 in the id_pr column because it is PRIMARY KEY
mysql> insert into pri_uniq_demo values (2, 3);
ERROR 1062 (23000): Duplicate entry '2' for key 'PRIMARY'

```
#### Exercise
```
# Find out type T and Constraint C for each column.
CREATE TABLE Airline_passengers(ticket_numer T C, passenger_name T C, date_of_birth T C, passport_number T C);

Hint: A very young baby may not need a ticket!
```

#### Essence
Primary key is a special case of UNIQUE key. UNIQUE key can be NULL and
primary key cannot be NULL.  A table can have multiple UNIQUE keys but ONLY ONE primary key.

### 2.1 Relationships (1-1, 1-M and Foreign Keys)
#### Explanation
When one entity is related to another, such a relationship has a so called **cardinality**.
The cardinality determines how many instances of one entity can participate in the relationship
with how many other instances of the other entity.

For example, an employee may have only one account in the company.
Also one account is tied to exactly one employee.
This relationship employee and account has `1-1` (read as one-to-one) cardinality.
This means that one instance of Employees (say John Smith) has exactly one account
(instance with account ID 3409011) in some company X.

An employee belongs to exactly one department, however one department may have many employees.
This relationship between employee and department has `M-1` (read as Many-to-one) cardinality.
Reversely, the relationshop between department and employee has `1-M` (read as One-to-many) cardinality.
Note that `1-M` and `M-1` cardinalities are only reverse of each other.
The following two sentences convey the same information in different words.
1. The Sales department (an instance of Department entity) of company X has three employees.
2. John Smith, Raj Joshi and Su Li are employees of company X that belong to the Sales Department.

To represent `1-1` or `1-M` relationship in MySQL tables, we need a column in one table
that `refers` a column in another table. Such a column should be a primary key column of another table
and is called as a `foreign key`.
In the Account table, `employee_id` is the column that acts as the foreign key which **refers to the
employee_id column of the employees table in which it works as the primary key.**
In the Employees table, `dept_id` is the column that acts as the foreign key which **refers to the
dept_id column of the departments table in which it works as the primary key.**

#### Example
```
# Add the column dept_id to the employees table
mysql> ALTER TABLE employees ADD COLUMN dept_id int;

# Add the constraint foreign key
mysql> ALTER TABLE employees ADD CONSTRAINT fk_dept FOREIGN KEY(dept_id) REFERENCES departments(dept_id);

# Add some sample rows in the departments table
mysql> INSERT INTO departments VALUES (5001, "Sales");
mysql> INSERT INTO departments VALUES (5002, "Development");
mysql> INSERT INTO departments VALUES (5003, "Marketing");

# Try updating the dept_id of an employee with an existing department
mysql> UPDATE employees SET dept_id = 5001 where employee_id = 101;

# Try updating the dept_id of an employee with a department that does not exist
mysql> UPDATE employees SET dept_id = 9999 where employee_id = 101;

# Example of 1-1 relationship
# Creating table Account with the same primary key as the Employees table
mysql> CREATE TABLE Account(
    -> employee_id int, 
    -> email varchar(50),
    -> primary key (employee_id),
    -> CONSTRAINT fk_emp FOREIGN KEY(employee_id) REFERENCES employees(employee_id)
    -> );

```

#### Exercise

1. Write an INSERT query for the Account table that returns an error.
2. Write an INSERT query for the Account table that is valid (returns no error).

#### Essence
For a relationship with `1-M` cardinality. The primary key of `1` side of the relationship
becomes the foreign key of the `M` side of the relationship.
E.g. `Departments-Employees`. The primary key of the Departments table (dept_id)
becomes the foreign key in the Employees table.

### 2.2 Relationships (M-M and composite keys)

#### Explanation
The cardinality of a relationship can also be `M-M` (read as Many-to-many) where
one instance of an entity participates in many other instances of the other entity
and vice a versa.
For example, an employee may work on many projects at a time.
A project may have many employees working on it.

To represent an `M-M` relationship in MySQL, we need a **new relationship table**
that uses two foreign keys (primary keys from both tables). For such a relationship
table, primary key is composed of two foreign keys.
For example, one entry in the employee-project relationship table represents
**X** is working on **Y** project.
There can be other rows with the employee **X**,
There can be other rows with the project **Y**
Hence none of these columns can act as the primary key alone.
The primary key must be the combination of two columns. Such a primary
key is called as the **Composite Key**

#### Example

```
# create projects table
mysql> CREATE TABLE projects (proj_id int, proj_name varchar(50), start_date datetime);

# Insert sample values
mysql> INSERT INTO projects VALUES(9001, "Jazz", "2018-01-01");
mysql> INSERT INTO projects VALUES(9002, "Mellow", "2019-03-01");
mysql> INSERT INTO projects VALUES(9003, "Classical", "2020-01-01");

# create emp_proj relationship table with composite primary key
mysql> CREATE TABLE emp_proj (
    -> emp_id int,
    -> proj_id int,
    -> PRIMARY KEY(emp_id, proj_id),
    -> CONSTRAINT fk_emp FOREIGN KEY(emp_id) REFERENCES employees(employee_id),
    -> CONSTRAINT fk_pro FOREIGN KEY(proj_id) REFERENCES projects(proj_id)
    -> );
```

#### Exercise

1. Write an INSERT query for the emp_proj table that returns an error.
2. Write an INSERT query for the emp_proj table that is valid (returns no error).

#### Essence
For a `M-M` relationship between two tables, new table must be created which uses a composite primary
key that consists of foreign keys that reference primary keys of both tables.

### 3.1 Joins (comma, inner)

#### Explanation
When the answer of the query cannot be found from only one table, we must join the two tables.
If we don't join the table, then such a query must be written using nested subquery.
For example, consider the following query: **Find out all employees who work in the Sales department.**
Also assume that the name of the department is obtained from the HTML form as the input.
thus, you must obtain the `dept_id` from the departments table where the name is **Sales**.
The following query should give the answer.
`SELECT dept_id FROM departments where dept_name = Sales;`
Now, we can use the above query as the nested (sub)query as follows:
`SELECT employee_name FROM employees WHERE dept_id in (SELECT dept_id FROM departments where dept_name = Sales);`

Another way of solving this query is to use **joins**.
The preferred way of joining two tables is to use the **INNER JOIN** clause followed by **ON** followed by
the condition that generally matches the columns shared by the two tables we are joining.
Another way is to use a **comma (,) between table names** after FROM and then matching columns in the **WHERE**
clause.


#### Example
```
#We must join the tables `employees` and `departments` and then choose the relevant rows.

# INNER JOIN
mysql> SELECT employee_name
    -> FROM employees as E
    -> INNER JOIN
    -> departments as D
    -> ON E.dept_id = D.dept_id
    -> WHERE D.dept_name = "Sales";

# Comma (,) or CROSS join
mysql> SELECT employee_name
    -> FROM employees as E, departments as D
    -> where E.dept_id = D.dept_id
    -> and D.dept_name = "Sales";
```
#### Exercise

1. Guess the output of the following query.
`SELECT count(*) FROM employees, departments, projects;`

2. Print the sum of salary of all employees that work in "Sales" department and
work on "Jazz" project.

#### Essence
> When we use a comma (,) after the FROM clause of MySQL, it gives you the vector product of two tables.

> In MySQL, there is no difference between
(1) An INNER JOIN with columns-matching condition after ON and
(2) The join using a comma (,) between tables and where clause with condition for columns-matching.


### 3.2 Joins (self)

#### Explanation
When the answer of the query cannot be easily found with a where clause but the answer(s) can be found
in the same table, then consider the following case:

1. One column of the table contains values from the other column of the same table (but different rows)
E.g. `reports_to` column of Employees table contains values from the `employee_id`.
2. We want to print rows that share column values from other rows
E.g. Say we add a column `city` to Employees table, then
we want to print all employees who come from the same city as `John Smith`

For both of these cases, a table must be joined to itself (self join).
for self join, we must use **aliases** so that disambiguation of column names can be achieved.
#### Example
```
When we want to print employees and their reporting mangagers.
mysql> SELECT E.employee_name as Employee, E2. employee_name as Manager
    -> FROM employees as E1
    -> INNER JOIN
    -> employees as E2
    -> ON E1.reports_to = E2.employee_id
```


#### Exercise

```
# Add the city column, update records in the employees table
mysql> ALTER TABLE employees add column city varchar(50);
mysql> UPDATE employees SET city = 'Berlin' where employee_name = 'John';
mysql> UPDATE employees SET city = 'Berlin' where employee_name = 'Friend of John';
mysql> UPDATE employees SET city = 'Berlin' where employee_name = 'Another friend of John';

mysql> SELECT employee_name, city
    -> FROM employees
    -> WHERE city = (SELECT city FROM employees WHERE employee_name = 'John');

* Write a query to print names of employees that come from the same city as John using **self join**.

<details><summary>Reveal Query</summary>
<p>

```SQL
mysql> SELECT E1.employee_name, E2.city
    -> FROM employees as E1
    -> INNER JOIN employees as E2
    -> ON E1.city = E2.city
    -> WHERE E2.employee_name = 'John';
```

</p>
</details>

```

#### Essence
For self joins, aliases for tables must be used. Otherwise, column names are ambiguous.


### 3.3 Joins (LEFT OUTER and RIGHT OUTER)

#### Explanation
When we join two tables based on a common column, some rows do not have a match in the other table.
In the following statement `FROM A LEFT JOIN B ON A.col = B.col`,
the table A is the LEFT table and the table B i the RIGHT table.
In a LEFT JOIN, we print **all rows** from the LEFT table even though they don't have a match in the RIGHT table.

In the following statement `FROM A RIGHT JOIN B ON A.col = B.col`,
the table A is the LEFT table and the table B i the RIGHT table.
In a RIGHT JOIN, we print **all rows** from the RIGHT table even though they don't have a match in the LEFT table.


#### Example
Some employees may not have a department associated with them but they
are still employed by the company.
Thus, if we want to print all employees and their department names,
then a LEFT JOIN (from employees to departments) allows us to print **everything** from the LEFT table
and the matching rows from the other table.

#### Exercise
Use Self left join to print all employees and their managers.
Note that it should include the employees who don't have mangers too.

<details><summary>Reveal Query</summary>
<p>

```
mysql> SELECT E.employee_name as Employee, E2. employee_name as Manager
    -> FROM employees as E1
    -> LEFT JOIN
    -> employees as E2
    -> ON E1.reports_to = E2.employee_id
```

</p>
</details>

#### Essence
* LEFT JOIN : All rows from the LEFT table
* RIGHT JOIN: All rows from the RIGHT table

### C. Domain Modeling
#### Explanation
Entity Relationship Diagrams (ERD) are used widely in domain modeling. 
In this diagram, **entities** are showing by boxes and are connected to each other with a 
line (**relationships**).

#### Example
Draw the **ERD** diagram for the teacher, student, compensation entities. In this diagram all types of the relationships should be shown.
#### Exercise
Base on what students did on previous part, they should be able to draw ERD diagram for the office scenario.
#### Essence
Domain Modeling using ERD diagrams helps the system analysts and database designers to have a concrete view to the system and how to apply it in databses


_SECOND HALF (14:00 - 16:00)_
### D. Joins
#### Explanation
A JOIN clause combines columns from one or more tables in a relational database. It creates a set that can be saved as a table or used as it is. A JOIN is a means for combining columns from one or more tables by using values common to each. 
There are different types of JOINS:
-   INNER JOIN: Select records that have matching values in both tables
-   SELF JOIN: If the tables in both sides are the same, it's called SELF JOIN
-   LEFT and RIGHT OUTER JOIN: Select records from the left-most (or right-most) table with matching left table records.
#### Example
Give all teacher names with their corresponding compensation amount:

```sql
SELECT t.name, c.amount FROM teachers t INNER JOIN compensations c
```

Give all students with their corresponding teachers. Return them, if they don't have teacher

```sql
SELECT s.*, t.name FROM students s LEFT OUTER JOIN teachers t
```

#### Exercise
Ask the students to write the query to retrieve all employees with the one that they should report to.

#### Essence
Using JOINS, we can retrieve our requested data from two or more tables. Without JOINS, we should retrieve all data from one table and iterating over them, get the values from other tables as well. Using JOINS, database, itself, does all this job and retrieves us the desired data.

### E. Aggregate Functions
#### Explanation
In database management an aggregate function is a function where the values of multiple rows are grouped together as input on certain criteria to form a single value of more significant meaning.
Some important ones are
- SUM
- COUNT
- MAX, MIN
- AVG
#### Example
We want to return the sum of the wages of all teachers:
```sql
SELECT SUM(c.amount) AS sum FROM compensations c
```

Or get the number of students:
```sql
SELECT COUNT(*) FROM students s
```
#### Exercise
Ask the students to get the maximum and average of all teachers' wages.
#### Essence
Using these functions, you can do some data processing on Database level. For example, you can get max or min of the data that exists in database with no need to process them. 

### D. DISTINCT, GROUP By, and HAVING keywords
#### Explanation
Here, some keywords that used a lot in queries are discussed. All of them can be combined with aggregate functions to have more powerful queries:

-   Distinct: this statement is used to return only distinct (different) values. This keyword prevents the duplicate values.
-   Group by: this statement groups rows that have the same values into summary rows
-   Having:  this clause was added to SQL because the WHERE keyword could not be used with aggregate functions. Using this clause you can have conditional clauses on aggregate funtions.
             
#### Example
We want to to get the number of the teachers that teach to at least one student:
```sql
SELECT COUNT(DISTINCT s.teacher_number) AS no_teachersgg
FROM students s
```
Next, we want to get the number of students that each teacher has:
```sql
SELECT COUNT(s.techer_number) AS student_no, s.techer_number AS teacher_number
FROM students s
GROUP BY s.teacher_number
```
Then, we want to retrieve the numeber of students for each teacher that has more than three students:

```sql
SELECT COUNT(s.techer_number) AS no_students, s.techer_number AS teacher_number
FROM students s
GROUP BY s.teacher_number
HAVING COUNT(s.teacher_number) > 3
```

#### Exercise

Ask the students to write a query that retrieves all managers with the number of employees that are reporting to them. In this query they should use DISTINCT and GROUP BY keywords.

Next, ask them to extend the query to retrieve the managers who have more than 5 employees are reporting to them.



