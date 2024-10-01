import { NextResponse } from 'next/server';
import { connectToDB } from '../../route';
import { ObjectId } from 'mongodb';



export async function GET() {
  try {
    const db = await connectToDB();
    if (!db) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    const questCollection = db.collection('answer');

    const questions = await questCollection.find().sort({ createdAt: -1 }).toArray();

    return NextResponse.json(questions, { status: 200 }); 
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 }); 
  }
}




export async function PUT(req: Request) {

  

  try {
    const { _id, ...updateData } = await req.json(); // Parse JSON from the request body
    console.log('ID:', _id); // Debugging log for ID
    console.log('Update Data:', updateData); // Debugging log for update data

    if (!_id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const db = await connectToDB();
    if (!db) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    const questCollection = db.collection('questions');

    // Perform the update operation
    const updateQuest = await questCollection.findOneAndUpdate(
      { _id: new ObjectId(_id) }, 
      { $set: updateData },       
      { returnDocument: 'after' } 
    );

    if(!updateQuest){
      return NextResponse.json({ error: 'Question' }, { status: 404 });

    }

    console.log(updateData);

    
    return NextResponse.json(updateQuest, { status: 200 });
  } catch (error) {
    console.error('Error updating question:', error); // Debugging log for errors
    return NextResponse.json({ error: 'Failed to update question' }, { status: 500 });
  }
}
