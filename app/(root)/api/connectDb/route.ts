import { MongoClient } from 'mongodb';

const MONGO_URL = process.env.NEXT_PUBLIC_MONGO_URL;

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectdb() {
  if (cachedDb) {
    // If the database connection already exists, return the cached instance
    console.log("Reusing existing MongoDB connection...");
    return cachedDb;
  }

  try {
    console.log("Connecting to MongoDB...");
    if (!MONGO_URL) throw new Error('Database API secret is missing');

    if (!cachedClient) {
      // If no client is cached, create a new one
      cachedClient = new MongoClient(MONGO_URL);
      await cachedClient.connect();
      console.log("Connected to MongoDB");
    }

    cachedDb = cachedClient.db('ipmc-docs'); // Cache the connected DB
    return cachedDb;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    return null;
  }
}

