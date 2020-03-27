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

        // DELETE ONE
        // Check if a listing  exists. Run update.js if you do not have this listing.
        await printIfListingExists(client, "kabul", "Doma");
        // Delete the "Cozy Cottage" listing
        await deleteListingByName(client, "kabul", "Doma");
        // Check that the listing   no longer exists
        await printIfListingExists(client, "kabul", "Doma");
       


    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Delete an Airbnb listing with the given name.
 * Note: If more than one listing has the same name, only the first listing the database finds will be deleted.
 *       It's best to use deleteOne when querying on fields that are guaranteed to be unique.
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {string} nameOfListing The name of the listing you want to delete
 */
async function deleteListingByName(client, key, nameOfListing) {
    // See http://bit.ly/Node_deleteOne for the deleteOne() docs
    const result = await client.db("World").collection("City").deleteOne({ [key]: nameOfListing });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}


/**
 * Print information indicating if a listing with the given name exists. 
 * If a listing has the 'last_scraped' field, print that as well.
 * Note: If more than one listing has the same name, only the first listing the database finds will be printed.
 *       It's best to use findOne when querying on fields that are guaranteed to be unique.
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {String} nameOfListing The name of the listing you want to find
 */
async function printIfListingExists(client, key, nameOfListing) {
    // See http://bit.ly/Node_findOne for the findOne() docs
    const result = await client.db("World").collection("City").findOne({ [key]: nameOfListing });

    if (result) {
        if (result.last_scraped) {
            console.log(`Found a listing in the collection with the key ${key} '${nameOfListing}'. Listing was last scraped ${result.last_scraped}.`);
        } else {
            console.log(`Found a listing in the collection with the key ${key} '${nameOfListing}'`);
        }
    } else {
        console.log(`No listings found with the key ${key} the name '${nameOfListing}'`);
    }
}

