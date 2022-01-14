# Homework Databases Week 3

## **Todo list**

1. Practice the concepts
2. MySQL exercises
3. Code along

## 1. **Practice the concepts**

Let's do a warming up with some interactive exercises! Let's start with doing lesson 13-18 from the following:

- [SQLBolt](https://sqlbolt.com/lesson/select_queries_introduction)

## 2. **MySQL exercises**

> You will need to do some research to solve these exercises. All the concepts necessary to solve
these exercises are NOT covered in the reading material. This is on purpose.

**Exercise 1 : Normalization**

The manager of the dinner club would like to manage the information system that assists him to keep track of the dinners had by members.
Because the manager is not an expert of Information Systems, (s)he uses the following table to store the information.
Please help the manger by using the knowledge of database normal forms.
Save all answers in a text file / MD file.

1. What columns violate 1NF?
2. What entities do you recognize that could be extracted?
3. Name all the tables and columns that would make a 3NF compliant solution.

```
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
| member_id | member_name   | member_address | dinner_id | dinner_date | venue_code | venue_description | food_code | food_description |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
|         1 | Amit          | 325 Max park   | D00001001 | 2020-03-15  | B01        | Grand Ball Room   | C1, C2    | Curry, Cake      |
|         2 | Ben           | 24 Hudson lane | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         3 | Cristina      | 516 6th Ave    | D00001002 | 2020/03/15  | B02        | Zoku Roof Top     | S1, C2    | Soup, Cake       |
|         4 | Dan           | 89 John St     | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         1 | Amit          | 325 Max park   | D00001003 | 20-03-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
|         3 | Cristina      | 516 6th Ave    | D00001004 | Mar 25 '20  | B04        | Mama's Kitchen    | F1, M1    | Falafal, Mousse  |
|         5 | Gabor         | 54 Vivaldi St  | D00001005 | Mar 26 '20  | B05        | Hungry Hungary    | G1, P2    | Goulash, Pasca   |
|         6 | Hema          | 9 Peter St     | D00001003 | 01-04-2020  | B03        | Goat Farm         | P1, T1, M1| Pie, Tea, Mousse |
+-----------+---------------+----------------+-----------+-------------+------------+-------------------+-----------+------------------+
```

**Exercise 2 : Transactions**

1. Create two tables `account` and `account_changes` (write transactions-create-tables.js file)
2. `account` table should have following fields : `account_number, balance`.
3. `account_changes` table should have the following fields : `change_number, account_number, amount, changed_date, remark`.
4. Choose the appropriate data types and keys for these tables.
5. Insert some sample data in these tables. (write transactions-insert-values.js file)
6. Transfer the amount of 1000 from account number 101 to account number 102 and log the changes in the table `account_changes`.
Do this in a _single transaction_ (Write transaction.js file)

Submit all three files (`transactions-create-tables.js`, `transactions-insert-values.js` and `transaction.js`).

**Exercise 3 : SQL injection**

You are given the below function which returns the population of a specific country from the [world](../Week2/world.sql) database.

```js
function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function(err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}
```

1. Give an example of a value that can be passed as `name` and `code` that would take advantage of SQL-injection and
(fetch all the records in the database)
2. Rewrite the function so that it is no longer vulnerable to SQL injection

**Exercise 4 : MongoDB CRUD**

In week 1, you used a mysql database that had 3 tables: `cities`, `countries`, and `countrylanguage`.

We are going to migrate these tables into your Atlas MongoDB account

```sql
select * into outfile 'city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from city;

select * into outfile 'country.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from country;

select * into outfile 'countrylanguage.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from countrylanguage;
```

Then in Atlas , follow [add my own data](https://docs.atlas.mongodb.com/tutorial/insert-data-into-your-cluster) to import the csv data into new collections.

* Write down all the steps of conversion (installation, commands etc.) in a text file / MD file.

Write the following queries using MongoDB syntax in the JavaScript files.
1. Create a new record (document) for a new city (your home town, say)
2. Update that record with a new population
3. Read the document that you just updated in two ways : finding by the city name, and then by the country code
4. Delete the city

* Submit the javascript files for these queries.

## 3. **Code along**

In this week's code along you'll be building a complete CRUD app. However, instead of using MySQL it'll be MongoDB you'll use as a database!

- [CRUD app from scratch using Node.js](https://www.youtube.com/watch?v=CyTWPr_WwdI)

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! The homework that needs to be submitted is the following:

1. MySQL exercises

Upload your code to your forked Databases repository in GitHub. Make a pull request to HackYourHomework's forked repository.

> Forgotten how to upload your homework? Go through the [guide](../hand-in-homework-guide.md) to learn how to do this again.

_Deadline Tuesday 23.59 CET_
