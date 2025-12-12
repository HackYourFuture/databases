const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function getPopulationByCountryPerYear(countryName) {
  const db = client.db("databaseWeek4");
  const collection = db.collection("population");

  const result = await collection
    .aggregate([
    
      { $match: { Country: countryName } },

      {
        $group: {
          _id: "$Year", 
          countPopulation: {
            $sum: {
              $add: [
                { $toLong: "$M" }, 
                { $toLong: "$F" },
              ],
            },
          },
        },
      },

      { $sort: { _id: 1 } },
    ])
    .toArray();

  return result;
}

async function getContinentsForYearAndAge(year, age) {
  const db = client.db("databaseWeek4");
  const collection = db.collection("population");

  const result = await collection
    .aggregate([
      {
        $match: {
          Year: year,
          Age: age,
        },
      },

      {
        $addFields: {
          TotalPopulation: {
            $add: [
              { $toLong: "$M" },
              { $toLong: "$F" },
            ],
          },
        },
      },
    ])
    .toArray();

  return result;
}

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const byYear = await getPopulationByCountryPerYear("Netherlands");
    console.log("Population of Netherlands per year:");
    console.log(byYear);

    const continents = await getContinentsForYearAndAge(2020, "100+");
    console.log(" Continents for 2020, Age 100+ :");
    console.log(continents);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();
