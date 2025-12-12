const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

async function transfer(fromAccountNumber, toAccountNumber, amount, remark) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("databaseWeek4");
    const accounts = db.collection("accounts");

    const fromAccount = await accounts.findOne({
      account_number: fromAccountNumber,
    });
    const toAccount = await accounts.findOne({
      account_number: toAccountNumber,
    });

    if (!fromAccount || !toAccount) {
      throw new Error("One or both accounts not found");
    }

    if (fromAccount.balance < amount) {
      throw new Error("Insufficient funds in source account");
    }

    const now = new Date();

    const nextChangeFrom =
      (fromAccount.account_changes?.[fromAccount.account_changes.length - 1]
        ?.change_number || 0) + 1;

    const nextChangeTo =
      (toAccount.account_changes?.[toAccount.account_changes.length - 1]
        ?.change_number || 0) + 1;

    await accounts.updateOne(
      { account_number: fromAccountNumber },
      {
        $inc: { balance: -amount },
        $push: {
          account_changes: {
            change_number: nextChangeFrom,
            amount: -amount,
            changed_date: now,
            remark,
          },
        },
      }
    );

    await accounts.updateOne(
      { account_number: toAccountNumber },
      {
        $inc: { balance: amount },
        $push: {
          account_changes: {
            change_number: nextChangeTo,
            amount: amount,
            changed_date: now,
            remark,
          },
        },
      }
    );

    console.log(
      `Transferred ${amount} from ${fromAccountNumber} to ${toAccountNumber}`
    );
  } catch (err) {
    console.error("Transfer failed:", err.message);
    throw err;
  } finally {
    await client.close();
  }
}

module.exports = { transfer };
