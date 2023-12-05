require("dotenv").config();
const fs = require("fs");
const csv = require("csv-parser");
const { MongoClient } = require("mongodb");

const mongoURI = process.env.MONGO_URI;
const client = new MongoClient(mongoURI, { useUnifiedTopology: true });

async function insertDocuments(data) {
  try {
    await client.connect();
    console.log("Connected to the database");
    const database = client.db('population_pyramid_1950-2022');
    const collection = database.collection('populationData');

    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents inserted`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    client.close();
    console.log("Connection closed");
  }
}

const data = [];

fs.createReadStream("./population_pyramid_1950-2022.csv")
  .pipe(csv())
  .on("data", (row) => {
    data.push({
      Country: row.Country,
      Year: parseInt(row.Year),
      Age: row.Age,
      M: parseInt(row.M),
      F: parseInt(row.F),
    });
  })
  .on("end", () => {
    insertDocuments(data);
  });
