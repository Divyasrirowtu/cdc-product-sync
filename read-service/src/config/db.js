const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URL);
let db;

async function connectDB() {
  await client.connect();
  db = client.db(process.env.MONGO_DB);
  console.log("MongoDB connected");
  return db;
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };
