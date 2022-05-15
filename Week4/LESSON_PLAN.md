# Lesson Plan Databases Week 4

The lesson plan is primarily written for teachers so that they can
use examples and anecdotes from this document in conjunction with the README
and explain the concepts better in the class.

## Topics

1. Embedded vs Normalised data modeling
2. Advanced MongoDB operations
3. Pagination
4. Indexes in MongoDB
5. Transactions in MongoDB
6. SQL vs NoSQL databases

## 1. Embedded vs Normalised data modeling

### Explanation

1. Embedded means that information is stored in a sub-object in a collection
2. Normalised means that information is stored in different collection but are referencing each other

### Example

Let's have a look at a bug logging database.

#### The embedded way

```js
const bugs = [
  {
    timestamp: new Date(),
    page: "about",
    stacktrace: "", // removed for clarity
    reporter: {
      email: "rob@thebugcreator.com",
      name: "Rob",
    },
  },
];
```

#### The normalised way

```js
const accounts = [
  {
    id: ObjectId("507f191e810c19729de86032"),
    email: "rob@thebugcreator.com",
    name: "Rob",
  },
];

const bugs = [
  {
    timestamp: new Date(),
    page: "about",
    stacktrace: "", // removed for clarity
    reporterId: ObjectId("507f191e810c19729de86032"),
  },
];
```

### Exercise

Discuss the differences and what the advantages/disadvantages are to each approach. For example:

Embedded allows for faster querying.
Normalized allows for less data duplication.

### Essence

There are advantages to both approaches and in the wild you will have to decide which to use every time.

## 2. Advanced MongoDB operations

### Explanation

1. The `sort` command allows you to sort data that you get back from your query.
2. The `limit` command allows you to limit how many items you get back from your query.
3. The `aggregate` command allows the combination and calculation of data in one or more collections.

### Example

Let's assume a log database with the following information:

```js
const bugs = [
  {
    timestamp: new Date('2000-06-07T11:24:00'),
    page: "about",
    stacktrace: "", // removed for clarity
    reporterId: ObjectId("507f191e810c19729de86032"),
  }, {
    timestamp: new Date('2000-06-06T12:23:00'),
    page: "about",
    stacktrace: "", // removed for clarity
    reporterId: ObjectId("507f191e810c19729de86032"),
  }. {
    timestamp: new Date('2000-06-08T12:33:00'),
    page: "contact",
    stacktrace: "", // removed for clarity
    reporterId: ObjectId("e810507f191de86032c19729"),
  }, {
    timestamp: new Date('2000-06-06T12:34:00'),
    page: "home",
    stacktrace: "", // removed for clarity
    reporterId: ObjectId("e810507f191de86032c19729"),
  }
];
```

#### Sort

If we want to sort the find query on the timestamp to find the latest bugs we can run the following query:

```js
client.db("logging").collection("bugs").find().sort({ timestamp: -1 });
```

#### Limit

The above query will give you back all of the bugs which is not great, as such we can use the limit command as follows:

```js
client
  .db("logging")
  .collection("bugs")
  .find()
  .sort({ timestamp: -1 })
  .limit(10);
```

This will give only the last 10 bugs, which is more manageable. Note that you can put the `sort` and `limit` commands in any order!

#### Aggregate

Let's say we want to have a count of how many bugs appear per page. To do that we can do the following:

```js
client
  .db("logging")
  .collection("bugs")
  .aggregate([
    {
      $group: {
        _id: "$page",
        count: { $count: {} },
      },
    },
  ]);
```

This will give back an object with the page field in the `_id` field and the number of bugs that were logged on that page is in the `count` field!

### Exercise

Think of some other things to sort on or calculate and write the code to do that.

### Essence

MongoDB does a lot for you, the syntax is a little different than known, but the documentation is very detailed so make use of it!

## 3. Pagination

Using the same bugs collection, let's look at offset and cursor-based pagination using that collection.

### Explanation

Go to different online shops and look at their results pages to show pagination in action.

### Example

Given the bugs database in the previous section let's implement both types of pagination:

#### Offset-based

```js
client
  .db("logging")
  .collection("bugs")
  .find()
  .sort({ timestamp: -1 })
  .limit(10)
  .skip(20);
```

This would skip 20 results and then show the next 10. So would be on page 3 if we show 10 results per page!

#### Cursor-based

```js
const latestBugs = await client
  .db("logging")
  .collection("bugs")
  .find({
    timestamp: { $lt: next || new Date() },
  })
  .sort({ timestamp: -1 })
  .limit(10);

const cursorToGiveToUser = latestBugs[latestBugs.length - 1].timestamp;
```

Two important things here:

- You need to always have the data sorted if you do cursor-based sorting as you are including the point you are at in the query.
- You have to provide the user of your endpoint the information they need to send for the next query

In the above code we do it with the timestamp, in other implementations an ID can be given.

### Exercise

Discuss the advantages and disadvantages of both approaches.

### Essence

Pagination needs to be done, important to note is that it only works with sorted data!

## 4. Indexes

## 5. Transactions

### Explanation

The idea behind an index and a transaction should already be clear as it has been handled in SQL. So purely syntax here, but if students cannot explain why we do these things, then go through it with them again.

### Example

```js
client.db("logging").collection("bugs").createIndex({ timestamp: -1 });
```

This creates an index for sorting descending on timestamp which we have been querying a lot.

```js
async function transferCredits(fromAccountId, toAccountId, amount) {
  const accountsCollection = client.db("billing").collection("accounts");
  const session = client.startSession();

  try {
    session.withTransaction(async () => {
      // Remove from fromUser
      await accountsCollection.updateOne(
        { _id: fromAccountId },
        { $inc: { credits: amount * -1 } },
        { session }
      );

      // Add to toUser
      await accountsCollection.updateOne(
        { _id: toAccountId },
        { $inc: { credits: amount } },
        { session }
      );
    });
  } catch (err) {
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
}
```

### Exercise

Discuss when and why to do indexes and transactions. What kind of scenarios are there.

### Essence

Both indexes and transactions have a cost attached to them, but can improve your databases performance and security!

## 6. SQL vs NoSQL

The prep exercise handles this, have a look at it [here](./QA_PREP_EXERCISE.md)
