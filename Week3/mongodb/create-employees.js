const util = require('util')
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

async function seedDatabase() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        var emp1 = {Id : 101, Name : "Mohammed Ali", Salary : 4500, department : "Testing"};
        const result1 = await client.db("company").collection("employees").insertOne(emp1);
        console.log(result1);

        var emp2 = {Id : 103, Work : "Sell cakes", Salary : 500};
        const result2 = await client.db("company").collection("employees").insertOne(emp2);
        console.log(result2);
    } catch(error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

seedDatabase();
