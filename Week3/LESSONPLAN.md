# Lesson Plan Databases Week 3

The lesson plan is primarily written for teachers so that they can
use examples and anecdotes from this document in conjunction with the README
and explain the concepts better in the class.

##  Topics (essentially same as the README file)
0. Super Key vs Candidate Key vs Primary key
1. Normalization
2. Transactions
3. SQL injection
4. NoSQL (with MongoDB)
5. Non-relational vs. relational

## 0. Super Key vs Candidate Key vs Primary key

#### Explanation
1. Super key is a set of columns that uniquely identify a row.
2. Candidate key is a minimal super key that can uniquely identify a row.
3. Primary key is a choice of candidate key chosen by the database designer.

#### Example
For the following table
`Employee (employee_id, employee_name, gender, salary, department, age, city)`
* Two super keys from this table are
1. SK1 = `{employee_name, department, age, city}`
2. SK2 = `{employee_id, employee_name, salary}`

* The candidate keys derived from these super key can be 
1. CK1 from SK1 = `{employee_name, city}` 
if two employees with the same name always come from different city.
Then, we don't need the `age` and `department` columns in this candidate key.
2. CK2 from SK2 = `{employee_id}` if different identifier is generated for every
employee. Then we don't need the `employee_name` and `salary` columns in this candidate key.

* The primary key chosen from these candidate keys could be `employee_id`.

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
Different levels of normalization are called *normal forms*.
A table is said to be in `X normal form` if it satisfies all rules
defined by that normal form and all the normal forms before X.

#### 1NF (4 rules)
1. Single valued columns (each column should have atomic value, no multiple values)
2. Column domain (for any column) should not change.
3. Unique names for columns.
4. Order (of rows/columns) does not matter.

#### 2NF (1NF + rule)
* no non-prime column that is not a part of primary key
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
* No transitive dependency (i.e. no column should depend on non-key column).


#### 3.5NF AKA BCNF (3NF + rule)
* For any dependency A => B, A should be a super key.
In other words, for a dependency A => B, A cannot be a non-prime column, if B is a prime column.

#### 4NF (3NF + rule)
* No multi-value dependency.

### Example

#### 1NF

Consider the following table

+-------------+------------+-----------------------+
| Employee Id |   Name     |   Contact             |
+-------------+------------+-----------------------+
|       101   |   Amit     | 0684927317            |
|       102   |   Ben      | 0634899234, ben@bu.nl |
|       103   |   Cathy    | 0647882102, cat@dog.us|
|       104   |   Dua      | 0622467559            |
+-------------+------------+-----------------------+

This table is not in 1NF because rule (1) of 1NF is violated because
row 2 and row 3 contain multiple values for the column `Contact`.
Also the rule (2) of 1NF is violated because the column `Contact` contains
numeric values (for phone numbers) and string value (for emails).

This table could be converted to 1NF as follows:

+-------------+------------+------------------------+
| Employee Id |   Name     | Phone      | Email     |
+-------------+------------+------------------------+
|       101   |   Amit     | 0684927317 | NULL      |
|       102   |   Ben      | 0634899234 | ben@bu.nl |
|       103   |   Cathy    | 0647882102 | cat@dog.us|
|       104   |   Dua      | 0622467559 | NULL      |
+-------------+------------+----------------------- +

In real life, you actually need to
* DROP column Contact.
* ADD column Phone with the type int.
* ADD column Email with the type varchar(50).

#### 2NF

Consider the following table (employee-project M-M relationship table).
+-------------+------------+-----------------------+
| Employee Id | Project ID |  Project Budget       |
+-------------+------------+-----------------------+
|       101   |   1001     | 317                   |
|       102   |   1001     | 234                   |
|       103   |   2001     | 102                   |
|       104   |   2001     | 559                   |
+-------------+------------+-----------------------+

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
+-------------+------------+-----------------------+
| Employee Id | Dept Id    |  Dept Location        |
+-------------+------------+-----------------------+
|       101   |   2221     | Amsterdam             |
|       102   |   2221     | Amsterdam             |
|       103   |   3335     | Rome                  |
|       104   |   3335     | Rome                  |
+-------------+------------+-----------------------+

This table violates the 3NF because there is a transitive dependency.
`Employee Id => Dept Id` and  `Dept Id => Dept Location.`
`Dept Location` column depends on the `Dept Id` which is not a primary key column.

