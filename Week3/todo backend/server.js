import express from 'express';
import bodyParser from 'body-parser';
const app = express();
import { default as mongodb } from 'mongodb';
const MongoClient = mongodb.MongoClient;
import config from './secrets.js';

async function getMongoCollection() {
    const client = new MongoClient(config.mongoConnection);
    await client.connect();
    const database = client.db("todo-app");
    return database.collection("todos");
}

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000, function () {
    console.log('listening on 3000')
})

app.get('/todos', async function (req, res) {

    const collection = await getMongoCollection();

    // http://mongodb.github.io/node-mongodb-native/3.6/tutorials/crud/#read-methods

    res.send('This should list all todos')
})

app.post('/todos', async function (req, res) {

    const collection = await getMongoCollection();

    // http://mongodb.github.io/node-mongodb-native/3.6/tutorials/crud/#insert-documents

    res.send('This should create a single todo');
})

app.put('/todos/:id', async function (req, res) {

    const collection = await getMongoCollection();

    // http://mongodb.github.io/node-mongodb-native/3.6/tutorials/crud/#updating-documents
    // https://stackoverflow.com/questions/4902569/node-js-mongodb-select-document-by-id-node-mongodb-native

    res.send('This should update a single todo: ' + req.params.id)
})

app.delete('/todos/:id', async function (req, res) {

    const collection = await getMongoCollection();

    // http://mongodb.github.io/node-mongodb-native/3.6/tutorials/crud/#removing-documents

    res.send('This should delete a single todo: ' + req.params.id)
})

