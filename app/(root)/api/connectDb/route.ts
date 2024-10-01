import { MongoClient } from 'mongodb';

const MONGO_URL = process.env.NEXT_PUBLIC_MONGO_URL;
export async function connectToDB() {
  try {
    console.log("Connecting to MongoDB...");
    if (!MONGO_URL) throw new Error('Database API secret is missing');

    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db('ipmc-docs');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    return null; 
  }
}

