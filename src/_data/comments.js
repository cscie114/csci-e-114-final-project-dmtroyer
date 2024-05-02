
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);

module.exports = async () => {
  try {
    await client.connect();
    const collection = client.db(process.env.MONGODB_DB_NAME).collection(process.env.MONGODB_COLLECTION_NAME);
    const results = await collection.find({}).toArray();

    return results;
  } finally {
    await client.close();
  }
}
