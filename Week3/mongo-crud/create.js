const {MongoClient} = require('mongodb');

async function main(){
    /**
     * Connection URI. Update <username>:<password>@<your-cluster-url> to reflect your cluster.
     * See http://bit.ly/NodeDocs_lauren for more details
     */
    const uri = "mongodb+srv://hyfuser:hyfuser@cluster0-7ofa4.mongodb.net/test?retryWrites=true&w=majority" ;
    /**
     * The Mongo Client you will use to interact with your database
     * See bit.ly/Node_MongoClient for more details
     */
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls

        // Create a single new Employee
        await createEmployee(client,
            {
                name: "Karam",
                salary: 1
            }
        );
  
        // Create 3 new Employees
        await createMultipleEmployees(client, [
            {
                name: "Karam",
                salary: 2
            },
            {
                name: "Nisa",
                salary: 2000,
                interests: ["education", "gamification", "databases"]
            },
            {
                name: "Mohammed",
                salary: 2000,
                projects: [
                  {
                    name: "todo list",
                    language: "nodejs",
                    hoursSpent: 9
                  },
                  {
                    name: "website scraper",
                    language: "python"
                  }
                  ]
            }

        ]);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Create a new  Employee
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the linkedin database
 * @param {Object} newEmployee The new Employee to be added
 */
async function createEmployee(client, newEmployee){
    // See http://bit.ly/Node_InsertOne for the insertOne() docs
    const result = await client.db("linkedin").collection("employees").insertOne(newEmployee);
    console.log(`New Employee created with the following id: ${result.insertedId}`);
}

/**
 * Create multiple  Employees
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the linkedin database
 * @param {Object[]} newEmployees The new Employees to be added
 */
async function createMultipleEmployees(client, newEmployees){
    // See http://bit.ly/Node_InsertMany for the insertMany() docs
    const result = await client.db("linkedin").collection("employees").insertMany(newEmployees);

    console.log(`${result.insertedCount} new Employee(s) created with the following id(s):`);
    console.log(result.insertedIds);
}