#### 3.5 NF (AKA BCNF)
Consider the following table (students opting for subjects)
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

This table violates the 3.5NF because there is a functional dependency
`Professor => Subject` and `Professor` is not a super key.
`Student Id + Subject` is the primary key. Hence `Subject` is a prime column.

This table could be converted to 3.5NF as follows:
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

and 

+-------------+------------+----------+
| Prof Id     | Professor  |  Subject |
+-------------+------------+----------+
|   P0001     |   X        | C++      |
|   P0002     |   Y        | Java     |
+-------------+------------+----------+


#### 4NF
Consider the following table (students opting for subjects)
+-------------+------------+-----------+
| Student     | Subject    |  Hobby    |
+-------------+------------+-----------+
|    Benno    |  Excel     |  Violin   |
|    Benno    |  Python    |  Woodwork |
|    Benno    |  Dutch     |  Paint    |
|    Lukas    |  Java      |  Running  |
|    Lukas    |  C++       |  Reading  |
+-------------+------------+-----------+

This table violates 4NF because `Subject` and `Hobby` are independent of each other.
Hence the hobby of the student must be repeated in the table with each subject
the student chooses. 
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

It leads to a lot of repetition.
This table could be converted to 4NF by splitting it into two.

+-------------+------------+
| Student     | Subject    |
+-------------+------------+
|    Benno    |  Excel     |
|    Benno    |  Python    |
|    Benno    |  Dutch     |
|    Lukas    |  Java      |
|    Lukas    |  C++       |
+-------------+------------+
and 

+-------------+-----------+
| Student     |  Hobby    |
+-------------+-----------+
|    Benno    |  Violin   |
|    Benno    |  Woodwork |
|    Benno    |  Paint    |
|    Lukas    |  Running  |
|    Lukas    |  Reading  |
+-------------+-----------+

### Exercise

Normalize the following table.
+-------------+------------+-----------------------------------------------+------------+
| Full name   | Adddress   |  Movies rented                                | Salutation |
+-------------+------------+-----------------------------------------------+------------+
| Janet Jones | 5 John St  |  Pirate of the Carribean, Clash of the Titans |     Ms.    |
| Rob Smith   | 12 Ann St  |  Shawshank Redemption, Beautiful mind         |     Mr.    |
| Rob Smith   | 9 Joy St   |  Clash of the Titans                          |     Mr.    |
+-------------+------------+-----------------------------------------------+------------+

### Essence
Normal forms help in a better database design mostly by reducing redundancy.

## 2. Transactions
### Explanation
Transactions are used every day in programming. Kind of like prepared statements they only make sense when a program interacts with the database. They are not useful in the sense of providing new features but are necessary if we want to keep the data correct, or as we say in the software world keep the data *consistent*.

### Example
![transaction example](https://lh3.googleusercontent.com/proxy/8RnA6wqcQxTQKJvmE7KNnhwWkWTYLXRS4lnwwpdwECLDbRoN4yEgaclhZ1pDzLi0eEHULy-_V5Lk2HkH_yFCNUa5i165WVhCR3-DvprDYem7Ai_jrP0XDSo9-L61MM4)

### Exercise

No time. There will be an exercise in the homework.

### Essence
The students should know about the existence of a transaction and have some idea of what they do and how to use them.

## 3. SQL injection

### Explanation
SQL injection is a form of hacker attack where the attacker tries to get our program to execute a query to read/write data that they should not have access to.

### Example
See examples from `readme`

For use of prepared statements some minimal codes are available here: https://evertpot.com/executing-a-mysql-query-in-nodejs/

### Exercise

This is an interactive exercise that takes 5-10 minutes, does not explain prepared statements, only how SQL injection works.
https://www.hacksplaining.com/exercises/sql-injection#/start

https://github.com/HackYourFuture/databases/blob/master/Week3/sql-injection.js

### Essence
Students know about the dangers of SQL injection and how to protect their app by using prepared statements.

## 4. No SQL
### Explanation
### Example

> use the same tables (as Week 1 lessonplan) here to be consistent and show students how to make similar databases using MySQL and NoSQL

### Exercise



### Essence

## 5. Non-relational vs. relational
### Explanation
### Example (in the format Language : Commands)
### Exercise
### Essence

