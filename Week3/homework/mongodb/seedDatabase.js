const data = require('./data.json');

/**
 * Seeds the MongoDB collection 'bob_ross_episodes' with cleaned episode data.
 * - Checks if the collection exists
 * - If it exists: deletes all documents
 * - If not: creates the collection
 * - Transforms raw JSON data into a clean format:
 *   { episode, title, elements[] }
 * - Inserts all cleaned documents into the collection
 */

const seedDatabase = async (client) => {
  const db = client.db('databaseWeek3');
  const collectionName = 'bob_ross_episodes';

  // Check if the collection already exists
  const hasCollection = await db
    .listCollections({ name: collectionName })
    .hasNext();

  let bobRossCollection;

  if (hasCollection) {
    // If the collection exists, delete its contents
    bobRossCollection = db.collection(collectionName);
    console.log(`Collection '${collectionName}' found. Clearing existing documents...`);
    await bobRossCollection.deleteMany({});
  } else {
    // If the collection doesn't exist, create it
    console.log(`Collection '${collectionName}' not found. Creating new one...`);
    bobRossCollection = await db.createCollection(collectionName);
  }

  // Transform raw data into clean episode documents
  const documents = data.map((item) => {
    const episode = item.EPISODE;
    const title = item.TITLE.replaceAll('"', '');

    // Extract elements where value === 1 (meaning true)
    const elements = Object.keys(item)
      .filter((key) => !['EPISODE', 'TITLE'].includes(key) && item[key] === 1);

    return { episode, title, elements };
  });

  // Insert the cleaned documents into the collection
  const result = await bobRossCollection.insertMany(documents);
  console.log(`Seeding completed: ${result.insertedCount} episodes added to '${collectionName}'.`);
};

module.exports = {
  seedDatabase
};