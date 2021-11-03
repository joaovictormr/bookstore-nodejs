const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
require('dotenv').config();

let _db;

const mongoConnect = callback => {
    MongoClient.connect(
        process.env.MONGODB_URL
    )
    .then(client => {
        _db = client.db();
        console.log("Connected!");
        callback(client);
    })
    .catch(err => {
        console.log(err);
        throw err;
    })
};

const getDb = () => {
    if (_db) {
        return _db;
    }

    throw "No database found!";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;