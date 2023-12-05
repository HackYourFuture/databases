require("dotenv").config();
const { MongoClient } = require("mongodb");

const mongoURI = process.env.MONGO_URI;

async function getContinentInfoByYearAndAge(year, ageGroup) {
  const client = new MongoClient(mongoURI);

  try {
    await client.connect();

    const database = client.db('population_pyramid_1950-2022');
    const collection = database.collection('populationData');

    const pipeline = [
      { 
        $match: { Year: year, Age: ageGroup } 
      },
      {
        $addFields: {
          TotalPopulation: { $add: ["$M", "$F"] }
        }
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

getContinentInfoByYearAndAge(2020, "100+")
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error('Error:', err);
  });