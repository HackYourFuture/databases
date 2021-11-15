const util = require('util')
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
const csv = require('csvtojson');

// Import data from CSV File using the csvtojson library
async function importFromCSV(csvFilePath, Collection) {
  csv()
  .fromFile(csvFilePath)
  .then(async (jsonObj)=>{
      for(const line of jsonObj) {
        let result = await Collection.insertOne(line);
      }
  })
}

async function seedDatabase() {
    try {
        await client.connect();
        importFromCSV('./csv-files/city.csv', client.db("world").collection("city"));
        importFromCSV('./csv-files/country.csv', client.db("world").collection("country"));
        importFromCSV('./csv-files/countrylanguage.csv', client.db("world").collection("countrylanguage"));
        const myCity = { "Name": "Atlantis", "CountryCode": "GRC" };
        await client.db("world").collection("city").insertOne(myCity);
        await client.db("world").collection("city").updateOne({"Name": myCity.Name }, {$set: {'Population': 120000}});
        const result = await client.db("world").collection("city").findOne({ "Name": myCity.Name, "CountryCode": "GRC" });
        console.log(result);
        client.db("world").collection("city").deleteOne({ "Name": myCity.Name })
    } catch(error) {
        console.error(error);
    } finally {
      //  await client.close();
      // if I don't comment this it will throw an exception, 
      // I think that because the function finishes first will clause the connection...
      // So what's the right way to close the database in this scenario
    }
}

seedDatabase();
