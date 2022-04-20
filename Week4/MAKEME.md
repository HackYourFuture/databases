# Homework Databases Week 4

## **Todo list**

1. Practice the concepts
2. Prep exercises
3. MongoDB exercises
4. Code along

## 1. **Practice the concepts**

Let's practice some advanced MongoDB queries. Have a look at the following exercises. If you feel unsure about the commands you used last week then feel free to also do 01 and 02 of this series. You will need to go back to 00 to import the data into your database:

- [Advanced MongoDB exercises](https://github.com/mattdavis0351/mongodb-labs/blob/master/exercises/03_advanced-mongo-queries.md)

## 2. **Prep exercises**

> Prep exercises are exercises that you should work on _before_ the session on Sunday. These are a little more difficult or show an important concept and as such are a great exercise to talk about with your mentor. Have a solution ready by Sunday as you may be asked to show what you did.

Inside your `databases` fork, go to the folder `Week4`. Inside of that folder, navigate to `QA_PREP_EXERCISE.md` file which explains what needs to be done. There will also be some questions at the bottom to think about. Go through them _before_ the session on Sunday as it will be covered then.

## 3. **MongoDB exercises**

Let's create a fresh database for this week's homework. You can create a database called `databaseWeek4` that you can use for the following exercises.

### 3.1 **Exercise 1 : Aggregation**

Let's practice some aggregation queries, for that we will have to use some data and luckily [kaggle](https://www.kaggle.com/) is a great website that provides datasets to use. In the `ex1-aggregation` folder you will find a csv file with data for you.

1. Find a way to get the data in the csv file into your MongoDB database. The documents should look like:

```js
{
  _id: ObjectId(625ff77ada84ee8b5dd06e82),
  Country:"Afghanistan",
  Year:1950,
  Age:"20-24",
  M:374109,
  F:318392
}
```

2. Write a function that will return the array of the total population (M + F over all age groups) for a given `Country` per year. The result should look something like this, these are the values for `Netherlands`:

```js
[
  { _id: 1950, countPopulation: 10042051 },
  { _id: 1960, countPopulation: 11448815 },
  { _id: 1970, countPopulation: 13001941 },
  { _id: 1980, countPopulation: 14148410 },
  { _id: 1990, countPopulation: 14965442 },
  { _id: 2000, countPopulation: 15926188 },
  { _id: 2010, countPopulation: 16682925 },
  { _id: 2020, countPopulation: 17134872 },
  { _id: 2022, countPopulation: 17211448 },
];
```

3. Write a function that will return all of the information of each continent for a given `Year` and `Age` field but add a new field `TotalPopulation` that will be the addition of `M` and `F`. For example, if I would give `2020` for the `Year` and `100+` for the `Age` it should return something like this:

```js
[
  {
    _id: new ObjectId("62600561b0a05834e3382cf8"),
    Country: "AFRICA",
    Year: 2020,
    Age: "100+",
    M: 1327,
    F: 2723,
    TotalPopulation: 4050,
  },
  {
    _id: new ObjectId("62600561b0a05834e3382da0"),
    Country: "ASIA",
    Year: 2020,
    Age: "100+",
    M: 57019,
    F: 207883,
    TotalPopulation: 264902,
  },
  {
    _id: new ObjectId("62600561b0a05834e33832a1"),
    Country: "EUROPE",
    Year: 2020,
    Age: "100+",
    M: 22579,
    F: 102056,
    TotalPopulation: 124635,
  },
  {
    _id: new ObjectId("62600561b0a05834e33835d4"),
    Country: "LATIN AMERICA AND THE CARIBBEAN",
    Year: 2020,
    Age: "100+",
    M: 19858,
    F: 49218,
    TotalPopulation: 69076,
  },
  {
    _id: new ObjectId("62600561b0a05834e3383946"),
    Country: "NORTHERN AMERICA",
    Year: 2020,
    Age: "100+",
    M: 22267,
    F: 83419,
    TotalPopulation: 105686,
  },
  {
    _id: new ObjectId("62600561b0a05834e3383985"),
    Country: "OCEANIA",
    Year: 2020,
    Age: "100+",
    M: 1094,
    F: 3980,
    TotalPopulation: 5074,
  },
];
```

### 3.2 **Exercise 2 : Transactions**

Just like last week, let's solve the same transaction problem but then in MongoDB. Note that you will need to include some libraries which means you will need to set that up as well (use the `ex2-transactions` folder for this). You will also probably want to add an `index.js` that calls the functions we will create to test it out, we leave the implementation of that up to you. Now let's get started, we will split our code into multiple files again, first being the setup file:

1. Create a `setup.js` file.
2. It should clean up the `accounts` array and then fill it with some sample data. Just like last last week we want an account document to have an `account_number` and `balance` field. Then it should have another field called `account_changes` that is an array that contains the fields: `change_number, amount, changed_date, remark`.
3. It's probably best to make this a function that you can export and call

Then it is time to write our transaction function:

1. Create a `transfer.js` file that will hold our `transfer` function.
2. It should transfer money from one account to another, so it will need to know the following things: from which account, to which account, the amount and the remark for this transaction.
3. This should update the balances of both accounts and for each account add a change to the list. The change number should be incremented, so if the latest `change_number` is 30, the `change_number` for the new change should be 31.
4. Test that it works by calling the function to transfer 1000 from account number 101 to account number 102.

Submit the `setup.js` and `transfer.js` files.

## 4. **Code Along**

This week we have a small code along to show how to implement pagination and make it reusable for all your routes!

- [Paginated API with Node and Mongoose](https://www.youtube.com/watch?v=ZX3qt0UWifc). We will be working in Mongoose in the final project, but this gives a little teaser on what mongoose is!

## **SUBMIT YOUR HOMEWORK!**

After you've finished your todo list it's time to show us what you got! The homework that needs to be submitted is the following:

1. MongoDB exercises

Upload your code to your forked Databases repository in GitHub. Make a pull request to HackYourHomework's forked repository.

> Forgotten how to upload your homework? Go through the [guide](../hand-in-homework-guide.md) to learn how to do this again.

_Deadline Tuesday 23.59 CET_
