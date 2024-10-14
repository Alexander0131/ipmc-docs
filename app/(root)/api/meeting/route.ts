import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Meeting, { IMeeting } from "@/app/models/Meeting";



export async function GET(req: NextRequest){
  const getTheState = req.url.split("?q=")[1];
    await connectMongoDB();
    try {
      const meetings = await Meeting.find({state: getTheState});

      return NextResponse.json(meetings);
    } catch (err: any) {
        NextResponse.json({error: err.message});
    }
  
}

// Post method
export async function POST(req: NextRequest) {
  await connectMongoDB();

  try {
    // Read the request body once
    const body = await req.json();
    const { meetingId, creatorId, time, description, image, creatorName, state }: IMeeting = body;

    // Create post with uploaded image URL
    const postData = {
      meetingId,
      creatorId, 
      time, 
      description, 
      image, 
      creatorName, 
      state
    };

    console.log(postData);

    // Save post data to database
    const createdPost = await Meeting.create(postData);

    if (!createdPost) {
      return NextResponse.json({ error: "Post not created" }, { status: 400 });
    }

    return NextResponse.json(createdPost);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'message' }, { status: 500 });
  }
}

// Put method

export async function PUT(req: NextRequest) {
  await connectMongoDB();

  try {
    const body = await req.json();
    const { _id, state }: { _id: string; state: string } = body;

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      _id,
      { state },
      { new: true }
    );

    if (!updatedMeeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }

    return NextResponse.json(updatedMeeting);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}




