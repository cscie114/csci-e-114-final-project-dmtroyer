
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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const collection = client.db(process.env.MONGODB_DB_NAME).collection("comments");
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const results = await collection.find({}).toArray();
    return results;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
