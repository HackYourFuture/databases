const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv= require("dotenv").config();
const mongoLink = process.env.MONGODB_URL;
console.log(mongoLink);
//dotenv mongodb link export
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const dotenv = require("dotenv").config();
// const mongoLink =  process.env.MONGODB_URL;
// console.log(mongoLink);

const { seedDatabase } = require("./seedDatabase");

async function createEpisodeExercise(client) {
  /**
   * We forgot to add the last episode of season 9. It has this information:
   *
   * episode: S09E13
   * title: MOUNTAIN HIDE-AWAY
   * elements: ["CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS", "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"]
   */

  // Write code that will add this to the collection!
  // Make sure to log the id of the document that was created!

const result =await client.db("bob-ross").collection("episodes").insertOne({
  episode: "S09E13",
  title: "MOUNTAIN HIDE-AWAY",
  elements: ["CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS", "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"],
});
  return (result)

console.log(
  `Created season 9 episode 13 and the document got the id ${result}`
);
}

async function findEpisodesExercises(client) {
  /**
   * Complete the following exercises.
   * The comments indicate what to do and what the result should be!
   */

  // Find the title of episode 2 in season 2 [Should be: WINTER SUN]

// Find the title of episode 2 in season 2
const episode2Season2 = await client
  .db("bob-ross")
  .collection("episodes")
  .findOne({ episode: "S02E02" });

console.log(
  `The title of episode 2 in season 2 is ${episode2Season2.title}`
);

// Find the season and episode number of the episode called "BLACK RIVER"
const blackRiverEpisode = await client
  .db("bob-ross")
  .collection("episodes")
  .findOne({ title: "BLACK RIVER" });

console.log(
  `The season and episode number of the "BLACK RIVER" episode is ${blackRiverEpisode.episode}`
);

// Find all of the episode titles where Bob Ross painted a CLIFF
const cliffEpisodes = await client
  .db("bob-ross")
  .collection("episodes")
  .find({ elements: { $in: ["CLIFF"] } })
  .project({ title: 1, _id: 0 })
  .toArray();

console.log(
  `The episodes that Bob Ross painted a CLIFF are ${cliffEpisodes.map(
    (episode) => episode.title
  )}`
);

// Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE
const cliffAndLighthouseEpisodes = await client
  .db("bob-ross")
  .collection("episodes")
  .find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } })
  .project({ title: 1, _id: 0 })
  .toArray();

console.log(
  `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${cliffAndLighthouseEpisodes.map(
    (episode) => episode.title
  )}`
);

}

async function updateEpisodeExercises(client) {
  /**
   * There are some problems in the initial data that was filled in.
   * Let's use update functions to update this information.
   *
   * Note: do NOT change the data.json file
   */
// Update episode 13 in season 30
await client
  .db("bob-ross")
  .collection("episodes")
  .updateOne({ episode: "S30E13" }, { $set: { title: "BLUE RIDGE FALLS" } });

console.log(
  `Ran a command to update episode 13 in season 30 and it updated ${result.modifiedCount} episodes`
);

// Update all episodes with "BUSHES" to "BUSH"
await client
  .db("bob-ross")
  .collection("episodes")
  .updateMany({ elements: { $in: ["BUSHES"] } }, { $set: { elements: { $push: "BUSH", $pull: "BUSHES" } } });

console.log(
  `Ran a command to update all the BUSHES to BUSH and it updated ${result.modifiedCount} episodes`
);
}

async function deleteEpisodeExercise(client) {
  await client
  .db("bob-ross")
  .collection("episodes")
  .deleteOne({ episode: "S31E14" });

console.log(
  `Ran a command to delete episode and it deleted ${result.deletedCount} episodes`
);
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

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
