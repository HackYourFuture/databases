const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017/";

async function seedDatabase() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const emp1 = {
      Id: 101,
      Name: "Mohammed Ali",
      Salary: 4500,
      department: "Testing",
    };
    const result1 = await client
      .db("company")
      .collection("employees")
      .insertOne(emp1);
    console.log(result1);

    const emp2 = { Id: 103, Work: "Sell cakes", Salary: 500 };
    const result2 = await client
      .db("company")
      .collection("employees")
      .insertOne(emp2);
    console.log(result2);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

seedDatabase();
