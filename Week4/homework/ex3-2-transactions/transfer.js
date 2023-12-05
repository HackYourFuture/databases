require("dotenv").config();
const { MongoClient } = require("mongodb");

async function transfer(fromAccountNumber, toAccountNumber, amount, remark) {
  const mongoURI = process.env.MONGO_URI;
  const client = new MongoClient(mongoURI, { useUnifiedTopology: true });

  let session = null;

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("bank"); 
    const collection = database.collection("accounts"); 

    session = client.startSession();
    session.startTransaction();

const fromAccount = await collection.findOneAndUpdate(
  { account_number: fromAccountNumber },
  {
    $inc: { balance: -amount },
    $push: {
      account_changes: {
        change_number: await collection.countDocuments({
          account_number: fromAccountNumber,
        }),
        amount: -amount,
        changed_date: new Date(),
        remark: remark,
      },
    },
  },
  { session, returnDocument: "after" } 
);

const toAccount = await collection.findOneAndUpdate(
  { account_number: toAccountNumber },
  {
    $inc: { balance: amount },
    $push: {
      account_changes: {
        change_number: await collection.countDocuments({
          account_number: toAccountNumber,
        }),
        amount: amount,
        changed_date: new Date(),
        remark: remark,
      },
    },
  },
  { session, returnDocument: "after" } 
);

    await session.commitTransaction();
    console.log(
      `Transferred ${amount} from ${fromAccountNumber} to ${toAccountNumber}`
    );
  } catch (err) {
    console.error("Error:", err);
    if (session) {
      try {
        await session.abortTransaction();
      } catch (abortErr) {
        console.error("Error aborting transaction:", abortErr);
      } finally {
        session.endSession();
      }
    }
  } finally {
    await client.close();
  }
}

module.exports = transfer;
