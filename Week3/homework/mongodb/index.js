require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const { seedDatabase } = require('./seedDatabase');

// Database and collection names
const dbName = 'databaseWeek3';
const collectionName = 'bob_ross_episodes';

/**
 * CREATE operation
 * Adds a new episode to the collection
 */
async function createEpisodeExercise(client) {
  const newEpisode = {
    episode: 'S09E13',
    title: 'Final Reflections',
    elements: ['CLOUDS', 'GRASS', 'MOUNTAIN', 'RIVER', 'TREE'],
  };

  const result = await client
    .db(dbName)
    .collection(collectionName)
    .insertOne(newEpisode);

  console.log(`Created season 9 episode 13 and the document got the id ${result.insertedId}`);
}

/**
 * READ operations
 * Finds specific episodes based on different criteria
 */
async function findEpisodesExercises(client) {
  const collection = client.db(dbName).collection(collectionName);

  const ep1 = await collection.findOne({ episode: 'S02E02' });
  console.log(`The title of episode 2 in season 2 is '${ep1.title}'`);

  const ep2 = await collection.findOne({ title: 'BLACK RIVER' });
  console.log(`The season and episode number of the "BLACK RIVER" episode is ${ep2.episode}`);

  const cliffEpisodes = await collection.find({ elements: 'CLIFF' }).toArray();
  console.log(`Episodes with CLIFF: ${cliffEpisodes.map(e => e.title).join(', ')}`);

  const cliffAndLighthouse = await collection.find({ elements: { $all: ['CLIFF', 'LIGHTHOUSE'] } }).toArray();
  console.log(`Episodes with CLIFF and LIGHTHOUSE: ${cliffAndLighthouse.map(e => e.title).join(', ')}`);
}

/**
 * UPDATE operations
 * Updates incorrect data such as wrong titles or element names
 */
async function updateEpisodeExercises(client) {
  const collection = client.db(dbName).collection(collectionName);

  // Correct the episode title
  const updateTitle = await collection.updateOne(
    { episode: 'S30E13' },
    { $set: { title: 'BLUE RIDGE FALLS' } }
  );
  console.log(`Updated title for S30E13, modified count: ${updateTitle.modifiedCount}`);

  // Fix BUSHES -> BUSH in two steps to avoid update conflict
  const step1 = await collection.updateMany(
    { elements: 'BUSHES' },
    { $addToSet: { elements: 'BUSH' } }
  );

  const step2 = await collection.updateMany(
    { elements: 'BUSHES' },
    { $pull: { elements: 'BUSHES' } }
  );

  console.log(`Converted BUSHES to BUSH → step1: ${step1.modifiedCount}, step2: ${step2.modifiedCount}`);
}

/**
 * DELETE operation
 * Removes an incorrect episode from the collection
 */
async function deleteEpisodeExercises(client) {
  const collection = client.db(dbName).collection(collectionName);

  const deleted = await collection.deleteOne({ episode: 'S31E14' });

  console.log(`Deleted episode S31E14 → deleted count: ${deleted.deletedCount}`);
}

/**
 * Main function that connects to MongoDB and runs all exercises
 */
async function main() {
  if (!process.env.MONGODB_URL) {
    throw new Error("You didn't set the MONGODB_URL in your .env file.");
  }

  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Step 1: Seed the database with initial data
    await seedDatabase(client);

    // Step 2: Create new episode
    await createEpisodeExercise(client);

    // Step 3: Read from the database
    await findEpisodesExercises(client);

    // Step 4: Update data
    await updateEpisodeExercises(client);

    // Step 5: Delete an incorrect entry
    await deleteEpisodeExercises(client);

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

// Run the main function
main();


/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/
