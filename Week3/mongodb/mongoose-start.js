// This code is inspired from https://mongoosejs.com/docs/index.html
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  
  console.log("hello, connection established!");

  // Create a schema
  const kittySchema = new mongoose.Schema({
  name: String
  });

  // Create a model
  const Kitten = mongoose.model('Kitten', kittySchema);
  const silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'
  
  // Save the document in the Mongo database
  await silence.save();

  // Find all documents
  const res = await Kitten.find();
  console.log(res);
}
