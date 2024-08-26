//C:\Users\knowl\Documents\hyf\databases\Week3\homework\mongodb\seedDatabase.js
const data = require("./data.json");
const dotenv = require('dotenv');
dotenv.config();


/**
 * This function will drop and recreate the collection of sample data in our csv file.
 * By doing this we ensure that your functions are working on the same data, very similar to how you would set up a test environment.
 *
 * @param {MongoClient} client - The client that is connected to your database
 */
const seedDatabase = async (client) => {
  const db = client.db("databaseWeek3");  // Define the db variable
  const collectionName = "bob_ross_episodes";

  const hasCollection = await client
    .db("databaseWeek3")
    .listCollections({ name: "bob_ross_episodes" })
    .hasNext();

  if (!hasCollection) {
    // Create the collection if it doesn't exist
    await db.createCollection(collectionName);
  }

  const bobRossCollection = db.collection(collectionName);


    // Remove all the documents
    await bobRossCollection.deleteMany({});

    // Convert data to array version of elements
    const documents = data.map((dataItem) => {
      const { EPISODE, TITLE } = dataItem;

      const depictionElementKeys = Object.keys(dataItem).filter(
        (key) => !["EPISODE", "TITLE"].includes(key)
      );
      const depictionElements = depictionElementKeys.filter(
        (key) => dataItem[key] === 1
      );

      return {
        episode: EPISODE,
        // Remove the extra quotation marks
        title: TITLE.replaceAll('"', ""),
        elements: depictionElements,
      };
    });

    // Add our documents
    await bobRossCollection.insertMany(documents);

};

module.exports = {
  seedDatabase,
};
