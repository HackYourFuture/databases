const { MongoClient } = require('mongodb');
const mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true };

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See http://bit.ly/NodeDocs_lauren for more details
     */
    const uri ="mongodb+srv://HYF-Ammar:HYF_ammar_HYF1234@cluster0-ptw2q.azure.mongodb.net/test"; 

    /**
     * The Mongo Client you will use to interact with your database
     * See bit.ly/Node_MongoClient for more details
     */
    const client = new MongoClient(uri, mongoOptions);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);
        // UPDATE
        // Print the Doma listing
        await findListingByName(client, 'Doma');
        // Update the population of the city 
        await updateListingByName(client, 'Doma', { population: 6000 });
        // Print the updatedlisting
        await findListingByName(client, 'Doma');


    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Update an Airbnb listing with the given name
 * Note: If more than one listing has the same name, only the first listing the database finds will be updated.
 *       It's best to use updateOne when querying on fields that are guaranteed to be unique.
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {string} nameOfListing The name of the listing you want to update
 * @param {object} updatedListing An object containing all of the properties to be updated for the given listing
 */
async function updateListingByName(client, nameOfListing, updatedListing) {
    // See http://bit.ly/Node_updateOne for the updateOne() docs
    const result = await client.db("World").collection("City").updateOne({ kabul: nameOfListing }, { $set: updatedListing });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
}

/**
 * Print an Airbnb listing with the given name
 * Note: If more than one listing has the same name, only the first listing the database finds will be printed.
 *       It's best to use findOne when querying on fields that are guaranteed to be unique.
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {String} nameOfListing The name of the listing you want to find
 */
async function findListingByName(client, nameOfListing) {
    // See http://bit.ly/Node_findOne for the findOne() docs
    const result = await client.db("World").collection("City").findOne({ kabul: nameOfListing });

    if (result) {
        console.log(`Found a listing in the db with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}


/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
