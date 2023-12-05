require("dotenv").config();
const { MongoClient } = require("mongodb");

const mongoURI = process.env.MONGO_URI;

async function getTotalPopulationByYear(countryName) {
  const client = new MongoClient(mongoURI);

  try {
    await client.connect();
    console.log("Connected to the database");
    const database = client.db('population_pyramid_1950-2022');
    const collection = database.collection('populationData');

    const pipeline = [
      { 
        $match: { Country: countryName } 
      },
      {
        $group: {
          _id: "$Year",
          countPopulation: {
            $sum: { $add: ["$M", "$F"] }
          }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ];

    const result = await collection.aggregate(pipeline).toArray();
    return result;
  } catch (err) {
    console.error('Error:', err);
    return [];
  } finally {
    await client.close();
  }
}

getTotalPopulationByYear('Netherlands')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error('Error:', err);
  });