const {MongoClient} = require('mongodb');
const mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true };

async function main(){
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


        // Create a single new listing
        await createListing(client,
            {
                kabul: "Doma",
                AFG: "SYR",
                Kabol: "Damascus"
            }
        );
  
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Create a new Airbnb listing
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {Object} newListing The new listing to be added
 */
async function createListing(client, newListing){
    // See http://bit.ly/Node_InsertOne for the insertOne() docs
    const result = await client.db("World").collection("City").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}


