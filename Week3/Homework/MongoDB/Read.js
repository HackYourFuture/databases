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
 
        // Find the city by name
        await findListingByName(client,  "kabul", "Doma");
        // Find the city by country code
        await findListingByName(client,  "AFG", "SYR");
        


    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

async function findListingByName(client, key , nameOfListing) {
    // See http://bit.ly/Node_findOne for the findOne() docs
    const result = await client.db("World").collection("City").findOne({ [key]: nameOfListing });
    console.log(key);
    

    if (result) {
        console.log(`Found a listing in the db with the key ${key} and name ${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the key ${key} and name ${nameOfListing}`);
    }
}

main().catch(console.error);