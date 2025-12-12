const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

async function setupAccounts() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("databaseWeek4");
    const accounts = db.collection("accounts");

    await accounts.deleteMany({});

    const now = new Date();

    const sampleAccounts = [
      {
        account_number: 101,
        balance: 5000,
        account_changes: [
          {
            change_number: 1,
            amount: 5000,
            changed_date: now,
            remark: "Initial deposit",
          },
        ],
      },
      {
        account_number: 102,
        balance: 3000,
        account_changes: [
          {
            change_number: 1,
            amount: 3000,
            changed_date: now,
            remark: "Initial deposit",
          },
        ],
      },
      {
        account_number: 103,
        balance: 2000,
        account_changes: [
          {
            change_number: 1,
            amount: 2000,
            changed_date: now,
            remark: "Initial deposit",
          },
        ],
      },
    ];

    await accounts.insertMany(sampleAccounts);

    console.log(" Accounts collection initialized");
  } catch (err) {
    console.error(" Error in setupAccounts:", err);
  } finally {
    await client.close();
  }
}

module.exports = { setupAccounts };
