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
    const url = new URL(req.url);
    const cardId = url.searchParams.get("cardId");
    const lastBuildDate = decodeURIComponent(url.searchParams.get("lastBuildDate"));

    const collection = client.db(process.env.MONGODB_DB_NAME).collection("comments");
    const query = {
      cardId: cardId,
      createdAt: { $gt: new Date(lastBuildDate) }
    };
    const results = await collection.find(query).toArray();

    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(err, {
      status: 500
    });
  } finally {
    await client.close();
  }
}
