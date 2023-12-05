require("dotenv").config();
const { MongoClient } = require("mongodb");

async function setup() {
  const mongoURI = process.env.MONGO_URI;
  const client = new MongoClient(mongoURI, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("bank"); // Replace with your database name
    const collection = database.collection("accounts"); // Replace with your collection name

    // Clean up existing data
    await collection.deleteMany({});

    // Sample account data
    const sampleData = [
      {
        account_number: 201,
        balance: 4000,
        account_changes: [],
      },
      {
        account_number: 202,
        balance: 4000,
        account_changes: [],
      },
      // Add more sample accounts as needed
    ];

    // Insert sample data into the collection
    await collection.insertMany(sampleData);
    console.log("Sample data inserted successfully");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

module.exports = setup;
