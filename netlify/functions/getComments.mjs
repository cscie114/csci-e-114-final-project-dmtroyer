import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);

export default async (req, context) => {
  try {
    const url = new URL(req.url);
    const cardId = url.searchParams.get("cardId");
    const lastBuildDate = decodeURIComponent(url.searchParams.get("lastBuildDate"));

    await client.connect();
    const database = client.db(process.env.MONGODB_DB_NAME);
    const collection = database.collection(process.env.MONGODB_COLLECTION_NAME);
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
