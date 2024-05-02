import { MongoClient, ServerApiVersion } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default async (req, context) => {

  try {
    const body = await req.json();
    const doc = {
      cardId: body.cardId,
      text: body.text,
      createdAt: new Date()
    };

    const collection = client.db(process.env.MONGODB_DB_NAME).collection(process.env.MONGODB_COLLECTION_NAME);
    const result = await collection.insertOne(doc);

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
      status: 201
    });
  } catch (err) {
    return new Response(err, {
      status: 500
    });
  } finally {
    await client.close();
  }
}
