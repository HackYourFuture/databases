# Homework Databases Week 3

## **Todo list**

1. Practice the concepts
2. Prep exercises
3. Database exercises
4. Code along

## 1. **Practice the concepts**

Let's do a warming up with some interactive exercises! Let's start with doing lesson 13-18 from the following:

- [SQLBolt](https://sqlbolt.com/lesson/select_queries_introduction)

Then let's practice some MongoDB queries! Start by creating an Atlas account over [here](https://www.mongodb.com/cloud/atlas/lp/try2). Atlas is MongoDB's own cloud service that hosts mongodb databases and luckily they offer a very gracious free tier to play around with. Once you have created an account make sure to create a database cluster which can be your playground for the following:

- [MongoDB practice exercises](https://gist.githubusercontent.com/theRemix/7305403e1ab6fc8674f0/raw/c068ab51e930eb133a9443caa314205a89ef4d61/exercise.md) Note that this is a raw markdown file so you may want to copy it into your editor and save it as `.md` to get syntax highlighting. The live version has comments with answers which you can check out after over [here](https://gist.github.com/theRemix/7305403e1ab6fc8674f0#file-exercise-md).

## 2. **Prep exercises**

> Prep exercises are exercises that you should work on _before_ the session on Sunday. These are a little more difficult or show an important concept and as such are a great exercise to talk about with your mentor. Have a solution ready by Sunday as you may be asked to show what you did.

Inside your `databases` fork, go to the folder `Week3`. Inside of that folder, navigate to `QA_PREP_EXERCISE.md` file which explains what needs to be done. There will also be some questions at the bottom to think about. Go through them _before_ the session on Sunday as it will be covered then.

## 3. **Database exercises**

> You will need to do some research to solve these exercises. All the concepts necessary to solve these exercises are NOT covered in the reading material. This is on purpose.

> Save all of your files in the `homework` folder inside `Week3`!

### 3.1. **Exercise 1 : Normalization**

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

### 3.2. **Exercise 2 : Transactions**

1. Create two tables `account` and `account_changes` (write transactions-create-tables.js file)
2. `account` table should have following fields : `account_number, balance`.
3. `account_changes` table should have the following fields : `change_number, account_number, amount, changed_date, remark`.
4. Choose the appropriate data types and keys for these tables.
5. Insert some sample data in these tables. (write transactions-insert-values.js file)
6. Transfer the amount of 1000 from account number 101 to account number 102 and log the changes in the table `account_changes`.
   Do this in a _single transaction_ (Write transaction.js file)

Submit all three files (`transactions-create-tables.js`, `transactions-insert-values.js` and `transaction.js`).

### 3.3. **Exercise 3 : SQL injection**

You are given the below function which returns the population of a specific country from the [world](../Week2/world.sql) database.

```js
function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}
```

1. Give an example of a value that can be passed as `name` and `code` that would take advantage of SQL-injection and (fetch all the records in the database)
2. Rewrite the function so that it is no longer vulnerable to SQL injection

### 3.4. **Exercise 4 : MongoDB CRUD**

You should already have an atlas account that we will use again for this exercise. Let's first create a new database that this exercise can use: `databaseWeek3` and the collection `bob_ross_episodes`. You can do this manually in Atlas, look up how to do that yourself.

Once you have created the database it is time to set up our environment so that our code can connect to this database. In the past you may have put this connection information (think of API keys) in your PRs, but from now on that should not happen anymore. The way we usually do this is by creating a `.env` file and adding that to the `.gitignore` file so that it does not get pushed to git. We have set up the `.gitignore` file and provided you with an `.env.example` file that gives an example of what you `.env` file should look like. Have a look in it to see how you should create the `.env` file.

> You will need to figure out a way to get these `.env` variables into the process environment. This is almost always done using a library, but it is up to you to figure out which one this is and set it up correctly.

Now that everything is set up, have a look at `index.js` to see what we would like you to do. We have provided a `seedDatabase` file that cleans up the database and collection to ensure that you are working with the same data every time.

> The `index.js` file also assumes some things are set up, when you run it you will encounter an error that you will need to solve.

In this exercise we are going to work with the Bob Ross episode data, if you haven't heard of Bob Ross he was a painter that made a legendary TV show called [The Joy of Painting](https://en.wikipedia.org/wiki/The_Joy_of_Painting). In every episode he created a landscape painting that was easy to follow along to, have a look at the [official youtube channel](https://www.youtube.com/c/BobRossIncVideos) to watch some! The data in the `data.json` file is a list of all the episodes, with their title and the elements he painted in that episode. Note that we massage this data a bit in the `seedDatabase` file so have a look there and in your database on what the structure is in the end.

## **4. Code along**

In this week's code along you'll be building a complete CRUD app. However, instead of using MySQL it'll be MongoDB you'll use as a database!

- [CRUD app from scratch using Node.js](https://www.youtube.com/watch?v=CyTWPr_WwdI)

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! The homework that needs to be submitted is the following:

1. Database exercises

Upload your code to your forked Databases repository in GitHub. Make a pull request to HackYourHomework's forked repository.

> Forgotten how to upload your homework? Go through the [guide](../hand-in-homework-guide.md) to learn how to do this again.

_Deadline Tuesday 23.59 CET_
