# Homework Databases Week 3

## **Todo list**

1. Practice the concepts
2. MySQL exercises
3. Code along

## 1. **Practice the concepts**

Let's do a warming up with some interactive exercises! Let's start with doing lesson 13-18 from the following:

- [SQLBolt](https://sqlbolt.com/lesson/select_queries_introduction)

## 2. **MySQL exercises**

> In the following 3 exercises you will make use of the `company` database (which you made in your week 1 homework). Before you start, double check in the command line to see if it's still there.

**Exercise 1 : Employee Skills**

The Human Resources department (HR) wants to keep track of the skills of different employees. For this, they suggest adding a `skills` column in the `employee` table.

The idea is to write the skills as a string, for example: `"Node.JS, SQL, React" or "SCRUM, product management"` etc. This is what they came up with:

```sql
| emp_no | emp_name | salary | reports_to | skills                    |
| ------ | -------- | ------ | ---------- | ------------------------- |
| 1      | John     | 5000   |            | SCRUM, product management |
| 2      | Daenerys | 3000   | 1          | Node.JS, SQL, React       |
```

You know that this is **not** good database design, so you suggest an alternative approach that complies with database `normal forms`: you need to add extra table(s).

Here are your instructions:

1. Think about how many new tables are needed.
2. Write a query for each table that needs to be created. Make sure to also specify the correct data types for each column
3. Add 5 rows to each table. Create the dataset yourself (it needs to be relevant to the table)

**Exercise 2 : Transactions**

It turns out that many departments are adopting a flat structure.

In this flat structure, there is one manager for the department and everyone reports to him. There are no middle-managers.

In this exercise you need to write a JavaScript function that receives 2 arguments: a department number and an employee number.

```js
function flatify(dept_no, emp_no)`
```

Here's what the function should do:

- Make the employee (identified by the employee number) a manager for the department (identified by the department number)
- Set all employees in that department to report to this new manager

Hint: Make sure to use `transactions`.

**Exercise 3 : SQL injection**

You are given the below function which returns the population of a specific country or city.

```js
function getPopulation(cityOrCountry, name, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${cityOrCountry} WHERE Name = ${name}`,
    function(err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}
```

1. Give an example of a value that can be passed as `name` that would take advantage of SQL-injection (for example, to insert new fake data in the database)
2. Rewrite the function so that it is no longer vulnerable to SQL injection

**Exercise 4 : MongoDB CRUD**

Use the SQL of the [world](../Week1/databases/world.sql) database into [Atlas](https://www.mongodb.com/cloud/atlas) that was shown in class.

`CRUD` stands for `Create`, `Read`, `Update`, `Delete`. You will:

1. Create a new record (document) for a new city (your home town, say)
2. Update that record with a new population
3. Read the document that you just updated in two ways : finding by the city name, and then by the country code
4. Delete the city

You will
(A) do the above steps in the database directly,
(B) and again using node.js libraries Mongoose and Express

A) Submit the 5 mongodb commands in a file called `mongoqueries.txt`

B) Edit the code from your _own_ Week 3 Node.js homework by creating a new branch.

    git checkout my-week3-nodejs-branch-already-existed
    git checkout -b dbweek3-mongo-new-branchname

Require mongoose. Create a new route which allows you to CRUD the above. Use your atlas connection details. Follow this [guide](https://alligator.io/nodejs/crud-operations-mongoose-mongodb-atlas/) . When done, commit and make a pull request to your own repository:

    git push -u origin
    git request-pull my-week3-nodejs-branch-already-existed origin dbweek3-mongo-new-branchname

Find the pull request in github, assign the homework grader to notify them, and copy the url to the TOP of your makeme file

```
cd databases/Week3
{ echo -n 'https://github.com/MYGITHUBNAME/Node.js/pull/123456/files '; cat MAKEME.md; } > MAKEME.md
```

**Exercise 5 : Relational vs Not-Only-SQL**

Add a 6th and 7th query to `mongoqueries.txt` which answer:

1. Amongst the countries with more than 50% Arabic speakers, what is the average percentage Arabic speakers? Use [this mongo sql comparison](https://docs.mongodb.com/manual/reference/sql-aggregation-comparison/)
2. List the top 10 cities of Western Europe in descending order of population. If aggregation pipelines were covered in class, follow a [stackoverflow guideline](https://stackoverflow.com/questions/35583569/mongodb-aggregation-with-lookup-limit-some-fields-to-return-from-query) . Otherwise, use the `lookup` [function](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#lookup-single-equality) . You can also choose instead to do this in node & mongo

## 3. **Code along**

In this week's code along you won't be building a complete CRUD app. However, instead of using MySQL it'll be MongoDB you'll use as a database!

- [CRUD app from scratch using Node.js](https://www.youtube.com/watch?v=CyTWPr_WwdI)

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! The homework that needs to be submitted is the following:

1. MySQL exercises

Upload your code to your forked Databases repository in GitHub. Make a pull request to HackYourFuture's forked repository.

> Forgotten how to upload your homework? Go through the [guide](../hand-in-homework-guide.md) to learn how to do this again.

_Deadline Saturday 23.59 CET_
