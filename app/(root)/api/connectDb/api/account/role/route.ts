import { connectdb } from "../../../route";

export async function POST(req: Request) {
  try {
    const db = await connectdb();
    if (!db) {
      console.error("Database connection failed.");
      return new Response(JSON.stringify({ error: "Database Connection Failed" }), { status: 500 });
    }

    const { _id, role } = await req.json();
    
    // Validate input data
    if (!_id || !role) {
      console.error("Missing required fields: id or role.");
      return new Response(JSON.stringify({ error: "Missing id or role" }), { status: 400 });
    }

    // Access the users collection
    const usersCollection = db.collection('userrole');
    
    const postData = { _id, role };
    const result = await usersCollection.insertOne(postData);

    if (!result.acknowledged) {
      console.error("Failed to insert document.");
      return new Response(JSON.stringify({ error: "Failed to insert document" }), { status: 500 });
    }

    return new Response(JSON.stringify(result), { status: 201 });

  } catch (error) {
    console.error("Error occurred:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error }), { status: 500 });
  }
}
