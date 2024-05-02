
const { MongoClient, ServerApiVersion } = require('mongodb');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = async function() {
  try {
    const collection = client.db(process.env.MONGODB_DB_NAME).collection("comments");
    const results = await collection.find({}).toArray();

    return results;
  } finally {
    await client.close();
  }
}
