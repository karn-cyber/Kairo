import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable');
}

let cachedClient = null;
let cachedPromise = null;

export async function getDb() {
  if (cachedClient) {
    return cachedClient.db();
  }

  if (!cachedPromise) {
    const client = new MongoClient(uri);
    cachedPromise = client.connect();
  }

  cachedClient = await cachedPromise;
  return cachedClient.db();
}
