# Lesson Plan Databases Week 3

The lesson plan is primarily written for teachers so that they can
use examples and anecdotes from this document in conjunction with the README
and explain the concepts better in the class.

##  Topics (essentially same as the README file)
1. Normalization and normal forms
2. Transactions
3. SQL injection
4. NoSQL (with MongoDB) - How to do CRUD operations
5. Non-relational vs. relational


## 1. Normalization and normal forms

### Explanation
The goal of normalization is to reduce duplication. This is done for 2 purposes:  
* Reducing the amount of storage needed to store the data.
* Avoiding unnecessary data conflicts that may creep in because of multiple copies of the same data getting stored.

Different levels of normalization are called *normal forms*. Go over the first and second normal forms. Do not ask students to memorize this, try to make them understand instead.
### Example
See examples from `readme`
https://github.com/HackYourFuture/databases/blob/master/Week3/README.md#1st-normal-form-1nf-4-rules
https://github.com/HackYourFuture/databases/blob/master/Week3/README.md#2nd-normal-form-2nf
### Exercise

Students should split in groups and discuss how to normalize the following table ![table](https://www.guru99.com/images/NormalizationTable1.png)
5 minutes
Ask a group of students to present their idea.
### Essence
Normalization as a process to have good quality database design. Normal forms give engineers a way to talk about normalization with a shared vocabulary.
Normalizing a table to 2nd NF means no multi-value columns and no columns that depend on a super-key.

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

